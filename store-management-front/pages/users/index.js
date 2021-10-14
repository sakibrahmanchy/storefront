import Table from '../../components/table';
export default function ListUsers() {
  return (
    <Table
      headers={[
        {
          key: 'id',
          name: 'Id',
        },
        {
          key: 'first_name',
          name: 'First Name',
        },
        {
          key: 'last_name',
          name: 'Last Name',
        },
        {
          key: 'username',
          name: 'User Name',
        },
        {
          key: 'dob',
          name: 'Date Of Birth',
        },
        {
          key: 'employer_name',
          name: 'Employer Name',
        },
        {
          key: 'address',
          name: 'Address',
        },
      ]}
      renderData={(users = []) =>
        users.map(
          ({
            id,
            first_name,
            last_name,
            username,
            dob,
            employer_name,
            address,
            locked,
          }) => (
            <tr>
              <td>{id}</td>
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{username}</td>
              <td>{dob}</td>
              <td>{employer_name}</td>
              <td>{(address || '').slice(0, 15)}...</td>
              <td>
                {locked ? <span>&#128272;</span> : <span>&#x1F513;</span>}
              </td>
              <td>
                <a href={`/users/${id}`}>
                  <i className="">&#x270F;</i>
                </a>
              </td>
            </tr>
          ),
        )
      }
      apiUrl="users"
    />
  );
}
