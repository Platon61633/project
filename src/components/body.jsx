import React, { useState } from 'react';
import '../CSS/body.css';
import NavBar from './navbar';





const Body = () => {

    const [image, SetImage] = useState('img-home')

    return(
        <div className='body'>
            <div id='preview' className={image}>
                <NavBar image={image} SetImage={SetImage}/>
            </div>
        </div>
    );
};

export default Body