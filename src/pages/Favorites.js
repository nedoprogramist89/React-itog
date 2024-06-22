import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css'; // Подключаем файл стилей

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/favorites')
      .then(response => response.json())
      .then(data => setFavorites(data));
  }, []);

  const handleRemoveFavorite = (id) => {
    // Отправляем запрос на сервер для удаления из избранного
    fetch(`http://localhost:3001/favorites/${id}`, {
      method: 'DELETE'
    }).then(() => {
      // После удаления обновляем список избранных, исключая удаленный элемент
      const updatedFavorites = favorites.filter(favorite => favorite.id !== id);
      setFavorites(updatedFavorites);
    }).catch(error => {
      console.error('Error deleting favorite:', error);
      // Возможно, показать пользователю сообщение об ошибке
    });
  };

  return (
    <div className="favorites">
      <h2>Избранное</h2>
      <div className="products">
          {favorites.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} ₽</p>
              <Link to={`/product/${product.id}`} className="detail-link">Подробнее</Link>
              <button onClick={() => handleRemoveFavorite(product.id)}>Удалить из избранного</button>
            </div>
          ))}
        </div>
    </div>
  );
}

export default Favorites;
