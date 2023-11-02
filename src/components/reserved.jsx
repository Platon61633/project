import React, { useState } from 'react';
import '../CSS/reservedNdelevery.css'
import resto from '../imagin/resto.jpg'


const Reserved = () => {


    const [DataReserver, SetDataReserver] = useState({
        name: null,
        surmane: null,
        date: null,
        time: null,
        tel: null,
        kolvo: 1,
        info: null
    })

    const SubmitData = ()=>{
        console.log(DataReserver);
        // window.location.reload()
    }

    return(
        <div className='reserved'>
            <img src={resto} alt="" />
            <div className='info-r'>
                <h1>РЕЗЕРВ СТОЛА</h1>
                <div className="inputs-r">
                    <input placeholder='Имя'  type="text" onChange={e=>SetDataReserver({...DataReserver, name: e.target.value})}/>
                    <input placeholder='Фамилия' type="text" onChange={e=>SetDataReserver({...DataReserver, surmane: e.target.value})}/>
                    <input placeholder='Дата' type="date" onChange={e=>SetDataReserver({...DataReserver, date: e.target.value})}/>
                    <input placeholder='Время' type="time" onChange={e=>SetDataReserver({...DataReserver, time: e.target.value})}/>
                    <input placeholder='Телефон' type="tel" onChange={e=>SetDataReserver({...DataReserver, tel: e.target.value})}/>
                    <div style={{width: '100%'}}>
                    <input type="text" placeholder={DataReserver.kolvo+' человек(а)'} onChange={e=>SetDataReserver({...DataReserver, kolvo: e.target.value})}/>
                    <br />
                    <input placeholder='' value={DataReserver.kolvo} onChange={e=>SetDataReserver({...DataReserver, kolvo: e.target.value})} min={1} max={20} type="range"/>
                    </div>
                    <input placeholder='Дополнительные пожелания' type="text" onChange={e=>SetDataReserver({...DataReserver, info: e.target.value})}/>
                </div>
                <p>Нажимая на кнопку "ОТПРАВИТЬ", вы даете согласие на <span>обработку своих персональных данных</span>. Для подтверждения бронирования с вами свяжется наш менеджер.
Или позвоните по телефону: <span>+7 (928) 100-43-11</span></p>
                <span className='submit-r' onClick={SubmitData}>ОТПРАВИТЬ</span>
            </div>
        </div>
    );
};

export default Reserved