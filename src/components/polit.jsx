import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import trash from '../imagin/cil-trash.svg';
import close from "../imagin/cil-x-circle.svg";
import RedClose from "../imagin/cil-x-circle-red.svg";
import pencil from '../imagin/cil-pencil.svg';

const Polit = () => {

    const [Inp, SetInp] = useState({name: '', desc: '', weight: '', price: '', img: '', date: '', time: '', num:'', type: ''})

    const [ArrUseful, SetArrUseful] = useState([])
    const [ArrEvents, SetArrEvents] = useState([])
    const [ArrSpecial, SetArrSpecial] = useState([])
    const [ArrKitchen, SetArrKitchen] = useState([false])


    const [fixFE, SetFixFE] = useState(false)
    const [fixFU, SetFixFU] = useState(false)
    const [fixFM, SetFixFM] = useState(false)
    const [fixFS, SetFixFS] = useState(false)


    const [FixId, SetFixId] = useState(null)

    const events = useRef(null);
    const menu = useRef(null);
    const special = useRef(null)


    const Go = (type)=>type.current?.scrollIntoView({behavior: 'smooth'});



    

    useEffect(function GetPosts() {
        axios.get('https://back-restoraunt.vercel.app/api?for=event')
        .then(rsp=>SetArrEvents(rsp.data))
        axios.get('https://back-restoraunt.vercel.app/api?for=useful')
        .then(rsp=> SetArrUseful(rsp.data))
        axios.get('https://back-restoraunt.vercel.app/api?for=special')
        .then(rsp=> SetArrSpecial(rsp.data))

    }, [])


    const getKitchen = async (e)=>{
        await axios.get('https://back-restoraunt.vercel.app/api?for=kitchen&type='+e)
        .then(rsp=> SetArrKitchen(rsp.data))
        console.log(ArrKitchen)
}



    const dlt = async (e, type) =>{
        await axios.delete('https://back-restoraunt.vercel.app/api?for='+type,{ data: e })
        window.location.reload();
    }


    const Operatation = (r, f)=>{
            if (!Boolean(r)) {
                if (!f) {
                    window.location.reload()
                }
                SetInp({name: '', desc: '', weight: '', price: ''})
            }else{
                SeTGg(true)
            }
        }




        const [backColor, SetbackColor] = useState('inherit')


    const creatEvent = async (type, f)=>{
        switch (type) {
            case 'event':
                await axios.post('https://back-restoraunt.vercel.app/api?for='+type,JSON.stringify([Inp.name, Inp.desc, Inp.img]))
                .then(r=>Operatation(r.data, f))
                
                break;
            case 'useful':
                await axios.post('https://back-restoraunt.vercel.app/api?for='+type,JSON.stringify([Inp.name, Inp.date, Inp.desc, Inp.time, Inp.num]))
                .then(r=>Operatation(r.data, f))
                break;
            case 'kitchen':
                if (Inp.type) {
                    await axios.post('https://back-restoraunt.vercel.app/api?for='+type,JSON.stringify([Inp.type, Inp.name,  Inp.desc, Inp.weight, Inp.price]))
                .then(r=>Operatation(r.data, f))
                }else{
                    SetbackColor('red')
                }
                break;
            case 'special':
                await axios.post('https://back-restoraunt.vercel.app/api?for='+type,JSON.stringify([Inp.desc, Inp.img, Inp.price, Inp.weight]))
                .then(r=>Operatation(r.data, f))
                break;
            default:
                console.log('тип '+type+' не найден');
                break;
        }
    }


    const fixPost = (id, type)=>{
        let i = 0
        switch (type) {
            case 'U':
                while (id!==ArrUseful[i][0]) {
                i+=1
                }
                SetInp({name: ArrUseful[i][1], date: ArrUseful[i][2], desc: ArrUseful[i][3], time: ArrUseful[i][4], num: ArrUseful[i][5]})
                SetFixId(id)
                SetFixFU(true)
                break;
            case 'E':
                while (id!==ArrEvents[i][0]) {
                i+=1
                }
                SetInp({name: ArrEvents[i][1], desc: ArrEvents[i][2], img: ArrEvents[i][3]})
                SetFixId(id)
                SetFixFE(true)
                break;
            case 'M':
                let j = 0
                for (let i = 0; i < ArrKitchen.length || id===ArrKitchen[i][j][0]; i++) {
                    // for (let j = 0; j < ArrKitchen[i].length; j++) {
                    //     if (id===ArrKitchen[i][j][0]) {
                    //         SetInp({name: ArrKitchen[i][j][2], desc: ArrKitchen[i][j][3], weight: ArrKitchen[i][j][4], price: ArrKitchen[i][j][5]})
                    //     }
                    // }
                        while (j<ArrKitchen[i].length || id===ArrKitchen[i][j][0]) {
                            j++
                        }
                }
                console.log(ArrKitchen[i][j][0], id);
                SetFixId(id)
                SetFixFM(true)
                break;
        
            case 'S':
                while (id!==ArrSpecial[i][0]) {
                    i+=1
                    }
                    SetInp({desc: ArrSpecial[i][1], img: ArrSpecial[i][2], price: ArrSpecial[i][3], weight: ArrSpecial[i][4]})
                    SetFixId(id)
                    SetFixFS(true)
                break;
            default:

                break;
        }
    }



    const DoFix = async (type)=>{
        switch (type) {
            case 'useful':
                await axios.patch('https://back-restoraunt.vercel.app/api?for='+type,JSON.stringify([FixId, Inp.name, Inp.date, Inp.desc, Inp.time, Inp.num]))
                window.location.reload()
                break;
            case 'event':
                await axios.patch('https://back-restoraunt.vercel.app/api?for='+type,JSON.stringify([FixId, Inp.name, Inp.desc, Inp.img]))
                window.location.reload()
                break;
            case 'kitchen':
            if (Inp.type) {
                await axios.patch('https://back-restoraunt.vercel.app/api?for='+type,JSON.stringify([FixId, Inp.name, Inp.desc, Inp.weight, Inp.price, Inp.type]))
                window.location.reload()
            }else{
                SetbackColor('red')
            }
                break;
            case 'special':
                await axios.patch('https://back-restoraunt.vercel.app/api?for='+type,JSON.stringify([FixId, Inp.desc, Inp.img, Inp.price, Inp.weight]))
                window.location.reload()
                break;
            default:
                console.log('тип'+type+'не найден');
                break;
        }
        
    }


    const [gg, SeTGg] = useState(false)

    return(
        <div className='polit'>
            <h1 className='important'>
                <div onClick={()=>Go(events)}>АНОНСЫ И СОБЫТИЯ</div>
                <div onClick={()=>Go(menu)}>МЕНЮ</div>
                <div onClick={()=>Go(special)}>СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</div>
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
                            <td className='cursor-p' onClick={()=>fixPost(e[0], 'U')}><u><i>Изменить</i></u></td>
                            </tr>
                        )}
                        <tr>
                            <td>№</td>
                            <td><textarea placeholder='имя' onChange={e=> SetInp({...Inp, name: e.target.value})}/></td>
                            <td><textarea placeholder='дата' onChange={e=> SetInp({...Inp, date: e.target.value})}/></td>
                            <td><textarea placeholder='описание' onChange={e=> SetInp({...Inp, desc: e.target.value})}/></td>
                            <td><textarea placeholder='время' onChange={e=> SetInp({...Inp, time: e.target.value})}/></td>
                            <td><textarea placeholder='телефон' onChange={e=> SetInp({...Inp, num: e.target.value})}/></td>
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
                                    <textarea placeholder='имя' value={Inp.name} onChange={e=> SetInp({...Inp, name: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='дата' value={Inp.date} onChange={e=> SetInp({...Inp, date: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='описание' value={Inp.desc} onChange={e=> SetInp({...Inp, desc: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='время' value={Inp.time} onChange={e=> SetInp({...Inp, time: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='номер' value={Inp.num} onChange={e=> SetInp({...Inp, num: e.target.value})}/>
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
                            <td>{e[2]}</td>
                            <td>
                                <img src={e[3]} width={300} alt="Изображение ненайдено" />
                            </td>
                            <td onClick={()=>dlt(e[0], 'event')}><img src={close} className='cursor-p' alt="Картинка"   /></td>
                            <td className='cursor-p' onClick={()=>fixPost(e[0], 'E')}><u><i>Изменить</i></u></td>
                            </tr>
                        )}
                        <tr>
                            <td>№</td>
                            <td><textarea placeholder='имя' onChange={e=> SetInp({...Inp, name: e.target.value})}/></td>
                            <td><textarea placeholder='описание' onChange={e=> SetInp({...Inp, desc: e.target.value})}/></td>
                            <td><textarea placeholder='фото (url)' onChange={e=> SetInp({...Inp, img: e.target.value})}/></td>
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
                                    <textarea placeholder='имя' value={Inp.name} onChange={e=> SetInp({...Inp, name: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='описание' value={Inp.desc} onChange={e=> SetInp({...Inp, desc: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='фото' value={Inp.img} onChange={e=> SetInp({...Inp, img: e.target.value})}/>
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
            <div className='tbl' ref={menu}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>МЕНЮ</th>
                        </tr>
                        <tr>
                            <th>Кухня</th>
                            <th>Банкетное меню</th>
                            <th>Бар</th>
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
                            <th>id</th>
                            <th>Имя</th>
                            <th>Описание</th>
                            <th>Вес</th>
                            <th>Цена</th>
                            <th><img src={trash} alt="Закрыть" width={30} /></th>
                            <th><img src={pencil} alt="Удалить" width={30}/></th>
                    </thead>
                    {ArrKitchen.map(e=>
                        <tbody>
                            <tr><th style={{backgroundColor: 'rgba(0,0,0,0.3)'}} align='center' colSpan={7}>{e[0][1]}</th></tr>
                        {e.map(ev=>
                                    <tr>
                                        {ev.filter((e,i)=>i!==1).map(eve=>
                                        <td>
                                            {eve}
                                        </td>
                                        )}
                                        <td onClick={()=>dlt(ev[0], 'kitchen')}><img src={close} className='cursor-p' alt="Картинка"   /></td>
                                        <td className='cursor-p' onClick={()=>fixPost(ev[0], 'M')}><u><i>Изменить</i></u></td>
                                    </tr>
                        )}
                        </tbody>
                    )}
                    <tr style={{backgroundColor: 'rgba(0,0,0,0.3)'}}><td colSpan={7}></td></tr>
                    <tr><td style={{textAlign: 'center'}} colSpan={7}>
                        <select style={{fontSize: '1.1em', backgroundColor: backColor}} onChange={e => SetInp({...Inp, type: e.target.value})}>
                            <option disabled value='' selected="selected">Выберите тип</option>
                            {ArrKitchen.map(e=>
                                <option value={e[0][1]}>{e[0][1]}</option>)}
                        </select>
                        </td>
                    </tr>
                    <tr>
                            <td>№</td>
                            <td>
                                <textarea placeholder='имя' value={Inp.name} onChange={e=> SetInp({...Inp, name: e.target.value})}/>
                            </td>
                            <td>
                                <textarea placeholder='описание' value={Inp.desc} onChange={e=> SetInp({...Inp, desc: e.target.value})}/>
                            </td>
                            <td>
                                <textarea placeholder='вес' value={Inp.weight} onChange={e=> SetInp({...Inp, weight: e.target.value})}/>
                            </td>
                            <td>
                                <textarea placeholder='цена' value={Inp.price} onChange={e=> SetInp({...Inp, price: e.target.value})}/>
                            </td>
                            <td colSpan={2}></td>
                        </tr>
                    <tr> <th colSpan={7}><button className='cursor-p' onClick={()=>creatEvent('kitchen', true)}><b>Создать...</b></button></th></tr>
                    <tr> <th colSpan={7}><button className='cursor-p' onClick={()=>window.location.reload()}><b>ОБНОВИТЬ</b></button></th></tr>
                </table>
                :<div></div>}
                {fixFM ? 
                <div onClick={()=>SetFixFM(false)} className='BackfixPanel'>
                    <div onClick={(e)=>e.stopPropagation()} className='fixPanel'>
                        <table>
                            <thead>
                                <th>id</th>
                                <th>Тип</th>
                                <th>Имя</th>
                                <th>Описание</th>
                                <th>Вес</th>
                                <th>Цена</th>
                            </thead>
                            <tbody>
                                <td>{FixId}</td>

                                <select style={{fontSize: '1.1em', backgroundColor: backColor}} onChange={e => SetInp({...Inp, type: e.target.value})}>
                                    <option disabled selected="selected">Выберите тип</option>
                                    {ArrKitchen.map(e=>
                                    <option value={e[0][1]}>{e[0][1]}</option>)}
                                </select>
                                <td>
                                    <textarea placeholder='имя' value={Inp.name} onChange={e=> SetInp({...Inp, name: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='описание' value={Inp.desc} onChange={e=> SetInp({...Inp, desc: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='вес' value={Inp.weight} onChange={e=> SetInp({...Inp, weight: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='цена' value={Inp.price} onChange={e=> SetInp({...Inp, price: e.target.value})}/>
                                </td>
                                <tr> <th colSpan={5} className='cursor-p' onClick={()=>DoFix('kitchen')}>Изменить</th></tr>
                                <tr> <th colSpan={5} className='cursor-p' onClick={()=>SetFixFM(false)}>Назад</th></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div></div>}
            </div>

            {/* -------------------SPECIAL------------------------ */}
            <div className='tbl' ref={special}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={7} >СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</th>
                        </tr>
                        <tr>
                            <th>id</th>
                            <th>описание</th>
                            <th>фото</th>
                            <th>цена</th>
                            <th>вес</th>
                            <th><img src={trash} alt="Закрыть" width={30} /></th>
                            <th><img src={pencil} alt="Удалить" width={30}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ArrSpecial.map(e=>
                            <tr>
                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                            <td>
                                <img src={e[2]} width={300} alt="Не найдено" />
                            </td>
                            <td>{e[3]}</td>
                            <td>{e[4]}</td>
                            <td onClick={()=>dlt(e[0], 'special')}><img src={close} className='cursor-p' alt="Удалить"   /></td>
                            <td className='cursor-p' onClick={()=>fixPost(e[0], 'S')}><u><i>Изменить</i></u></td>
                            </tr>
                        )}
                        <tr>
                            <td>№</td>
                            <td><textarea placeholder='описание' onChange={e=> SetInp({...Inp, desc: e.target.value})}/></td>
                            <td><textarea placeholder='фото' onChange={e=> SetInp({...Inp, img: e.target.value})}/></td>
                            <td><textarea placeholder='цена' onChange={e=> SetInp({...Inp, price: e.target.value})}/></td>
                            <td><textarea placeholder='вес' onChange={e=> SetInp({...Inp, weight: e.target.value})}/></td>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                        <th colSpan={8}><button className='cursor-p' onClick={()=>creatEvent('special')}>Создать...</button></th>
                        </tr></tbody>
                </table>
                {fixFS ? 
                <div onClick={()=>SetFixFS(false)} className='BackfixPanel'>
                    <div onClick={(e)=>e.stopPropagation()} className='fixPanel'>
                        <table>
                            <thead>
                                <th>id</th>
                                <th>описание</th>
                                <th>фото</th>
                                <th>цена</th>
                                <th>вес</th>
                            </thead>
                            <tbody>
                                <td>{FixId}</td>
                                <td>
                                    <textarea placeholder='описание' value={Inp.desc} onChange={e=> SetInp({...Inp, desc: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='фото' value={Inp.img} onChange={e=> SetInp({...Inp, img: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='цена' value={Inp.price} onChange={e=> SetInp({...Inp, price: e.target.value})}/>
                                </td>
                                <td>
                                    <textarea placeholder='вес' value={Inp.weight} onChange={e=> SetInp({...Inp, weight: e.target.value})}/>
                                </td>
                                <tr> <th colSpan={6} className='cursor-p' onClick={()=>DoFix('special')}>Изменить</th></tr>
                                <tr> <th colSpan={6} className='cursor-p' onClick={()=>SetFixFS(false)}>Назад</th></tr>
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