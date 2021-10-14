import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import productService from '../../services/product';
import saleService from '../../services/sale';
import Loader from '../../components/Loader';

const EditSale = ({ id }) => {
  const router = useRouter();

  // Validation data for hook form
  const validationSchema = Yup.object().shape({
    product_id: Yup.string().required('Please select a product'),
    customer_name: Yup.string().required('Please input customer name'),
    customer_contact: Yup.string().required('Please input customer contact'),
    customer_email: Yup.string().required('Please input customer email'),
    discount_percentage: Yup.string().required(
      'Please input discount percentage',
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState, watch } =
    useForm(formOptions);
  const { errors } = formState;

  // States
  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Api calls and data mount
  useEffect(async () => {
    setLoading(true);
    const [products, saleDetails] = await Promise.all([
      productService.getProducts(),
      saleService.fetchSale(id),
    ]);
    setLoading(false);

    if (products && products.data) {
      setProducts(products.data);
    }

    if (saleDetails && saleDetails.product) {
      setSale(saleDetails);
      setCurrentProduct(saleDetails.product);
    }
  }, []);

  // Handle Submission
  const onSubmit = async (data) => {
    const response = await saleService.updateSale(id, data);
    if (response && response.id) {
      router.push('/sales');
    }
    if (response && response.message) {
      setError('apiError', { message: response.message });
      return;
    }
  };

  const discountPercentage = watch('discount_percentage');

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Edit sale</h1>
        {errors.apiError && (
          <div className="alert alert-danger mt-3 mb-0">
            {errors.apiError?.message}
          </div>
        )}
        {loading && <Loader />}
        {sale && (
          <>
            <div className="row">
              <div className="col-md-12 card pb-4 pt-4">
                <h3>Product Information</h3>
                <div className="row">
                  {products && (
                    <div className="col-md-6">
                      <label className="label">Select Product</label>
                      <select
                        {...register('product_id')}
                        className="form-control"
                        onChange={(e) => {
                          setCurrentProduct(
                            products.find(
                              ({ id }) => id === Number(e.target.value),
                            ),
                          );
                        }}
                      >
                        {(products || []).map((product) => (
                          <option
                            key={product.id}
                            value={product.id}
                            selected={sale && sale.product.id === product.id}
                          >
                            {product.product_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <br />
                  <div className="col-md-6">
                    <label className="label">Discount Percentage</label>
                    <input
                      {...register('discount_percentage', { required: true })}
                      className="form-control"
                      type="number"
                      defaultValue={sale?.discount_percentage || 0}
                    />
                  </div>
                  {currentProduct && (
                    <div className="col-md-12 pt-4">
                      <h6 className="jumbotron">
                        Product Name: {currentProduct.product_name} <br />
                        Manufacturer: {currentProduct.manufacturer.name} <br />
                        Price: {currentProduct.price}
                        <br />
                        Discounted Price:{' '}
                        {currentProduct.price -
                          (discountPercentage / 100) * currentProduct.price}
                      </h6>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row card p-4">
              <h3>Customer Information</h3>
              <div className="col-md-6">
                <label className="label">Customer Name</label>
                <input
                  {...register('customer_name', { required: true })}
                  className="form-control"
                  defaultValue={sale?.customer?.customer_name || ''}
                />
              </div>
              <div className="col-md-6">
                <label className="label">Customer Contact</label>
                <input
                  {...register('customer_contact', { required: true })}
                  className="form-control"
                  type="number"
                  defaultValue={sale?.customer?.customer_contact || ''}
                />
              </div>
              <div className="col-md-6">
                <label className="label">Customer Email</label>
                <input
                  {...register('customer_email', { required: true })}
                  className="form-control"
                  type="email"
                  defaultValue={sale?.customer?.customer_email || ''}
                />
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

EditSale.getInitialProps = async (context) => {
  const { id } = context.query;
  return {
    id,
  };
};

export default EditSale;
