import React, {  useState } from 'react';
import '../CSS/body.css';
import menuLines from '../imagin/cil-menu.svg';
import logo from '../imagin/fleur-de-lis-gold.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Contacts from './contacts';
import Resto from './restoraunt';
import Polit from './polit';
import Useful from './useful';
import Body from './body';
import Menu from './menu';
import Kitcheny from './kitchen';
import Special from './special';
import MediaQuery from 'react-responsive';
import { Drawer, theme } from 'antd';

const NavBar = () => {

    const [Panel, SetPanel] = useState({onMouseOvery: null, div: [{title: 'Добро пожаловать в ресторан Май', Link:'/'}]})

    const resetPanel = (e) =>{
        e.preventDefault()
        SetPanel({onMouseOvery: null, div: [{title: 'Добро пожаловать в ресторан Май', Link:'/'}]})
    }


    const resto = (e) =>{
        e.preventDefault()
        SetPanel({
            onMouseOvery: resto,
            div: [{title: 'О ресторане', LinkTo: '/restoraunt'}, {title: 'Полезное', LinkTo: '/useful'}]
        })
    }


    const [Kitchen, SetKitchen] = useState('kitchen')

    const menu = (e) =>{
        e.preventDefault()
        SetPanel({
            onMouseOvery: menu,
            div: [
            {title:'Кухня', LinkTo: '/kitchen', Oclick: 'kitchen'}, 
            {title:'Специальное предложение', LinkTo: '/special'},
            {title: 'Банкетное меню', LinkTo: '/kitchen', Oclick: 'banquet'},
            {title:'Бар', LinkTo: '/kitchen', Oclick: 'bar'}
            ]
        })
    }

// ----------------------------------------------------------------------------
    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
    

    return(
        
        <BrowserRouter>
            <MediaQuery minWidth={1224}>
                <nav className='desktop'>
                    <Link className='nav-item w' to='/restoraunt' onMouseOver={resto}>Ресторан</Link>
                    <Link className='nav-item w' to='/menu' onMouseOver={menu}>Меню</Link>
                    <Link className='nav-item w logo' to='/body' onMouseOver={resetPanel}>
                        <img src={logo} width={60} alt="logo" />
                        <span>Май</span>
                    </Link>
                    <Link className='nav-item w click' href='' onMouseOver={resetPanel}>Доставка</Link>
                    <Link className='nav-item w click' to='/contacts' onMouseOver={resetPanel}>Контакты</Link>
                </nav>
                <div 
                onMouseOver={Panel.onMouseOvery}
                onMouseOut={resetPanel}
                className='panel'>
                    {Panel.div.map(
                    e => 
                        <Link to={e.LinkTo} onClick={()=>SetKitchen(e.Oclick)} onMouseOver={Panel.onMouseOvery} className='w panel-item'>
                            {e.title}
                        </Link>
                )}
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={1224}>
                <nav className='mobile'>
                    <div></div>
                    <Link className='w logo logo-mobile' to='/body'>
                        <img src={logo} width={60} alt="logo" />
                        <span>Май</span>
                    </Link>
                    <img src={menuLines} onClick={showDrawer} width={80} alt="" />
                </nav>
            </MediaQuery>

      <Drawer style={{backgroundColor: 'rgb(196, 117, 47)', fontSize: '2em', }} className='drawer' title="Май" placement="top" closable={false} getContainer={false} onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>






            <Routes>
                <Route path='/' element={<Body/>}/>
                <Route path='/body' element={<Body/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/restoraunt' element={<Resto/>}/>
                <Route path='/menu' element={<Menu SetKitchen={SetKitchen}/>}/>
                <Route path='/useful' element={<Useful/>}/>
                <Route path='/kitchen' element={<Kitcheny Kitchen={[Kitchen, SetKitchen]}/>}/>
                <Route path='/special' element={<Special/>}/>

                <Route path='/qwertyuiop' element={<Polit/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default NavBar