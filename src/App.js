// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/ProductDetail';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites'; // Импортируем компонент избранного
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} /> {/* Добавляем маршрут */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
