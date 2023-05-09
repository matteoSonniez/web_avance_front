import React from 'react';
import Image from "../../../img/back_login.jpg";
import Image2 from "../../../img/back_login2.jpg";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import Back1 from '../../../img/test.png';
import Back2 from '../../../img/background2.png';


const Index = ({ children }) => {
  const router = useRouter();
  const [authClass, setAuthClass] = useState("theForm");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    if (isLogin == true) {
      setIsLogin(false);
      router.push('/auth/register')
    }
    if (isLogin == false) {
      setIsLogin(true);
      router.push('/auth/login')
    }  
  };

  if (router.asPath.startsWith("/auth/register") && authClass == "theForm" ) {
    setAuthClass("theForm2");
  }
  if (router.asPath.startsWith("/auth/login") && authClass == "theForm2" ) {
    setAuthClass("theForm");
  }
  return (
    <div className={styles.allPage}>
      <img src={Back1.src} className={styles.back_image_left} alt="Nom de l'image"></img>
      <img src={Back2.src} className={styles.back_image_right} alt="Nom de l'image"></img>
      <div className={styles.theForm}>
        <div className={styles[`${isLogin ? "test1" : "test1_2"}`]}>
          {children}
          { isLogin ?
            <p>
              Vous n'avez pas de compte ? <Link className={styles.link} href="/auth/register" onClick={handleLogin}>Inscrivez-vous</Link>
            </p>:
            <p>
              Vous avez déja un compte ? <Link className={styles.link} href="/auth/login" onClick={handleLogin}>Connectez-vous</Link>
            </p>
          }
        </div>
        <div className={styles[`${isLogin ? "test2" : "test2_2"}`]}>
          
          <div className={styles.text_over}>
            <text className={styles.title}>Welcome to website</text>
            <text className={styles.sous_title}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam.
            </text>
          </div>
        </div>
      </div>
    </div>
  );
}
/*<div className={styles.allPage}>
        <div className={styles[authClass]}>
              <div className={styles.left__part}>
                {children}
              </div>
              <div className={styles.right__part}>
                <img src={Image.src} alt="auth" />
              </div>
            </div>
    </div> */
export default Index;
