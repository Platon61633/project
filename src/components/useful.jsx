import React, { useEffect, useState } from 'react';
import '../CSS/restoraunt.css';
import axios from 'axios';
import reload from '../imagin/reload-loading-svgrepo-com.svg';

const Useful = () => {

    const [Useful, SetUseful] = useState([])

    const [Loader, SetLoader] = useState(false)

    const costyl = async ()=>{
        await axios.get('https://back-restoraunt.vercel.app/api?for=useful')
        .then(rsp=> SetUseful(rsp.data))
        SetLoader(false)
    }

    useEffect(()=> {
        SetLoader(true)
        costyl()
    }, [])
    return(
        <div className='useful'>
            {/* <div className='sation'>
                <h1>Медовый Спас в ресторане «Май»</h1>
                <time>14 августа 2023</time>
                <hr/>
                <div className='desc'>
                    Август богат на большие православные и народные праздники. По многолетней традиции, 14 августа празднуется Первый Спас — Медовый. Приглашаем гостей курорта насладиться ароматным чаем с медом в уютной атмосфере загородного ресторана «В Чаще».
                <br />
                <p>
                    <div><strong>Время:</strong> 12:00</div>
                    <div><strong>Телефон для бронирования столиков:</strong> +7 (812) 925-80-88</div>
                </p>
                </div>
            </div> */}
            
            {Loader?
                <div className='special-load'>
                    <p>
                    <img src={reload} alt='Загрузка'/>
                    </p>
                </div>
                :
                <></>}

            {Useful.map(
                e=>
                <div className="sation">
                <h1>{e[1]}</h1>
                <time>{e[2]}</time>
                <hr/>
                <div className='desc'>
                    {e[3]}                
                    <br />
                <p>
                    <div><strong>Время:</strong>{e[4]}</div>
                    <div><strong>Телефон для бронирования столиков:</strong> +{e[5]}</div>
                </p>
                </div>
            </div>
            )}
                

        </div>
    );
};

export default Useful