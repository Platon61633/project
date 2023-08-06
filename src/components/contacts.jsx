import React from 'react';
import '../CSS/contacts.css'

const Contacts = () => {
    return(
        <div className='cont'>
            <div className='contacts'>
                <h1>Контакты:</h1>
                <div>
                    <p>Санкт-Петербург, Дворцовая наб., 34</p>
                    <a className='textDN' href="tel:+79891234567">+79891234567</a>
                    <a className='textDN' href="tel:+79897778998">+79897778998</a>
                </div>
                <h1>Режим работы:</h1>
                <div>
                    <p>Пн-Чт 08:00-00:00</p>
                    <p>Пт-Сб 08:00-01:00</p>
                    <p>Завтраки с 08:00-14:00</p>
                </div>
            </div>
        </div>
    );
};

export default Contacts