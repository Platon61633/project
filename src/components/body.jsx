import React, { useState } from 'react';
import '../CSS/body.css';





const Body = () => {

    const [image, SetImage] = useState('img-home')

    return(
        <div className='body'>
            <div id='preview' className={image}>
                <div style={{height: '1000px'}}></div>
            </div>
        </div>
    );
};

export default Body