import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FeedbackForm from '../components/FeedbackForm';
import '../Styles/Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    fetch('http://localhost:3001/products?_limit=10')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    alert('Message sent successfully!');
  };

  return (
    <div className="home">
      <h1>Добро пожаловать в магазин фигурок!</h1>
      <p className="site-description">
        Мы предлагаем широкий ассортимент фигурок аниме высокого качества. Посетите наш каталог, чтобы найти свою любимую аниме-фигурку!
      </p>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <Link to={`/product/${product.id}`}className="detail-link">Подробнее</Link>
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default Home;
