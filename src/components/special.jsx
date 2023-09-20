import React, { useEffect, useState } from 'react';
import watermelon from '../imagin/watermelon.jpg'
import cheescake from '../imagin/cheesecake.jpg'
import axios from 'axios';

const Special = () => {


    const [ArrSpecial, SetArrSpecial] = useState([])

    useEffect(
        async ()=> {
            await axios.get('https://restoraunt--specialdesign77.repl.co/?for=special')
            .then(rsp=> SetArrSpecial(rsp.data))
        }, []
    )


    return(
        <div className='special'>
            {ArrSpecial.map(e=>
                <div className="special-post">
                <h1>{e[1]}</h1>
                <img src='https://s1.1zoom.ru/b5050/22/343886-sepik_2048x1152.jpg' alt="" />
                <p>Цена: {e[3]}р - {e[4]}г</p>
            </div>
                )}
        </div>
    );
};

export default Special