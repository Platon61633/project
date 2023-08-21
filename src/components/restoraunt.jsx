import React, { useEffect, useState } from 'react';
import '../CSS/restoraunt.css';
import resto3 from '../imagin/resto3ob.jpg'
import arrowR from '../imagin/cil-arrow-circle-right.svg'
import axios from 'axios';

const Resto = () => {

    const [Events, SetEvents] = useState([])


        useEffect(function GetEvents() {
            axios.get('http://backrestoraunt?for=event')
            .then(resp=>SetEvents(resp.data))
        }, [])
        


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
            <div className='events'>
               {Events.map(e=>
                <div className='event'>
                    {e[0]%2===0 ? <p></p> : <img src={e[3]}/>}
                    <p>
                        <span>{e[1]}</span>
                        <h1>{e[2]}</h1>
                    </p>
                    {e[0]%2===0 ? <img src={e[3]}/> : <p></p>}
                </div>
               )}
            </div>
        </div>
    );
};

export default Resto