import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/menu.css';

const Menu = ({SetKitchen}) => {

// ---------------3D-card--------------------------------
  const cards = document.querySelectorAll('.card-menu');

  for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.addEventListener('mousemove', startRotate) ;
  card.addEventListener('mouseout', stopRotate) ;
  }
  function startRotate(event) {
  const cardItem = this.querySelector('.card-menu p');
  const halfHeight = cardItem.offsetHeight / 2;
  const halfWidth = cardItem.offsetWidth / 2;
  cardItem.style.transform = 'rotateX(' + (event.offsetY - halfHeight) / 15 + 'deg) rotateY(' + -(event.offsetX - halfWidth) / 15 + 'deg)';
  }
  function stopRotate(event) {
  const cardItem = this.querySelector('.card-menu p');
  cardItem.style.transform = 'rotate(0)';
  }
  // --------------------menu Setting---------------------------------------



    return(
        <div className='menu'>
      <div className="cards-menu">
        <div className="w-back">
          <div className="card-menu">
            <Link to='/kitchen' onClick={()=>SetKitchen('kitchen')} className='w'><p className='kitchen-Img'></p></Link>
          </div>
        </div>
        <div className="w-back">
          <div className="card-menu">
            <Link to='/kitchen' onClick={()=>SetKitchen('banquet')} className='w'><p className='banquet-Img'></p></Link>
          </div>
        </div>
        <div className="w-back">
            <div className="card-menu">
              <Link to='/kitchen' onClick={()=>SetKitchen('bar')} className='w'><p className='card-of-wine-Img'></p></Link>
            </div>
        </div> 
      </div>  
        </div>
    );
};

export default Menu