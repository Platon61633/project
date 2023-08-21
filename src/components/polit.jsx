import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import trash from '../imagin/cil-trash.svg';
import close from "../imagin/cil-x-circle.svg";
import pencil from '../imagin/cil-pencil.svg'
import resto from '../imagin/resto.jpg'

const Polit = () => {


    const [Inp, SetInp] = useState({name: '', desc: '', img: '', date: '', time: '', num:''})
    const [Useful, SetUseful] = useState([])

    const [PolEvents, SetEvents] = useState([])
    const [fixFE, SetFixFE] = useState(false)
    const [fixFU, SetFixFU] = useState(false)

    const [FixId, SetFixId] = useState(null)

    const events = useRef(null);
    const GoEvents = (e)=>{
        events.current?.scrollIntoView({behavior: 'smooth'});
    }

    

    useEffect(function GetEvents() {
        axios.get('http://backrestoraunt?for=event')
        .then(resp=>SetEvents(resp.data))
    }, [])

    useEffect(function GetUseful() {
        axios.get('http://backrestoraunt?for=useful')
        .then(rsp=> SetUseful(rsp.data))
    }, [])


    const dltE = async (e) =>{
        await axios.delete('http://backrestoraunt?for=event',{ data: e })
        window.location.reload();
    }

    const dltU = async (e) =>{
        await axios.delete('http://backrestoraunt?for=useful',{ data: e })
        window.location.reload();
    }

    const creatEvent = async ()=>{
        await axios.post('http://backrestoraunt?for=event',JSON.stringify([Inp.name, Inp.desc, Inp.img]))
        window.location.reload();
    }
    const creatUseful = async ()=>{
        await axios.post('http://backrestoraunt?for=useful',JSON.stringify([Inp.name, Inp.desc, Inp.date, Inp.time, Inp.num]))
        // .then(r=>console.log(r.data))
        window.location.reload();
    }



    

    const fixPostE = (id)=>{
        let i = 0
        while (id!=PolEvents[i][0]) {
        i+=1
        }
        SetInp({name: PolEvents[i][1], desc: PolEvents[i][2], img: PolEvents[i][3]})
        SetFixId(id)
        SetFixFE(true)
    }

    const fixPostU = (id)=>{
        let i = 0
        while (id!=Useful[i][0]) {
        i+=1
        }
        SetInp({name: Useful[i][1], date: Useful[i][2], desc: Useful[i][3], time: Useful[i][4], num: Useful[i][5]})
        SetFixId(id)
        SetFixFU(true)
    }

    const DoFixE = async (e)=>{
        await axios.patch('http://backrestoraunt?for=event',JSON.stringify([FixId, Inp.name, Inp.desc, Inp.img]))
        window.location.reload();
    }

    const DoFixU = async (e)=>{
        await axios.patch('http://backrestoraunt?for=useful',JSON.stringify([FixId, Inp.name, Inp.date, Inp.desc, Inp.time, Inp.num]))
        window.location.reload();
    }


    return(
        <div className='polit'>
            <h1 className='important'>
                <div onClick={GoEvents}>АНОНСЫ И СОБЫТИЯ</div>
                <div>МЕНЮ</div>
            </h1>

{/* ---------------------   USEFUL----------------------- */}
            <div className='tbl' ref={events}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={8}>ПОЛЕЗНОЕ</th>
                        </tr>
                        <tr>
                            <th>id</th>
                            <th>имя</th>
                            <th>дата</th>
                            <th>описание</th>
                            <th>время</th>
                            <th>телефон</th>
                            <th><img src={trash} alt="" width={30} /></th>
                            <th><img src={pencil} alt="" width={30}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Useful.map(e=>
                            <tr>
                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                            <td for='length'>{e[2]}</td>
                            <td>{e[3]}</td>
                            <td>{e[4]}</td>
                            <td>+{e[5]}</td>
                            <td><img src={close} className='cursor-p' alt=""  onClick={()=>dltU(e[0])} /></td>
                            <td className='cursor-p' onClick={()=>fixPostU(e[0])}><u><i>Изменить</i></u></td>
                            </tr>
                        )}
                        <tr>
                            <td>№</td>
                            <td><textarea placeholder='имя' type="text" onChange={e=> SetInp({...Inp, name: e.target.value})}/></td>
                            <td><textarea placeholder='дата' type="text" onChange={e=> SetInp({...Inp, date: e.target.value})}/></td>
                            <td><textarea placeholder='описание' type="text" onChange={e=> SetInp({...Inp, desc: e.target.value})}/></td>
                            <td><textarea placeholder='время' type="text" onChange={e=> SetInp({...Inp, time: e.target.value})}/></td>
                            <td><textarea placeholder='телефон' type="text" onChange={e=> SetInp({...Inp, num: e.target.value})}/></td>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                        <th colSpan={8}><button className='cursor-p' onClick={creatUseful}>Создать...</button></th>
                        </tr></tbody>
                </table>
                {fixFU ? 
                <div onClick={()=>SetFixFU(false)} className='BackfixPanel'>
                    <div onClick={(e)=>e.stopPropagation()} className='fixPanel'>
                        <table>
                            <thead>
                                <th>id</th>
                                <th>имя</th>
                                <th>дата</th>
                                <th>описание</th>
                                <th>время</th>
                                <th>номер</th>
                            </thead>
                            <tbody>
                                <td>{FixId}</td>
                                <td>
                                    <textarea placeholder='имя' value={Inp.name} type="text" onChange={e=> SetInp({...Inp, name: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='дата' value={Inp.date} type="text" onChange={e=> SetInp({...Inp, date: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='описание' value={Inp.desc} type="text" onChange={e=> SetInp({...Inp, desc: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='время' value={Inp.time} type="text" onChange={e=> SetInp({...Inp, time: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='номер' value={Inp.num} type="text" onChange={e=> SetInp({...Inp, num: e.target.value})}/>
                                </td>
                                <tr> <th colSpan={6} className='cursor-p' onClick={DoFixU}>Изменить</th></tr>
                                <tr> <th colSpan={6} className='cursor-p' onClick={()=>SetFixFU(false)}>Назад</th></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div></div>}
            </div>

{/* ------------------------events------------------------------------- */}

            <div className='tbl' ref={events}>
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
                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                            <td for='length'>{e[2]}</td>
                            <td>
                                <img src={e[3]} width={300} alt="" />
                            </td>
                            <td><img src={close} className='cursor-p' alt=""  onClick={()=>dltE(e[0])} /></td>
                            <td className='cursor-p' onClick={()=>fixPostE(e[0])}><u><i>Изменить</i></u></td>
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
                        <th colSpan={6}><button className='cursor-p' onClick={creatEvent}>Создать...</button></th>
                        </tr></tbody>
                </table>
                {fixFE ? 
                <div onClick={()=>SetFixFE(false)} className='BackfixPanel'>
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
                                <tr> <th colSpan={4} className='cursor-p' onClick={DoFixE}>Изменить</th></tr>
                                <tr> <th colSpan={4} className='cursor-p' onClick={()=>SetFixFE(false)}>Назад</th></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div></div>}
            </div>
        </div>
    );
};

export default Polit