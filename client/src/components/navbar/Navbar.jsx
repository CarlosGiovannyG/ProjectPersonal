import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import links from '../../helpers/Navigation';

import styles from './navbar.module.css';

const Navbar = ({ isScrolling }) => {
const [openMenu, setOpenMenu] = useState(true);

  const toTheTop = () => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }

  const mediaMenu = () => {
    setOpenMenu(!openMenu);
  }
  
  return (
    <div className={`${styles.header} ${isScrolling > 20 ? styles.headerScrolling : null}`}>
      <nav onClick={toTheTop} className={styles.nav}>
        <div className={`${styles.logo} ${isScrolling > 20 ?
          styles.logoScrolling : null}`}>Carlos Giovanny</div>
        <button onClick={mediaMenu} arial-label={`${openMenu ? "Cerrar menu" : "Abrir menu"}`}
          className={`${styles.btnMenu} ${isScrolling > 20 ?
          styles.btnMenuScrolling : null}`}><span>&#9776;</span> </button>
        <ul className={`${styles.navMenu} ${openMenu ? styles.navMenuVisible : null}`}>
          {
            links.notLogin.map((l, i) => (
              <NavLink
                to={l.path}
                key={i}
                className={(navData) => navData.isActive ?
                  `${styles.active} ${isScrolling > 20 ? styles.activeScrolling : null}` :
                  styles.navLink}>
                <div>
                  <li className={`${styles.navMenuItem} ${isScrolling > 20 ?
                    styles.navMenuItemScrolling : null}`} >
                    {l.title}
                  </li>
                </div>
              </NavLink>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
