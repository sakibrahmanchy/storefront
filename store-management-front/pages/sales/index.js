import Table from '../../components/table';
import saleService from '../../services/sale';
export default function ListSale() {
  return (
    <Table
      headers={[
        {
          key: 'id',
          name: 'Id',
        },
        {
          key: 'customer_name',
          name: 'Customer name',
        },
        {
          key: 'customer_contact',
          name: 'Customer Contact',
        },
        {
          key: 'customer_email',
          name: 'Customer email',
        },
        {
          key: 'product_name',
          name: 'Product',
        },
        {
          key: 'manufacturer_name',
          name: 'Manufacturer',
        },
        {
          key: 'discount_percentage',
          name: 'Disscount (%)',
        },
        {
          key: 'price',
          name: 'Price',
        },
      ]}
      renderData={(sales = []) =>
        sales.map(
          ({
            id,
            product: {
              product_name,
              manufacturer: { name: manufacturer_name },
            },
            customer: { customer_name, customer_email, customer_contact },
            discount_percentage,
            price,
          }) => (
            <tr>
              <td>{id}</td>
              <td>{customer_name}</td>
              <td>{customer_contact}</td>
              <td>{customer_email}</td>
              <td>{product_name}</td>
              <td>{manufacturer_name}</td>
              <td>{discount_percentage}</td>
              <td>{price}</td>
              <td>
                <a href={`/sales/${id}`}>
                  <i>&#x270F;</i>
                </a>
              </td>
              <td>
                <a
                  className="text-danger font-weight-bold"
                  href="#"
                  onClick={async () => {
                    await saleService.deleteSale(id);
                    window.location.reload();
                  }}
                >
                  <i>&#x2715;</i>
                </a>
              </td>
            </tr>
          ),
        )
      }
      apiUrl="sales"
    />
  );
}
