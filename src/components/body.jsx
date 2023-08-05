import React, { useRef, useState } from 'react';
import '../CSS/body.css';
import logo from '../imagin/fleur-de-lis-gold.svg';

const Body = () => {
    const [Panel, SetPanel] = useState({onMouseOvery: null, div: ['Добро пожаловать в ресторан Май']})

    const resetPanel = (e) =>{
        e.preventDefault()
        SetPanel({onMouseOvery: null, div: []})
    }

    

    const resto = (e) =>{
        e.preventDefault()
        SetPanel({
            onMouseOvery: resto,
            div: ['О ресторане', 'Полезное']
        })
    }

    const menu = (e) =>{
        e.preventDefault()
        SetPanel({
            onMouseOvery: menu,
            div: ['Кухня', 'Специальное предложение', 'Завтраки', 'Винная карта','Бар','Банктное меню']
        })
    }


    

    return(
        <div className='body'>
            <div className='preview'>
                <div>
                <nav>
                    <a className='nav-item w resto' href='' onMouseOver={resto}>Ресторан</a>
                    <a className='nav-item w menu' href='' onMouseOver={menu}>Меню</a>
                    <a className='nav-item w logo' href=''>
                        <img src={logo} width={60} alt="logo" />
                        <span>Май</span>
                    </a>
                    <a className='nav-item w click' href='' onMouseOver={resetPanel}>
                        Доставка
                            </a>
                    
                    <a className='nav-item w click' href='' onMouseOver={resetPanel}>
                        Контакты
                    </a>
                    
                </nav>
                    <div 
                    onMouseOver={Panel.onMouseOvery}
                    onMouseOut={resetPanel}
                    className='panel'>
                    {Panel.div.map(
                        e => 
                        <div onMouseOver={Panel.onMouseOvery} className='panel-item'>
                            {e}
                        </div>
                    )}
                    </div>
                    </div>
                
            </div>
        </div>
    );
};

export default Body