import React, { useState } from 'react';
import '../CSS/reservedNdelevery.css'
import resto from '../imagin/resto.jpg'


const Reserved = () => {

    const [People, SetPeople] = useState(1)

    return(
        <div className='reserved'>
            <img src={resto} alt="" />
            <div className='info-r'>
                <h1>РЕЗЕРВ СТОЛА</h1>
                <div className="inputs-r">
                    <input placeholder='Имя' type="text" />
                    <input placeholder='Фамилия' type="text" />
                    <input placeholder='Дата' type="date" />
                    <input placeholder='Время' type="time" />
                    <input placeholder='' type="tel" />
                    <div style={{width: '100%'}}>
                    <div>{People} человек(a)</div>
                    <input placeholder=''onChange={e=>SetPeople(e.target.value)} value={People} min={1} max={20} type="range"/>
                    </div>
                    <input placeholder='Дополнительные пожелания' type="text" />
                </div>
                <p>Нажимая на кнопку "ОТПРАВИТЬ", вы даете согласие на <span>обработку своих персональных данных</span>. Для подтверждения бронирования с вами свяжется наш менеджер.
Или позвоните по телефону: <span>+7 (928) 100-43-11</span></p>
                <span className='submit-r'>ОТПРАВИТЬ</span>
            </div>
        </div>
    );
};

export default Reserved