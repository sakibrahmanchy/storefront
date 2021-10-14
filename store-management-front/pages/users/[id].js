import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import rightService from '../../services/rights';
import userService from '../../services/user';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';

const EditUser = ({ id }) => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState, setValue } =
    useForm(formOptions);
  const { errors } = formState;

  const [user, setUser] = useState(null);
  const [rights, setRights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [regeneratedPass, setRegeneratedPass] = useState(null);

  useEffect(async () => {
    setLoading(true);
    const [rightList, retrievedUser] = await Promise.all([
      rightService.listAll(),
      userService.fetchUserById(id),
    ]);
    setLoading(false);

    if (retrievedUser && retrievedUser.id) {
      setUser(retrievedUser);
    }
    if (rightList && Array.isArray(rightList) && rightList.length > 0) {
      setRights(rightList);
    }
  }, []);

  const onSubmit = async (data) => {
    // Mapping rights from boolean to id
    const userData = {
      ...data,
      rights: data.rights
        .map((right, index) => {
          if (right) {
            return rights[index].id;
          }
          return undefined;
        })
        .filter((e) => e !== undefined),
    };
    const response = await userService.saveUserData(id, userData);
    if (response && response.id) {
      router.push('/users');
    }
    if (response && response.message) {
      setError('apiError', { message: response.message });
      return;
    }
  };

  /** Generate random password on a given range min and max */
  const regenerate = (
    min = 6,
    max = 12,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
  ) => {
    const randomLength = Math.random() * (max - min) + min;
    const pass = Array.from(
      crypto.getRandomValues(new Uint32Array(randomLength)),
    )
      .map((x) => wishlist[x % wishlist.length])
      .join('');
    setRegeneratedPass(pass);
    setValue('password', pass);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Edit User</h1>
        {errors.apiError && (
          <div className="alert alert-danger mt-3 mb-0">
            {errors.apiError?.message}
          </div>
        )}
        {loading && <Loader />}
        {user && (
          <>
            <div className="row">
              {user && (
                <div className="col-md-6 card pb-4 pt-4">
                  {/* User Form  */}
                  <h3>User Information</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="label">First Name</label>
                      <input
                        {...register('first_name', { required: true })}
                        className={`form-control ${
                          errors.first_name ? 'is-invalid' : ''
                        }`}
                        value={user.first_name}
                      />
                    </div>
                    <div className="col-md-6 p-2">
                      <label className="label">Last Name</label>
                      <input
                        {...register('last_name', { required: true })}
                        className={`form-control ${
                          errors.last_name ? 'is-invalid' : ''
                        }`}
                        value={user.last_name}
                      />
                    </div>
                    <br />
                    <div className="col-md-6 p-2">
                      <label className="label">User Name</label>
                      <input
                        {...register('username', { required: true })}
                        className={`form-control ${
                          errors.username ? 'is-invalid' : ''
                        }`}
                        value={user.username}
                        autoComplete="off"
                      />
                    </div>
                    <div className="col-md-6 p-2">
                      <a
                        href="#"
                        style={{ color: 'blue' }}
                        onClick={() => regenerate()}
                      >
                        Regenerate Password
                      </a>{' '}
                      <br />
                      {regeneratedPass && (
                        <span className="text-danger">
                          Regenerated password: <b>{regeneratedPass}</b>
                        </span>
                      )}
                      <input
                        {...register('password', { required: true })}
                        className={`form-control ${
                          errors.password ? 'is-invalid' : ''
                        }`}
                        autoComplete="off"
                        type="password"
                      />
                    </div>
                    <div className="col-md-6 p-2">
                      <label className="label">Date of birth</label>
                      <input
                        {...register('dob', { required: true })}
                        className="form-control"
                        type="date"
                        value={user.dob}
                      />
                    </div>
                    <div className="col-md-6 p-2">
                      <label className="label">Employer Name</label>
                      <input
                        {...register('employer_name')}
                        className="form-control"
                        value={user.username}
                      />
                    </div>
                    <div className="col-md-6 p-2">
                      <label className="label">Address</label>
                      <input
                        {...register('address')}
                        className="form-control"
                        value={user.address}
                      />
                    </div>
                  </div>
                  {/* Ends User Form  */}
                </div>
              )}
              <div className="col-md-6 card ml-4 pb-4 pt-4">
                {/* Right Form  */}
                <div className="row">
                  <div className="col-md-6">
                    <h3>User Rights</h3>
                    {loading && <Loader />}
                    {rights && rights.length > 0 && (
                      <ul style={{ listStyleType: 'none' }}>
                        {rights.map((right, index) => (
                          <li key={right.name}>
                            <input
                              type="checkbox"
                              {...register(`rights[${index}]`)}
                              className="form-check-input"
                              defaultChecked={user.rights
                                .map(({ name }) => name)
                                .includes(right.name)}
                            />{' '}
                            <label className="form-check-label">
                              {right.name}
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {user && (
                    <div className="col-md-6">
                      <h3>
                        User Locked? &nbsp;
                        <input
                          type="checkbox"
                          {...register('locked')}
                          className="form-check-input"
                          defaultChecked={user.locked}
                        />
                      </h3>
                    </div>
                  )}
                </div>
                {/* Ends Right Form  */}
              </div>
            </div>
            <div className="d-flex justify-content-center p-2">
              <input type="submit" className="btn btn-primary" /> <br />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

EditUser.getInitialProps = async (context) => {
  const { id } = context.query;
  return {
    id,
  };
};

export default EditUser;
