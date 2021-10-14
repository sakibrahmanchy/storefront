import { useEffect, useState } from 'react';
import menus from '../constants/menu';
import userService from '../services/user';

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  const logout = () => {
    userService.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Storefront
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user && (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {menus.map(({ name, route, children, right }) => {
                  if (!user?.rights?.map((r) => r.name).includes(right)) {
                    return;
                  }

                  if (!children) {
                    return (
                      <li className="nav-item" key={name}>
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href={route}
                        >
                          {name}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li className="nav-item dropdown" key={name}>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {name}
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        {children.map((child) => {
                          if (
                            !user?.rights
                              ?.map((r) => r.name)
                              .includes(child.right)
                          ) {
                            return;
                          }
                          return (
                            <li key={child.name}>
                              <a className="dropdown-item" href={child.route}>
                                {child.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>

              <ul
                className="nav navbar-nav navbar-right"
                style={{ marginRight: '80px' }}
              >
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a href={`/profile/${user.id}`} className="dropdown-item">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={logout} className="dropdown-item">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
