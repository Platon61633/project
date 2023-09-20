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
            ArrSpecial.map(async e=>await axios.get(e[2]).then(r=>SetArrSpecial([...ArrSpecial, r])))
        }, []
    )


    return(
        <div className='special'>
            {ArrSpecial.map(e=>
                <div className="special-post">
                <h1>{e[1]}</h1>
                <img src={e[5]} alt="" />
                <p>Цена: {e[3]}р - {e[4]}г</p>
            </div>
                )}
        </div>
    );
};

export default Special