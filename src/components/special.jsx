import React, { useEffect, useState } from 'react';
import cheescake from '../imagin/cheesecake.jpg';
import axios from 'axios';

const Special = () => {


    const [ArrSpecial, SetArrSpecial] = useState([])


    useEffect(()=> {
        axios.get('https://back-restoraunt.vercel.app/api?for=special').then(r=>SetArrSpecial(r.data))

    }, [])

    


    return(
        <div className='special'>
            
            {
            ArrSpecial.map(e=>
                <div className="special-post">
                <h1>{e[1]}</h1>
                <img src={cheescake} alt={e[2]} />
                <p>Цена: {e[3]}р - {e[4]}г</p>
            </div>
                )
                }
        </div>
    );
};

export default Special