import React, { useEffect, useState } from 'react';
import watermelon from '../imagin/watermelon.jpg'
import cheescake from '../imagin/cheesecake.jpg'
import axios from 'axios';

const Special = () => {


    const [ArrSpecial, SetArrSpecial] = useState([])

    useEffect(
        ()=> {
            axios.get('http://backrestoraunt?for=special')
            .then(rsp=> ArrSpecial(rsp.data))
        }, []
    )


    return(
        <div className='special'>
            {ArrSpecial.map(e=>
                <div className="special-post">
                <h1>{e[1]}</h1>
                <img src={e[2]} alt="" />
                <p>Цена: {e[3]}р - {e[4]}г</p>
            </div>
                )}
        </div>
    );
};

export default Special