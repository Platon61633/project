import React, { useEffect, useState } from 'react';
import img from '../imagin/corporativ.jpg';
import '../CSS/menu.css';

const Menu = () => {

    const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


    return(
        <div className='menu'>
            <div className='tet'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed fugit sapiente tenetur? Obcaecati, corporis voluptas quo odio ut quasi maiores nam consectetur. Nisi, enim dolore aut temporibus facilis voluptatibus harum?
      At quibusdam, dicta commodi dolor animi maxime blanditiis nihil in, aut similique impedit voluptatum quos voluptatibus et! Dolore quibusdam consequatur, repellendus amet corrupti consequuntur commodi velit ipsa optio obcaecati sit?
      Placeat non impedit magni repellendus, aliquam officiis. Aut sed iure reiciendis exercitationem, distinctio, quasi laborum iste voluptas enim illum tempora molestias dolorum! Itaque non quis nihil et dolorem dolorum nobis!
      Magnam soluta sapiente, iusto accusantium maiores, fugiat, laborum quaerat nesciunt nam quo tenetur. Ea voluptate officia debitis tempore nostrum sed sint, animi culpa facere consequatur beatae magni tenetur quisquam in.
      Animi incidunt, unde excepturi deleniti iure, aspernatur veniam veritatis cum hic ad fugit consectetur repellat amet nesciunt rerum adipisci perferendis, quis cupiditate magni aut nisi vitae dignissimos commodi natus! Temporibus.
      Dolor aliquam tempore voluptatum in fugiat rem magni, distinctio recusandae quasi. Dolorem quo similique dicta, illum fuga quod maxime, ipsam velit odio itaque magnam commodi fugiat, quam molestiae rerum laudantium.
      Consequatur fuga consectetur, beatae repellendus magnam amet velit officia dolorum nobis. Perspiciatis laborum explicabo aspernatur totam aliquam nobis corrupti ipsa culpa adipisci? Illum, sit voluptates est corporis facere quae id?
      </div>
      <div className='ramka'>
        <img src={img} alt="" style={{ transform: `translateY(${offsetY * 0.1}px)`}}/>
      {/* <div
        className="background"
        style={{ transform: `translateY(${offsetY * 0.1}px)` }}
      /> */}
        </div>
        </div>
    );
};

export default Menu