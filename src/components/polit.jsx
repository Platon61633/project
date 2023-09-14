import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import trash from '../imagin/cil-trash.svg';
import close from "../imagin/cil-x-circle.svg";
import RedClose from "../imagin/cil-x-circle-red.svg";
import pencil from '../imagin/cil-pencil.svg';

const Polit = () => {

    const [Inp, SetInp] = useState({name: '', desc: '', img: '', date: '', time: '', num:''})

    const [ArrUseful, SetArrUseful] = useState([])
    const [ArrEvents, SetArrEvents] = useState([])
    const [ArrKitchen, SetArrKitchen] = useState([false])


    const [fixFE, SetFixFE] = useState(false)
    const [fixFU, SetFixFU] = useState(false)

    const [FixId, SetFixId] = useState(null)

    const events = useRef(null);
    const GoEvents = (e)=>{
        events.current?.scrollIntoView({behavior: 'smooth'});
    }

    

    useEffect(function GetPosts() {
        axios.get('http://backrestoraunt?for=event')
        .then(rsp=>SetArrEvents(rsp.data))
        axios.get('http://backrestoraunt?for=useful')
        .then(rsp=> SetArrUseful(rsp.data))
    }, [])


    const getKitchen = async (e)=>{
        await axios.get('http://backrestoraunt?for=kitchen&type='+e)
        .then(rsp=> SetArrKitchen(rsp.data))
        console.log(ArrKitchen)
}



    const dlt = async (e, type) =>{
        await axios.delete('http://backrestoraunt?for='+type,{ data: e })
        window.location.reload();
    }


    const Operatation = (r)=>{
            if (!Boolean(r)) {
                window.location.reload()
            }else{
                SeTGg(true)
            }
        }

    const creatEvent = async (type)=>{
        switch (type) {
            case 'event':
                await axios.post('http://backrestoraunt?for=event',JSON.stringify([Inp.name, Inp.desc, Inp.img]))
                .then(r=>Operatation(r.data))
                
                break;
            case 'useful':
                await axios.post('http://backrestoraunt?for=useful',JSON.stringify([Inp.name,  Inp.date, Inp.desc, Inp.time, Inp.num]))
                .then(r=>Operatation(r.data))
                break;
            default:
                console.log('тип '+type+' не найден');
                break;
        }
        // window.location.reload()
    }

    const fixPostE = (id)=>{
        let i = 0
        while (id!==ArrEvents[i][0]) {
        i+=1
        }
        SetInp({name: ArrEvents[i][1], desc: ArrEvents[i][2], img: ArrEvents[i][3]})
        SetFixId(id)
        SetFixFE(true)
    }

    const fixPostU = (id)=>{
        let i = 0
        while (id!==ArrUseful[i][0]) {
        i+=1
        }
        SetInp({name: ArrUseful[i][1], date: ArrUseful[i][2], desc: ArrUseful[i][3], time: ArrUseful[i][4], num: ArrUseful[i][5]})
        SetFixId(id)
        SetFixFU(true)
    }

    const DoFix = async (type)=>{
        switch (type) {
            case 'useful':
                await axios.patch('http://backrestoraunt?for=useful',JSON.stringify([FixId, Inp.name, Inp.date, Inp.desc, Inp.time, Inp.num]))
                break;
            case 'event':
                await axios.patch('http://backrestoraunt?for=event',JSON.stringify([FixId, Inp.name, Inp.desc, Inp.img]))
                break;
            default:
                console.log('тип'+type+'не найден');
                break;
        }
        window.location.reload()
    }


    const [gg, SeTGg] = useState(false)

    return(
        <div className='polit'>
            <h1 className='important'>
                <div onClick={GoEvents}>АНОНСЫ И СОБЫТИЯ</div>
                <div>МЕНЮ</div>
            </h1>
            {gg?
            <div className='panlOP' onClick={()=>SeTGg(false)}>
                <span onClick={(e)=>e.stopPropagation()}>Ошибка, попробуйте по другому</span>
                <img src={RedClose} alt="Закрыть" />
            </div>
            :<div></div>}


{/* ---------------------   USEFUL----------------------- */}
            <div className='tbl'>
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
                            <th><img src={trash} alt="Закрыть" width={30} /></th>
                            <th><img src={pencil} alt="Удалить" width={30}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ArrUseful.map(e=>
                            <tr>
                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                            <td for='length'>{e[2]}</td>
                            <td>{e[3]}</td>
                            <td>{e[4]}</td>
                            <td>{e[5]}</td>
                            <td onClick={()=>dlt(e[0], 'useful')}><img src={close} className='cursor-p' alt="Удалить"   /></td>
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
                        <th colSpan={8}><button className='cursor-p' onClick={()=>creatEvent('useful')}>Создать...</button></th>
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
                                <tr> <th colSpan={6} className='cursor-p' onClick={()=>DoFix('useful')}>Изменить</th></tr>
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
                            <th><img src={trash} alt="Закрыть" width={30} /></th>
                            <th><img src={pencil} alt="Удалить" width={30}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ArrEvents.map(e=>
                            <tr>
                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                            <td for='length'>{e[2]}</td>
                            <td>
                                <img src={e[3]} width={300} alt="Картинка" />
                            </td>
                            <td onClick={()=>dlt(e[0], 'event')}><img src={close} className='cursor-p' alt="Картинка"   /></td>
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
                        <th colSpan={6}><button className='cursor-p' onClick={()=>creatEvent('event')}>Создать...</button></th>
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
                                <tr> <th colSpan={4} className='cursor-p' onClick={()=>DoFix('event')}>Изменить</th></tr>
                                <tr> <th colSpan={4} className='cursor-p' onClick={()=>SetFixFE(false)}>Назад</th></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div></div>}
            </div>

            {/* -------------------MENU------------------------ */}
            <div className='tbl'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>МЕНЮ</th>
                        </tr>
                        <tr>
                            <th>кухня</th>
                            <th>завтраки</th>
                            <th>бар</th>
                        </tr>
                    </thead>
                        <tr>
                            <td className='cursor-p' onClick={()=>getKitchen('kitchen')}>Смотреть</td>
                            <td className='cursor-p' onClick={()=>getKitchen('breakfast')}>Смотреть</td>
                            <td className='cursor-p' onClick={()=>getKitchen('bar')}>Смотреть</td>
                        </tr>
                </table>
                {ArrKitchen[0]?
                <table style={{marginTop: '50px', width: '100%'}}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Имя</th>
                            <th>Описание</th>
                            <th>Вес</th>
                            <th>Цена</th>
                            <th><img src={trash} alt="Закрыть" width={30} /></th>
                            <th><img src={pencil} alt="Удалить" width={30}/></th>
                        </tr>
                    </thead>
                    {ArrKitchen.map(e=>
                        <tbody>
                            <tr><th style={{backgroundColor: 'rgba(0,0,0,0.3)'}} align='center' colSpan={7}>{e[0][1]}</th></tr>
                        {e.map(ev=>
                                    <tr>
                                        {ev.filter((e,i)=>i!=0).map(eve=>
                                        <td>
                                            {eve!==ev[1]
                                                ?<span>{eve}</span>
                                                :<span>{ev[0]}</span>}
                                        </td>
                                        )}
                                        <td onClick={()=>dlt(ev[0], 'kitchen')}><img src={close} className='cursor-p' alt="Картинка"   /></td>
                                        {/* <td className='cursor-p' onClick={()=>fixPostE(e[0])}><u><i>Изменить</i></u></td> */}
                                    </tr>
                        )}
                        </tbody>
                    )}
                </table>
                :<div></div>}
            </div>
        </div>
    );
};

export default Polit