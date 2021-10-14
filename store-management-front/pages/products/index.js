import Table from '../../components/table';

export default function ListProduct() {
  return (
    <Table
      headers={[
        {
          key: 'id',
          name: 'Id',
        },
        {
          key: 'product_name',
          name: 'Product Name',
        },
        {
          key: 'manufacturer.name',
          name: 'Manufacturer name',
        },
        {
          key: 'stock',
          name: 'In Stock',
        },
        {
          key: 'last_purchased_on   ',
          name: 'Last purchase on',
        },
      ]}
      renderData={(products = []) =>
        products.map(
          ({
            id,
            product_name,
            manufacturer: { name: manufacturer_name },
            stock,
            last_purchased_on,
          }) => (
            <tr>
              <td>{id}</td>
              <td>{product_name}</td>
              <td>{manufacturer_name}</td>
              <td>{stock}</td>
              <td>{last_purchased_on}</td>
            </tr>
          ),
        )
      }
      apiUrl="products"
    />
  );
}
