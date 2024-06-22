import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Modal from 'react-modal';
import '../Styles/FeedbackForm.css';

Modal.setAppElement('#root');

function FeedbackForm() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name, 
      reply_to: formData.email, 
      message_html: formData.message 
    };

    emailjs.send('service_jo3e6ll', 'template_b6fh2kt', templateParams, 'el6TLQiCkXabBUCgV')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Сообщение отправлено успешно!');
        setModalIsOpen(false);
      }, (error) => {
        console.error('FAILED...', error);
        alert('Ошибка при отправке сообщения, попробуйте еще раз.');
      });
  };

  return (
    <div className="feedback-form">
      <button onClick={() => setModalIsOpen(true)}>Обратная связь</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Форма обратной связи"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Форма обратной связи</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Имя:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </label>
          <label>
            Сообщение:
            <textarea name="message" value={formData.message} onChange={handleInputChange} required />
          </label>
          <button type="submit">Отправить</button>
        </form>
      </Modal>
    </div>
  );
}

export default FeedbackForm;
