import axios from 'axios';
import React, { useEffect, useState } from 'react';





const Kitcheny = ({Kitchen}) => {

    const [PanelKitchen, SetPanelKitchen] = useState(['ЗАКУСКИ', 'ОСНОВНОЕ БЛЮДО', 'САЛАТЫ', 'СУПЫ', 'ДЕСЕРТ', 'НАПИТКИ'])

    const [GotKitchen, SetGotKitchen] = useState([])
    
    const GetKichen = async (e) => {
            await axios.get('http://backrestoraunt?for=kitchen&type='+e)
            .then(rsp=> SetGotKitchen(rsp.data))
    }


    useEffect(()=>{

    

    switch (Kitchen[0]) {
        case 'kitchen':
            GetKichen('ЗАКУСКИ')
            SetPanelKitchen([
                'ЗАКУСКИ', 'ОСНОВНОЕ БЛЮДО', 'САЛАТЫ', 'СУПЫ', 'ДЕСЕРТ'
            ])
            break;

        case 'bar':
            GetKichen('ГОРЯЧИЕ НАПИТКИ')
            SetPanelKitchen([
                'КОФЕ', 
                'ЧАЙ', 
                'БЕЗАЛКОГОЛЬНЫЕ НАПИТКИ', 
                'ВИНО', 
                'ВИНО ИГРИСТОЕ', 
                'КОКТЕЙЛИ', 
                'ПИВО', 
                'ВОДКА', 
                'КОНЬЯК', 
                'ВИСКИ', 
                'БРЭНДИ', 
                'ДЖИН', 
                'РОМ'
            ])
            break;

        case 'banquet':
            GetKichen('БАНКЕТНОЕ МЕНЮ')
            SetPanelKitchen([
                'БАНКЕТНОЕ МЕНЮ'
            ])
            break;
}}, [Kitchen[0]])



    return(
        <div className='kitchen'>
            <p className='head-k'>
                <span>МЕНЮ</span><br />
                НАШЕГО РЕСТОРАНА
            </p>
            <div className="panel-kitchen">

            {PanelKitchen.map(
                e =>
                <div className="panel-kitchen-item" onClick={()=>GetKichen(e)}>{e}</div>
            )}
            </div>

            <div className="kitchen-menu">
                {GotKitchen.map(e=>
                <div className='kitchen-menu-item'>
                    <div>
                        <h1>{e[2]}</h1>
                        <p>{e[3]}</p>
                    </div>
                    <div style={{marginLeft: '15px'}}>
                        {e[4]}г, {e[5]}руб
                    </div>
                </div>
                 )}
            </div>
        </div>
    );
};

export default Kitcheny