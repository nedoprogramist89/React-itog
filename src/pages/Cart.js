import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';
import '../Styles/Cart.css';

Modal.setAppElement('#root');

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    cardNumber: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/cart')
      .then(response => response.json())
      .then(data => setCartItems(data));
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveFromCart = (id) => {
    fetch(`http://localhost:3001/cart/${id}`, {
      method: 'DELETE'
    }).then(() => {
      const updatedCartItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCartItems);
    }).catch(error => {
      console.error('Error deleting item from cart:', error);
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      address: formData.address,
      email: formData.email,
      cardNumber: formData.cardNumber,
      total: calculateTotal(),
    };

    emailjs.send('service_jo3e6ll', 'template_v6b7tt6', templateParams, 'el6TLQiCkXabBUCgV')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Order placed and sent to email!');
        setModalIsOpen(false);
      }, (error) => {
        console.error('FAILED...', error);
        alert('Error sending order, please try again.');
      });
  };

  return (
    <div className="cart">
      <h2>Корзина</h2>
      <div className="products">
        {cartItems.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price} ₽</p>
            <Link to={`/product/${item.id}`} className="detail-link">Подробнее</Link>
            <button onClick={() => handleRemoveFromCart(item.id)}>Удалить из корзины</button>
          </div>
        ))}
      </div>
      <div className="total">
        <h3>Total: {calculateTotal()} ₽</h3>
        <button onClick={() => setModalIsOpen(true)}>Оформить заказ</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Order Form"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Оформление заказа</h2>
        <form onSubmit={handleOrderSubmit}>
          <label>
            Имя:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <label>
            Адрес:
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
          </label>
          <label>
            Почта:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </label>
          <label>
            Номер карты:
            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
          </label>
          <button type="submit">Готово</button>
        </form>
      </Modal>
    </div>
  );
}

export default Cart;
