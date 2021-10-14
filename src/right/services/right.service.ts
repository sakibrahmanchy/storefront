import { Injectable } from '@nestjs/common';
import { Right } from 'src/entities/right.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class RightService {
  modules = ['users', 'products', 'sales', 'profile'];
  rights = ['view', 'add', 'edit'];
  constructor(
    @InjectRepository(Right)
    private rightRepository: Repository<Right>,
    private userService: UserService,
  ) {}

  async getAll() {
    return this.rightRepository.find();
  }

  /**
   * For all modules and rights auto generate rights
   * and store them in right table.
   *
   * @return null
   */
  async seed() {
    this.modules.map(async (module) => {
      this.rights.map(async (right) => {
        const currentRightName = `${module}-${right}`;
        let rightExists = null;
        try {
          rightExists = await this.rightRepository.findOne({
            name: currentRightName,
          });
        } catch (e) {
          throw e;
        }

        if (!rightExists) {
          await this.rightRepository.save({
            name: currentRightName,
          });
        }
      });
    });
  }

  /**
   * Register admin user if not exists and assign him all available rights
   *
   * @return Admin User
   */
  async createAdminAndSeedAllRights() {
    const rights = await this.getAll();
    const user = await this.userService.fetchUserByUserName('admin');
    if (user) {
      this.userService.updateUser({
        ...user,
        rights: rights.map(({ id }) => id),
      });
      return user;
    } else {
      return this.userService.register({
        first_name: 'Admin',
        last_name: 'User',
        username: 'admin',
        dob: '2021-10-13',
        password: '123456',
        rights: rights.map(({ id }) => id),
      });
    }
  }
}
