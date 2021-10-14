import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Loader from '../../components/Loader';
import userService from '../../services/user';

const ChangePassword = ({ id }) => {
  const validationSchema = Yup.object().shape({
    previous_password: Yup.string().required('Please enter previous passwod'),
    new_password: Yup.string().required('Please enter a new password'),
    repeat_password: Yup.string().required('Please repeat the new  password'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState, watch, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const [success, setSuccess] = useState(false);
  const [apiErrors, setApiErrors] = useState([]);

  const onSubmit = async (data) => {
    const response = await userService.changePassword({ id, ...data });
    if (response && response.success) {
      setSuccess(true);
      setApiErrors(null);
    }
    if (response && response.message) {
      setError('apiError', { message: response.message });
      setApiErrors(response.message);
      setSuccess(null);
      return;
    }
  };

  return (
    <div>
      <h3>Change Password</h3>
      {success && !errors.apiErrors?.message && (
        <div className="alert alert-success mt-3 mb-0">
          Password successfully changed!
        </div>
      )}
      {apiErrors && Array.isArray(apiErrors) && (
        <div className="alert alert-danger mt-3 mb-0">
          {(apiErrors || []).map((m) => (
            <div>{m}</div>
          ))}
        </div>
      )}
      {apiErrors && !Array.isArray(apiErrors) && (
        <div className="alert alert-danger mt-3 mb-0">{apiErrors}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="label">Previous Password</label>
          <input
            type="password"
            {...register('previous_password', { required: true })}
            className={`form-control ${
              errors.previous_password ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div>
          <label className="label">New Password</label>
          <input
            type="password"
            {...register('new_password', { required: true })}
            className={`form-control ${
              errors.new_password ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div>
          <label className="label">Repeat Password</label>
          <input
            type="password"
            {...register('repeat_password', { required: true })}
            className={`form-control ${
              errors.repeat_password ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="d-flex justify-content-center p-2">
          <input type="submit" className="btn btn-primary" /> <br />
        </div>
      </form>
    </div>
  );
};

const UserProfile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const [retrievedUser] = await Promise.all([userService.fetchUserById(id)]);
    setUser(retrievedUser);
    setLoading(false);
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <h3>User Information</h3>
        {loading && <Loader />}
        {user && (
          <div>
            <p>
              Name: {user.first_name} &nbsp; {user.last_name}{' '}
            </p>
            <p>Date of birth: {user.dob} </p>
            <p>Employer Name: {user.employer_name} </p>
            <p>Address: {user.address} </p>
          </div>
        )}
      </div>
      <div className="col-md-6">
        <ChangePassword id={id} />
      </div>
    </div>
  );
};

UserProfile.getInitialProps = async (context) => {
  const { id } = context.query;
  return {
    id: id,
  };
};

export default UserProfile;
