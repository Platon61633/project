import React, { useEffect, useState } from 'react';
import cheescake from '../imagin/cheesecake.jpg';
import axios from 'axios';
import reload from '../imagin/reload-loading-svgrepo-com.svg';

const Special = () => {


    const [ArrSpecial, SetArrSpecial] = useState([])

    const [Loader, SetLoader] = useState(false)

    const costyl = async ()=>{
        await axios.get('https://back-restoraunt.vercel.app/api?for=special').then(r=>SetArrSpecial(r.data))
        SetLoader(false)
    }

    useEffect(()=> {
        SetLoader(true)
        costyl()
    }, [])

    


    return(
        <div className='special'>
            {Loader?
                <div className='special-load'>
                    <p>
                    <img src={reload} alt='Загрузка'/>
                    </p>
                </div>
                :
                <></>}
            {
            ArrSpecial.map(e=>
                <div className="special-post">
                <h1>{e[1]}</h1>
                <img src={`https://back-restoraunt.vercel.app/img/${e[2]}`} alt={e[2]} />
                <p>Цена: {e[3]}р - {e[4]}</p>
            </div>
                )
                }
        </div>
    );
};

export default Special