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
                <img src='https://s703sas.storage.yandex.net/rdisk/0dc48cbd60d8806f873df6f5bdf9c8d08be83cfe26d3e2268cc683eabf1eef53/650b3f90/pLKsccCUKt8sSRvPUMBb9UnxkhUxOi6t7r62jopjyhAbvTgvobP2ZViXjN4KwGLxKIdcmqisxlw_JMONXLCAkg==?uid=1881416935&filename=cheesecake.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1881416935&fsize=539832&hid=a2d3835408b519a27566bb5806292ff3&media_type=image&tknv=v2&etag=bf6fb0e620c8a3f64eb43ef2ca5f91d9&rtoken=khaEDMBHFANX&force_default=yes&ycrid=na-8b0181173eb1f271e406101c7fb3a53b-downloader5f&ts=605cee2a30400&s=de6ecb36a61c139eed98d124134b7c5ab0f9afd616b4a8e2eff4d7ebedb4727d&pb=U2FsdGVkX1-w83sipK1nMBaA2NEmETjiadxUyW1qknL8jys600vB_H66yexETVikzFqIDxJ7C_552Q9uyVwgu5jB9houSRlUMWx0FJkyTsY' alt="" />
                <p>Цена: {e[3]}р - {e[4]}г</p>
            </div>
                )}
        </div>
    );
};

export default Special