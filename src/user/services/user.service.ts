import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { RegistrationRequest } from '../requests/registration.request';
import { User } from 'src/entities/user.entity';
import { Right } from 'src/entities/right.entity';
import { paginateResponse } from 'src/utils/paginate';
import { LoginRequest } from '../requests/login.request';
import { ConfigService } from 'src/config';
import { UserUpdateRequest } from '../requests/user-update.request';
import { ChangePasswordRequest } from '../requests/change-password.request';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Right)
    private rightRepository: Repository<Right>,
    private configService: ConfigService,
  ) { }

  /**
   * Register a new user
   * @param body -> registration request
   *
   * @returns User
   */
  async register(registrationRequest: RegistrationRequest) {
    const { username } = registrationRequest;

    const exists = await this.userRepository.findOne({
      username,
    });

    if (exists) {
      throw new BadRequestException('Username already exists');
    }

    const rights = await this.rightRepository.findByIds(
      registrationRequest.rights || [],
    );

    return this.userRepository.save({
      ...registrationRequest,
      rights,
      password: await hash(registrationRequest.password, 10),
    });
  }

  /**
   * Update individual user
   * @param id -> user id
   *
   * @returns User
   */
  async updateUser(userUpdateRequest: UserUpdateRequest) {
    const {
      id,
      rights: rightIds = [],
      ...userUpdateRestReq
    } = userUpdateRequest;

    if (!id) {
      throw new BadRequestException('User id is required');
    }

    const rights = await this.rightRepository.findByIds(rightIds);

    await this.userRepository.update(id, {
      ...userUpdateRestReq,
      password: await hash(userUpdateRequest.password, 10),
    });

    const user = await this.fetchUserById(id);
    const updatedUser = { ...user, rights };
    return this.userRepository.save(updatedUser);
  }

  /**
   * Fetch an user by id
   *
   * @param id -> number
   * @returns
   */
  async fetchUserById(userId: number) {
    if (!userId) {
      throw new BadRequestException('User id is required');
    }

    return this.userRepository.findOneOrFail(userId, {
      relations: ['rights'],
    });
  }

  /**
   * Fetch an user by username
   *
   * @param userName -> string
   * @returns
   */
  async fetchUserByUserName(userName: string) {
    if (!userName) {
      throw new BadRequestException('User name is required');
    }

    return this.userRepository.findOneOrFail({
      where: { username: userName },
      relations: ['rights'],
    });
  }

  /**
   * List users with params
   * @param page -> page number
   * @param perPage -> number of items per page
   * @param order -> custome order: either 'asc' or 'desc'
   * @returns paginatedResponse
   *
   * Protecetd by user auth guard
   */
  async listAll(page = 1, perPage = 5, order = '') {
    const [column = null, ord = null] = order.split(':');
    const result = await this.userRepository.findAndCount({
      // relations: ['rights'],
      take: perPage,
      skip: (page - 1) * perPage,
      ...(column && {
        order: {
          [column]: ord?.toUpperCase(),
        },
      }),
    });
    return paginateResponse(result, page, perPage);
  }

  /**
   * Login a user. Cannot login if user is locked.
   * Provide appropriate rights with user. Return
   * a signed jwt token.
   *
   * @body loginRequest
   * @returns UserLoginToken
   */
  async login(loginRequest: LoginRequest) {
    const { username = null, password = null } = loginRequest;

    if (!username) {
      throw new BadRequestException('User name is required');
    }

    if (!password) {
      throw new BadRequestException('Password name is required');
    }

    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: ['rights'],
    });

    if (!user) {
      throw new BadRequestException(
        'Invalid user name. This username is not taken yet.',
      );
    }

    if (user.locked) {
      throw new BadRequestException(
        'Sorry, your account has been locked by admin',
      );
    }

    const { id, username: dbUserName, password: hashedPassword, rights } = user;

    const verified = await compare(password, hashedPassword);

    if (!verified) {
      throw new BadRequestException('Passwords did not match.');
    }

    return {
      success: true,
      id,
      username: dbUserName,
      rights,
      token: sign(
        { username: dbUserName, userId: id, rights },
        this.configService.get('JWT_SECRET'),
        { expiresIn: '15m' },
      ),
    };
  }

  async changePassword(changePasswordReq: ChangePasswordRequest) {
    const { id } = changePasswordReq;
    const user = await this.fetchUserById(id);

    if (!user) {
      throw new BadRequestException('User with id not found');
    }

    const matches = await compare(
      changePasswordReq.previous_password,
      user.password,
    );

    if (!matches) {
      throw new BadRequestException('Wrong previous password!');
    }

    if (changePasswordReq.new_password !== changePasswordReq.repeat_password) {
      throw new BadRequestException('Passwords did not match!');
    }

    await this.userRepository.update(user.id, {
      password: await hash(changePasswordReq.new_password, 10),
    });

    return { success: true };
  }
}
