import { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from './Loader';

const Table = ({ renderData = () => {}, headers = [], apiUrl = '' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState(
    Array.from({ length: headers.length }, () => 'asc'),
  );

  const [order, setOrder] = useState('id:asc');
  const [orderKey, setCurrentOrderKey] = useState('id');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [current, setCurrent] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [nextPage, setNextPage] = useState(null);

  const fetchData = async (offset, limit, order) => {
    setLoading(true);
    const response = await api(
      `${apiUrl}?page=${offset}&per_page=${limit}&order=${order}`,
    );
    const {
      data,
      total: apiTotal,
      prev_page,
      current_page,
      total_pages,
      next_page,
    } = response;
    setPage(offset);
    setPerPage(limit);
    setTotal(apiTotal);
    setData(data);
    setPrevious(prev_page);
    setCurrent(current_page);
    setTotalPages(total_pages);
    setNextPage(next_page);
    setLoading(false);
  };

  useEffect(async () => {
    fetchData(page, perPage, order);
  }, []);

  const changeOrder = (index, key) => {
    const currentState = orders[index] === 'asc' ? 'desc' : 'asc';
    let newOrders = [...orders];
    const newOrder = `${key}:${currentState}`;
    newOrders[index] = currentState;
    setOrders(newOrders);
    setCurrentOrderKey(key);
    setOrder(newOrder);
    fetchData(page, perPage, newOrder);
  };

  return (
    <div className="table-responsive">
      {loading && <Loader />}
      {!loading && (
        <table className="table">
          <thead>
            {headers.map((header, index) => (
              <th
                key={`${header.key}`}
                onClick={() => changeOrder(index, header.key)}
                style={{ cursor: 'pointer' }}
              >
                {header.name}
                {header.key === orderKey && (
                  <span>
                    <b>
                      <span>
                        {orders[index] === 'asc' && <span>&darr;</span>}
                      </span>
                      <span>
                        {orders[index] === 'desc' && <span>&uarr;</span>}
                      </span>
                    </b>
                  </span>
                )}
              </th>
            ))}
          </thead>
          <tbody>
            {total === 0 && (
              <span className="d-flex justify-content-center p-2">
                No data available.
              </span>
            )}
            {total > 0 && <>{renderData(data)}</>}
          </tbody>
          <tfoot>
            <tr>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class={`page-item ${previous ? '' : 'disabled'}`}>
                    <a
                      class="page-link"
                      href="#"
                      onClick={() => fetchData(previous, 5, order)}
                    >
                      Previous
                    </a>
                  </li>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((num) => (
                    <li class={`page-item ${num === current ? 'active' : ''}`}>
                      <a
                        class="page-link"
                        href="#"
                        onClick={() => fetchData(num, 5, order)}
                      >
                        {num}
                      </a>
                    </li>
                  ))}
                  {nextPage && (
                    <li class="page-item">
                      <a
                        class="page-link"
                        href="#"
                        onClick={() => fetchData(nextPage, 5, order)}
                      >
                        Next
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default Table;
