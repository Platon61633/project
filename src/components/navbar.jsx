import React, { useRef, useState } from 'react';
import '../CSS/body.css';
import logo from '../imagin/fleur-de-lis-gold.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Contacts from './contacts';
import Resto from './restoraunt';
import Polit from './polit';

const NavBar = ({image, SetImage}) => {

    const [Panel, SetPanel] = useState({onMouseOvery: null, div: [{title: 'Добро пожаловать в ресторан Май', Link:'/'}]})

    const resetPanel = (e) =>{
        e.preventDefault()
        SetPanel({onMouseOvery: null, div: [{title: 'Добро пожаловать в ресторан Май', Link:'/'}]})
    }

    

    const resto = (e) =>{
        e.preventDefault()
        SetPanel({
            onMouseOvery: resto,
            div: [{title: 'О ресторане', LinkTo: '/restoraunt'}, {title: 'Полезное', LinkTo: '/'}]
        })
    }

    const menu = (e) =>{
        e.preventDefault()
        SetPanel({
            onMouseOvery: menu,
            div: [
            {title:'Кухня', LinkTo: '/'}, 
            {title:'Специальное предложение', LinkTo: '/'},
            {title: 'Завтраки',LinkTo: '/'},
            {title:'Винная карта', LinkTo: '/'},
            {title: 'Бар', LinkTo: '/'},
            {title: 'Банктное меню', LinkTo: '/'}]
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
    const FuncResto = (e)=>{
        SetImage('img-restoraunt')
    }

    return(
        
        <BrowserRouter>
            <nav>
                <Link className='nav-item w' to='/restoraunt' onClick={FuncResto} onMouseOver={resto}>Ресторан</Link>
                <Link className='nav-item w' href='' onMouseOver={menu}>Меню</Link>
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
                    <Link to={e.LinkTo} onMouseOver={Panel.onMouseOvery} className='w panel-item'>
                        {e.title}
                    </Link>
            )}
            </div>
            <Routes>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/restoraunt' element={<Resto/>}/>
                <Route path='/body'/>
                    
                <Route path='/qwertyuiop' element={<Polit/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default NavBar