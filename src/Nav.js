import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {
    const [show , handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener(
            "scroll" , () => {
                if(window.scrollY > 100) {
                    handleShow(true)
                }else handleShow(false)
            }
        );
        return () => {
            window.removeEventListener("scroll" , null);
        };
    }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img 
           className='nav__logo'
           src='http://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
           alt='Nexflix Logo'
        />

<img 
           className='nav__avatar'
           src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
           alt='Nexflix avatar'
        />
    </div>
  )
}

export default Nav