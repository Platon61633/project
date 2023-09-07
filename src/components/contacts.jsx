import React from 'react';
import '../CSS/contacts.css'


const Contacts = () => {

    return(
        <div className='cont'>
            <div style={{height: '100px'}}></div>
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
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae2f613997e84e2a7acc10e47a7ecda90b49533f14d157836f6022ea5e867b5b2&amp;source=constructor" width="100%" height="541" frameborder="0">
            </iframe>
        </div>
    );
};

export default Contacts