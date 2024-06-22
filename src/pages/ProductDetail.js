
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/Home.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  const addToFavorites = () => {
    fetch('http://localhost:3001/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then(response => {
      if (response.ok) {
        alert('Добавить в Избранное!');
      } else {
        alert('Ошибочка.');
      }
    });
  };

  const addToCart = () => {
    fetch('http://localhost:3001/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then(response => {
      if (response.ok) {
        alert('Добавить в корзину!');
      } else {
        alert('Ошибочка.');
      }
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.price} ₽</p>
      <button onClick={addToCart}>Добавить в корзину</button>
      <button onClick={addToFavorites}>Добавить в избранное</button>
    </div>
  );
}

export default ProductDetail;
