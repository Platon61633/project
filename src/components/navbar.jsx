import React, { useRef, useState } from 'react';
import '../CSS/body.css';
import logo from '../imagin/fleur-de-lis-gold.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Contacts from './contacts';

const NavBar = ({image, SetImage}) => {

    const [Panel, SetPanel] = useState({onMouseOvery: null, div: ['Добро пожаловать в ресторан Май']})

    const resetPanel = (e) =>{
        e.preventDefault()
        SetPanel({onMouseOvery: null, div: ['Добро пожаловать в ресторан Май']})
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

    // const May =  (e) =>{
    //     e.preventDefault()
    //     SetPanel({
    //         onMouseOvery: May,
    //         div: ['Добро пожаловать в ресторан Май']
    //     })
    // }

    const FuncCont = (e) =>{
        SetImage('img-cont')
    }

    const FuncHome = (e) =>{
        SetImage('img-home')
    }

    return(
        
        <BrowserRouter>
            <nav>
                <Link className='nav-item w resto' href='' onMouseOver={resto}>Ресторан</Link>
                <Link className='nav-item w menu' href='' onMouseOver={menu}>Меню</Link>
                <Link className='nav-item w logo' to='/body' onClick={FuncHome} onMouseOver={resetPanel}>
                    <img src={logo} width={60} alt="logo" />
                    <span>Май</span>
                </Link>
                <Link className='nav-item w click' href='' onMouseOver={resetPanel}>Доставка</Link>
                <Link className='nav-item w click' to='/contacts' onClick={FuncCont} onMouseOver={resetPanel}>Контакты</Link>
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
            <Routes>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/body'/>
            </Routes>
        </BrowserRouter>
    );
};

export default NavBar