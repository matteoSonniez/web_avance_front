import { useRouter } from "next/router";
import styles from "./index.module.scss";
import React from 'react';
import User from '../../img/user.png';
import Programme from '../../img/file.png';
import Discover from '../../img/compass.png';
import Home from './img/home.png';
import Close from '../../img/close.png';
import Deconnexion from '../../img/deconnexion.png';
import Search from '../../img/chercher.png';
import Send from '../../img/send.png';
import { useState, useEffect, useContext } from "react";


const Index = ({classname}) => {

  const [fullSidebar, setFullSidebar] = useState(true);
  const [sideBarClass, setSideBarClass] = useState(classname);
  const router = useRouter();

  
  const changeSideBar = (e) => {
    router.push('/')
    if(fullSidebar == true){
      setSideBarClass("allHeaderClose");
    }
    setTimeout(() => {
      setFullSidebar(false);
    }, "1000");
    
  }
  const hoverSideBar = (e) => {
    if(fullSidebar == false){
      setSideBarClass("allHeader");
    }
    setFullSidebar(true);
  }

  return (
    <div className={`${styles[sideBarClass]}`} onMouseOver={hoverSideBar}>
      {sideBarClass == classname ?  
        <button className={styles.btn} onClick={changeSideBar}>
          <img className={styles.iconBlanc} src={Home.src}></img>
          Accueil
        </button>
        : 
        <button className={styles.btn} onClick={changeSideBar}>
          <img className={styles.iconBlanc} src={Home.src}></img>
        </button>
        }
        {sideBarClass == classname ?  
        <button className={styles.btn} onClick={changeSideBar}>
         <img className={styles.iconBlanc} src={User.src}></img>
          profile
        </button>
        : 
        <button className={styles.btn} onClick={changeSideBar}>
          <img className={styles.iconBlanc} src={User.src}></img>
        </button>
        }
        {sideBarClass == classname ?  
        <button className={styles.btn} onClick={changeSideBar}>
          <img className={styles.iconBlanc} src={Search.src}></img>
          Test
        </button>
        : 
        <button className={styles.btn} onClick={changeSideBar}>
          <img className={styles.iconBlanc} src={Search.src}></img>
        </button>
        }
    </div>
    );
}


export default Index;