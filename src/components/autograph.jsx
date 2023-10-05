import React, { useEffect, useRef, useState } from 'react';
import '../CSS/autograph.css';

const Autograph = () => {
    
const containerRef = useRef(null)
const [ isVisible, setIsVisible ] = useState(false)

// const callbackFunction = 
    
// }

// const options = {
//     rootMargin: "150px",
//     threshold:1.0
// }

useEffect(() => {

    const observer = new IntersectionObserver(
        (entries) => 
            {
                const [ entry ] = entries
                setIsVisible(entry.isIntersecting)
            }, {
                rootMargin: "150px",
                threshold:1.0
            })

    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
    if(containerRef.current) observer.unobserve(containerRef.current)
    }
}, [])

    return(
        <div className='autograph'>
            <a href='' ref={containerRef} className={`anim-auto ${isVisible?'ggap':''}`}>
                <div className={isVisible?'xonb':''}>XOnBeats </div>
                <div className={isVisible?'studio':''}>Studio</div>
            </a>
        </div>
    );
};

export default Autograph