import axios from 'axios';
import React, { useEffect, useState } from 'react';
import reload from '../imagin/reload-loading-svgrepo-com.svg'





const Kitcheny = ({Kitchen}) => {

    const [PanelKitchen, SetPanelKitchen] = useState(['ЗАКУСКИ', 'ОСНОВНОЕ БЛЮДО', 'САЛАТЫ', 'СУПЫ', 'ДЕСЕРТ', 'НАПИТКИ'])

    const [GotKitchen, SetGotKitchen] = useState([])

    const [Loader, SetLoader] = useState(false)
    
    const GetKichen = async (e) => {
            SetGotKitchen([])
            SetLoader(true)
            await axios.get('https://back-restoraunt.vercel.app/api?for=kitchen&type='+e)
            .then(rsp=> SetGotKitchen(rsp.data))
            SetLoader(false)
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
        default:

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
                {Loader?
                <div className="reload">
                    <p>
                    <img src={reload} alt='Загрузка'/>
                    </p>
                </div>
                :
                <></>}
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