import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import rightService from '../../services/rights';
import userService from '../../services/user';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';

export default function CreateUser() {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  const [rights, setRights] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const rightList = await rightService.listAll();
    setLoading(false);
    setRights(rightList);
  }, []);
  const onSubmit = async (data) => {
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
    const response = await userService.register(userData);
    if (response && response.id) {
      router.push('/users');
    }
    if (response && response.message) {
      setError('apiError', { message: response.message });
      return;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Create new user</h1>
        {errors.apiError && (
          <div className="alert alert-danger mt-3 mb-0">
            {errors.apiError?.message}
          </div>
        )}
        <div className="row">
          <div className="col-md-6 card pb-4 pt-4">
            <h3>User Information</h3>
            <div className="row">
              <div className="col-md-6">
                <label className="label">First Name</label>
                <input
                  {...register('first_name', { required: true })}
                  className={`form-control ${
                    errors.first_name ? 'is-invalid' : ''
                  }`}
                />
              </div>
              <div className="col-md-6 p-2">
                <label className="label">Last Name</label>
                <input
                  {...register('last_name', { required: true })}
                  className={`form-control ${
                    errors.last_name ? 'is-invalid' : ''
                  }`}
                />
              </div>
              <br />
              <div className="col-md-6 p-2">
                <label className="label">User Name</label>
                <input
                  {...register('username', { required: true })}
                  className={`form-control ${
                    errors.user_name ? 'is-invalid' : ''
                  }`}
                />
              </div>
              <div className="col-md-6 p-2">
                <label className="label">Password</label>
                <input
                  {...register('password', { required: true })}
                  className={`form-control ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                  type="password"
                />
              </div>
              <div className="col-md-6 p-2">
                <label className="label">Date of birth</label>
                <input
                  {...register('dob', { required: true })}
                  className="form-control"
                  type="date"
                />
              </div>
              <div className="col-md-6 p-2">
                <label className="label">Employer Name</label>
                <input
                  {...register('employer_name')}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 p-2">
                <label className="label">Address</label>
                <input {...register('address')} className="form-control" />
              </div>
            </div>
            <br />
            <div></div>
          </div>
          <div className="col-md-6 card ml-4 pb-4 pt-4">
            <h3>User Rights</h3>
            {loading && <Loader />}
            {rights && rights.length > 0 && (
              <ul style={{ listStyleType: 'none' }}>
                {rights.map((right, index) => (
                  <li>
                    <input
                      type="checkbox"
                      {...register(`rights[${index}]`)}
                      className="form-check-input"
                    />{' '}
                    <label className="form-check-label">{right.name}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center p-2">
          <input type="submit" className="btn btn-primary" /> <br />
        </div>
      </form>
    </div>
  );
}
