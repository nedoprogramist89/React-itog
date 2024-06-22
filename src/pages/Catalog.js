// src/pages/Catalog.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Catalog.css';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div className="catalog">
      <h1>Каталог</h1>
      <div className="catalog-content">
        <div className="filters">
          <input
            type="text"
            placeholder="Поиск по каталогу"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select onChange={handleCategoryChange} value={selectedCategory} className="category-select">
            <option value="Все">Все</option>
            <option value="Атака титанов">Атака титанов</option>
            <option value="Берсерк">Берсерк</option>
            <option value="Моя геройская академия">Моя геройская академия</option>
            <option value="Ванпанчмен">Ванпанчмен</option>
          </select>
        </div>
        <div className="products">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} ₽</p>
              <Link to={`/product/${product.id}`} className="detail-link">Подробнее</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
