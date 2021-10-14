import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import productService from '../../services/product';
import Loader from '../../components/Loader';

export default function CreateInventory() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    product_id: Yup.string().required('Please select a product'),
    distributor_id: Yup.string().required('Please select a distributor'),
    units_received: Yup.string().required(
      'Please input amount of units received',
    ),
    distributor_price: Yup.string().required('Please input distributor price'),
    delivered_on: Yup.string().required('Please chose delivery date'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState, watch, setValue } =
    useForm(formOptions);
  const { errors } = formState;

  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const distributorList = await productService.getDistributors();
    setLoading(false);
    if (
      distributorList &&
      Array.isArray(distributorList) &&
      distributorList.length > 0
    ) {
      setDistributors(distributorList);
      setValue('distributor_id', distributorList[0].id);
    }
  }, []);

  const onSubmit = async (data) => {
    const response = await productService.createInventory(data);
    if (response && response.id) {
      router.push('/products');
    }
    if (response && response.message) {
      setError('apiError', { message: response.message });
      return;
    }
  };

  const distributorId = watch('distributor_id');

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Create new inventory</h1>
        {loading && <Loader />}
        {errors.apiError && (
          <div className="alert alert-danger mt-3 mb-0">
            {errors.apiError?.message}
          </div>
        )}
        {!loading && (
          <>
            <div className="row">
              <div className="col-md-12 card pb-4 pt-4">
                <h3>Product Information</h3>
                <div className="row">
                  {distributors && (
                    <div className="col-md-6">
                      <label className="label">Select Distributor</label>
                      <select
                        {...register('distributor_id')}
                        className="form-control"
                      >
                        {(distributors || []).map((distributor) => (
                          <option value={distributor.id}>
                            {distributor.distributor_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {distributorId && (
                    <>
                      <div className="col-md-6">
                        <label className="label">Select Product</label>
                        <select
                          {...register('product_id')}
                          className="form-control"
                        >
                          {distributors
                            .find(({ id }) => id == distributorId)
                            .products.map((product) => (
                              <option value={product.id}>
                                {product.product_name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="label">Units Received</label>
                        <input
                          type="number"
                          {...register('units_received', { required: true })}
                          className={`form-control ${
                            errors.units_received ? 'is-invalid' : ''
                          }`}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="label">Distributor Price</label>
                        <input
                          type="number"
                          {...register('distributor_price', { required: true })}
                          className={`form-control ${
                            errors.distributor_price ? 'is-invalid' : ''
                          }`}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="label">Delivered On</label>
                        <input
                          type="date"
                          {...register('delivered_on', { required: true })}
                          className={`form-control ${
                            errors.delivered_on ? 'is-invalid' : ''
                          }`}
                        />
                      </div>
                    </>
                  )}
                </div>
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
}
