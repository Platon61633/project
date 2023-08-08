import React from 'react';
import '../CSS/restoraunt.css';
import resto3 from '../imagin/resto3ob.jpg'
import arrowR from '../imagin/cil-arrow-circle-right.svg'

const Resto = () => {
    return(
        <div className='resto'>
            <div className='start'>
                <img className='resto3' src={resto3} alt="img" />
                <span className='title'>
                    <h1>Май</h1>
                    <span>Ресторан для ценителей русской, европейской и средиземноморской кухни. Это заведение прекрасно подходит как для деловых обедов, так и для семейных праздников.<br/> «Май» – место, где можно приятно провести вечер, сполна наслаждаясь хорошим обществом и вкусными блюдами.</span>
                    <div className='reserv'>
                    <span>РЕЗЕРВ СТОЛА</span>
                    <a href=""><img src={arrowR} alt="go" /></a>
                    </div>
                </span>
            </div> 
            <h1 style={{margin: '250px 0 150px'}}>АНОНСЫ И СОБЫТИЯ</h1>
            <div className='event'>
                <img src={arrowR} alt="img" />
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio, officia perferendis aspernatur aliquid unde eum odit commodi accusamus repudiandae cumque illo quisquam aliquam quos nemo sapiente eius provident in?</div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio, officia perferendis aspernatur aliquid unde eum odit commodi accusamus repudiandae cumque illo quisquam aliquam quos nemo sapiente eius provident in?</div>
                <img src={arrowR} alt="img" />
                <img src={arrowR} alt="img" />
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio, officia perferendis aspernatur aliquid unde eum odit commodi accusamus repudiandae cumque illo quisquam aliquam quos nemo sapiente eius provident in?</div>
            </div>
        </div>
    );
};

export default Resto