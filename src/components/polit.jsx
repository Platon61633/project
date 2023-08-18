import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import trash from '../imagin/cil-trash.svg';
import close from "../imagin/cil-x-circle.svg";
import pencil from '../imagin/cil-pencil.svg'
import { useNavigate } from 'react-router-dom';
import resto from '../imagin/resto.jpg'
// import prro from 'https://mobilesyrup.com/wp-content/uploads/2020/01/grammy-awards-scaled.jpg';
// import prro from 'https://drive.google.com/file/d/1-IXQ5RMW6JOfyWZ2lR5LwRadqHbakifw/view?usp=sharing';

const Polit = () => {


    const [Inp, SetInp] = useState({name: '', desc: '', img: ''})
    const [Fix, SetFix] = useState({name: '', desc: '', img: ''})




    const events = useRef(null);
    const GoEvents = (e)=>{
        events.current?.scrollIntoView({behavior: 'smooth'});
    }

    const [PolEvents, SetEvents] = useState([])

    useEffect(function GetEvents() {
        axios.get('http://backrestoraunt/events.php')
        .then(resp=>SetEvents(resp.data))
    }, [])


    const dlt = async (e) =>{
        await axios.delete('http://backrestoraunt/events.php',{ data: e })
        window.location.reload();
    }
    const creatTd = async ()=>{
        await axios.post('http://backrestoraunt/events.php',JSON.stringify([Inp.name, Inp.desc, Inp.img]))
        window.location.reload();
    }

    const navigate = useNavigate();

    const [fixF, SetFixF] = useState(false)

    const [FixId, SetFixId] = useState(null)

    const fixPost = (id)=>{
        let i = 0
        while (id!=PolEvents[i][0]) {
        i+=1
        }
        SetInp({name: PolEvents[i][1], desc: PolEvents[i][2], img: PolEvents[i][3]})
        SetFixId(id)
        SetFixF(true)
    }

    const DoFix = async (e)=>{
        await axios.patch('http://backrestoraunt/events.php',JSON.stringify([FixId, Inp.name, Inp.desc, Inp.img]))
        window.location.reload();
    }

   
    return(
        <div className='polit'>
            <h1 className='important'>
                <div onClick={GoEvents}>АНОНСЫ И СОБЫТИЯ</div>
                <div>МЕНЮ</div>
            </h1>
            <div className='vnts' ref={events}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={6}>АНОНСЫ И СОБЫТИЯ</th>
                        </tr>
                        <tr>
                            <th>id</th>
                            <th>имя</th>
                            <th>описание</th>
                            <th>фото</th>
                            <th><img src={trash} alt="" width={30} /></th>
                            <th><img src={pencil} alt="" width={30}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {PolEvents.map(e=>
                            <tr>
                            {/* {e.map(ev=><td>{ev}</td>)} */}
                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                            <td for='length'>{e[2]}</td>
                            <td>
                                <img src={e[3]} width={300} alt="" />
                            </td>
                            <td><img src={close} className='cursor-p' alt=""  onClick={()=>dlt(e[0])} /></td>
                            <td onClick={()=>fixPost(e[0])}><u><i>Изменить</i></u></td>
                            </tr>
                        )}
                        <tr>
                            <td>№</td>
                            <td><textarea placeholder='имя' type="text" onChange={e=> SetInp({...Inp, name: e.target.value})}/></td>
                            <td><textarea placeholder='описание' type="text" onChange={e=> SetInp({...Inp, desc: e.target.value})}/></td>
                            <td><textarea placeholder='фото (url)' type="text" onChange={e=> SetInp({...Inp, img: e.target.value})}/></td>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                        <th colSpan={6}><button className='cursor-p' onClick={creatTd}>Создать...</button></th>
                        </tr></tbody>
                </table>
                {fixF ? 
                <div onClick={()=>SetFixF(false)} className='BackfixPanel'>
                    <div onClick={(e)=>e.stopPropagation()} className='fixPanel'>
                        <table>
                            <thead>
                                <th>id</th>
                                <th>имя</th>
                                <th>описание</th>
                                <th>фото</th>
                            </thead>
                            <tbody>
                                <td>{FixId}</td>
                                <td>
                                    <textarea placeholder='имя' value={Inp.name} type="text" onChange={e=> SetInp({...Inp, name: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='описание' value={Inp.desc} type="text" onChange={e=> SetInp({...Inp, desc: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='фото' value={Inp.img} type="text" onChange={e=> SetInp({...Inp, img: e.target.value})}/>
                                </td>
                            </tbody>
                        </table>
                        <div className='cursor-p' onClick={DoFix}>Изменить</div>
                    </div>
                </div>
                :
                <div></div>}
            </div>
        </div>
    );
};

export default Polit