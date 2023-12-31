import React, { useState } from 'react';
import '../CSS/reservedNdelevery.css'
import resto from '../imagin/resto.jpg'
import reload from '../imagin/reload-loading-svgrepo-com.svg';
import axios from 'axios';
import MediaQuery from 'react-responsive';


const Reserved = () => {


    const [DataReserver, SetDataReserver] = useState({
        name: null,
        surname: null,
        date: null,
        time: null,
        tel: null,
        kolvo: 1,
        info: null
    })

    const [Sucsessfull, SetSucsessfull] = useState([false, false, [1,2]])

    const SubmitData = async ()=>{
        // console.log(...Sucsessfull[2]);
        if (DataReserver.name===null) {
            SetSucsessfull([false, true, [...Sucsessfull[2], ' Имя']])
            console.log(Sucsessfull[2]);
        }
        if (DataReserver.surname===null) SetSucsessfull([false, true, [...Sucsessfull[2], ' Фамилию']])

        if (DataReserver.date===null) SetSucsessfull([false, true, [...Sucsessfull[2], ' Дату']])

        if (DataReserver.time===null) SetSucsessfull([false, true, [...Sucsessfull[2], ' Время']])

        if (DataReserver.tel===null) SetSucsessfull([false, true, [...Sucsessfull[2], ' Номер телефона']])
             
        if (DataReserver.kolvo===null) SetSucsessfull([false, true, [...Sucsessfull[2], ' Количество человек']])
        
        if (Sucsessfull[1]) {
                SetSucsessfull([-1, false])
                await axios.post('https://back-restoraunt.vercel.app/api?for=reserved', JSON.stringify([
                DataReserver.name, 
                DataReserver.surname, 
                DataReserver.date, 
                DataReserver.time,
                DataReserver.tel,
                DataReserver.kolvo,
                DataReserver.info]))
                .then(r=>SetSucsessfull([r.data, Sucsessfull[1]]))
        }
                
        
        
    }

    return(
        <div className='reserved'>
            {Sucsessfull[0]===-1?
                <div className='reserved-load'>
                    <p>
                    <img src={reload} alt='Загрузка'/>
                    </p>
                </div>
            :
            <></>}
            {Sucsessfull[0]===1?
                <div className='reserved-sucs' onClick={()=>SetSucsessfull([false, Sucsessfull[1]])}>
                    <span onClick={e=>e.stopPropagation()}>
                        <h1>Вы зарезервировали стол</h1>
                        <p>На имя: {DataReserver.surname} {DataReserver.name}</p>
                        <p>{new Intl.DateTimeFormat("ru", {dateStyle: "full"}).format(new Date(DataReserver.date))}, в {DataReserver.time}</p>
                        <p>На {DataReserver.kolvo} человек</p>
                        <p>Телефон обращения: {DataReserver.tel}</p>
                        <p>Дополнительная информация: {DataReserver.info}</p>
                    </span>
                </div>
            :
            <></>
            }
            {Sucsessfull[1]?
            <div className="reserved-sucs" onClick={()=>SetSucsessfull([false, Sucsessfull[1]])}>
                <span onClick={e=>e.stopPropagation()}>Введите{Sucsessfull[2].join(',')}</span>
            </div>
            :
            <></>}
            {Sucsessfull[0]===2 ?
            <div>
                Возникла ошибка
            </div>
            :
            <></>
            }
            <MediaQuery minWidth={900}>
                <img src={resto} alt="" />
            </MediaQuery>
            <div className='info-r'>
                <h1>РЕЗЕРВ СТОЛА</h1>
                <div className="inputs-r">
                    <input placeholder='Имя'  type="text" onChange={e=>SetDataReserver({...DataReserver, name: e.target.value})}/>
                    <input placeholder='Фамилия' type="text" onChange={e=>SetDataReserver({...DataReserver, surname: e.target.value})}/>
                    <input placeholder='Дата' type="date" max='2024-12-31' onChange={e=>SetDataReserver({...DataReserver, date: e.target.value})}/>
                    <input placeholder='Время' type="time" min='08:00' max='23:00' onChange={e=>SetDataReserver({...DataReserver, time: e.target.value})}/>
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