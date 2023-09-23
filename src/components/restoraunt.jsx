import React, { useEffect, useState } from 'react';
import '../CSS/restoraunt.css';
import resto3 from '../imagin/resto3ob.jpg'
import arrowR from '../imagin/cil-arrow-circle-right.svg'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Resto = () => {

    const [Events, SetEvents] = useState([])


        useEffect(function GetEvents() {
            axios.get('https://restoraunt--specialdesign77.repl.co?for=event')
            .then(resp=>SetEvents(resp.data))
        }, [])

// -------------------parralax-------------------

        const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


    return(
        <div className='resto'>
            <div className='start'>
                <div className="resto3">
                <img src={resto3} alt="img" style={{ transform: `translateY(${offsetY * 0.1}px)`}}/>
                </div>
                <span className='title'>
                    <h1>Май</h1>
                    <span>Ресторан для ценителей русской, европейской и средиземноморской кухни. Это заведение прекрасно подходит как для деловых обедов, так и для семейных праздников.<br/> «Май» – место, где можно приятно провести вечер, сполна наслаждаясь хорошим обществом и вкусными блюдами.</span>
                    <div className='reserv'>
                    <span>РЕЗЕРВ СТОЛА</span>
                    <Link to='/'><img src={arrowR} alt="go" /></Link>
                    </div>
                </span>
            </div> 
            <h1>АНОНСЫ И СОБЫТИЯ</h1>
            <div className='events'>
               {Events.map(e=>
                <div className='event'>
                    <img src={resto3} alt='img'/>
                    <p>
                        <span>{e[1]}</span>
                        <h1>{e[2]}</h1>
                    </p>
                </div>
               )}
            </div>
        </div>
    );
};

export default Resto