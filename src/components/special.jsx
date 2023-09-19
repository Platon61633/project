import React, { useEffect, useState } from 'react';
import watermelon from '../imagin/watermelon.jpg'
import cheescake from '../imagin/cheesecake.jpg'
import axios from 'axios';

const Special = () => {


    const [ArrSpecial, SetArrSpecial] = useState([])

    useEffect(
        ()=> {
            axios.get('http://restoraunt.wuaze.com/index.php?for=special')
            .then(rsp=> console.log(rsp.data+'ffffff'))
            console.log('gg');
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore libero nesciunt fugiat voluptatem. Amet dignissimos dolor nesciunt incidunt laborum numquam saepe repudiandae architecto perspiciatis, molestias autem magni at! Sed, soluta?
        </div>
    );
};

export default Special