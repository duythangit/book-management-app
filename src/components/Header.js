import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Book Management App</h1>
      <hr />
      <div className="links">
      {/* - NavLink chỉ định đường dẫn đến các trang khác nhau trong ứng dụng. NavLink nằm trong react-router-dom
       - exact được sử dụng để đảm bảo rằng liên kết chỉ hoạt động khi đường dẫn chính xác khớp với đường dẫn của trang hiện tại. */}
        <NavLink to="/" className="link" activeClassName="active" exact> 
          Books List
        </NavLink>
        <NavLink to="/add" className="link" activeClassName="active">
          Add Book
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
