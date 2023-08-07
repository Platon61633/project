import React, { useRef, useState } from 'react';
import '../CSS/autograph.css'

const Autograph = () => {

    const studio = useRef()

    const [f , Setf] = useState(true);
    

    // const [red , Setred] = useState('red');
    // const [orange , Setorange] = useState('orange');
    // const [yellow , Setyellow] = useState('yellow');
    // const [green , Setgreen] = useState('green');
    // const [blue , Setblue] = useState('blue');
    // const [darkBlue , SetdarkBlue] = useState('dark-blue');
    // const [purple , Setpurple] = useState('purple');

    const rainbow = ['red', 'orange', 'yellow', 'gree', 'blue', 'dark-blue', 'purple']
    const [Colors , SetColors] = useState(rainbow);
    
    
    
    const out = (e) =>{
        Setf(false)
        SetColors(rainbow)
    }
    

    const go = (e) => {
        SetColors(blb)
    }


    return(
            <span href='' className='autograph'>
                <div className={Colors[0]}>
                    <div className={Colors[1]}>
                        <div className={Colors[2]}>
                            <div className={Colors[3]}>
                                <div className={Colors[4]}>
                                    <div className={Colors[5]}>
                                        <div className={Colors[6]}>
                                            <span id='studio' ref={studio} onMouseOver={go} onMouseOut={out}>XOnBeats Studio</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
    );
};

export default Autograph