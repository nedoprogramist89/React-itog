
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Домашняя</Link></li>
          <li><Link to="/catalog">Каталог</Link></li>
          <li><Link to="/favorites">Избранное</Link></li>
          <li><Link to="/cart">Корзина</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
