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
import { Collapse, Drawer } from 'antd';

const NavBar = () => {

    const [PanelDesktop, SetPanelDesktop] = useState({onMouseOvery: null, div: [{title: 'Добро пожаловать в ресторан Май', Link:'/'}]})

    const resetPanel = (e) =>{
        e.preventDefault()
        SetPanelDesktop({onMouseOvery: null, div: [{title: 'Добро пожаловать в ресторан Май', Link:'/'}]})
    }


    const resto = (e) =>{
        e.preventDefault()
        SetPanelDesktop({
            onMouseOvery: resto,
            div: [{title: 'О ресторане', LinkTo: '/restoraunt'}, {title: 'Полезное', LinkTo: '/useful'}]
        })
    }


    const [Kitchen, SetKitchen] = useState('kitchen')

    const menu = (e) =>{
        e.preventDefault()
        SetPanelDesktop({
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
    const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      key: '1',
      label: 'Ресторан',
      children: <span ><Link to='/restoraunt' onClick={onClose} className='w'>
      О ресторане
    </Link>
    <hr/>
    <Link to='/useful' onClick={onClose} className='w'>
      Полезное
    </Link>
    </span>
    ,
    }
  ];
    

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
                onMouseOver={PanelDesktop.onMouseOvery}
                onMouseOut={resetPanel}
                className='panel'>
                    {PanelDesktop.div.map(
                    e => 
                        <Link to={e.LinkTo} onClick={()=>SetKitchen(e.Oclick)} onMouseOver={PanelDesktop.onMouseOvery} className='w'>
                            {e.title}
                        </Link>
                )}
                </div>
            </MediaQuery>


{/* ----------------mobile---------------------- */}

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

      <Drawer style={{backgroundColor: 'rgb(196, 117, 47)' }} className='drawer' title="Май" placement="top" closable={false} getContainer={false} onClose={onClose} open={open}>
                    
                        <Collapse items={items} ghost={true}/>
                    <Link className='w' to='/menu' onClick={onClose}>Меню</Link>
                    <Link className='w' href='' onClick={onClose}>Доставка</Link>
                    <Link className='w' to='/contacts' onClick={onClose}>Контакты</Link>
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