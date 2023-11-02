import React, { useEffect, useState } from 'react';
import '../CSS/restoraunt.css';
import resto3 from '../imagin/resto3ob.jpg'
import arrowR from '../imagin/cil-arrow-circle-right.svg'
import reload from '../imagin/reload-loading-svgrepo-com.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Resto = () => {

    const [Events, SetEvents] = useState([])

    const [Loader, SetLoader] = useState(false)

    const costyl = async ()=> {
        await axios.get('https://back-restoraunt.vercel.app/api?for=event')
        .then(resp=>SetEvents(resp.data))
        SetLoader(false)}

        useEffect(()=> {
            SetLoader(true)
            costyl()
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
                    <Link to='/reserved'><img src={arrowR} alt="go" /></Link>
                    </div>
                </span>
            </div> 
            <h1>АНОНСЫ И СОБЫТИЯ</h1>
            {Loader?
                <div className='special-load'>
                    <p>
                    <img src={reload} alt='Загрузка'/>
                    </p>
                </div>
                :
                <></>}
            <div className='events'>
               {Events.map(e=>
                <div className='event'>
                    <img src={`https://back-restoraunt.vercel.app/img/${e[3]}`} alt='img'/>
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