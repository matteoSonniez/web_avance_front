import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import styles from "./index.module.scss";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Back1 from '../../../img/test.png';
import Back2 from '../../../img/background2.png';
import UserContext from "@/context/UserContext";
import Logo from '../../../img/logo.jpg';
import LittleLogo from '../../../img/little_logo.jpg';
import Home from '../../../img/home.png';
import Setting from '../../../img/parametres.png';
import Espace from '../../../img/espace.png';
import Deconnexion from '../../../img/exit.png';
import Menu from '../../../img/menu.png';
import Cookies from 'js-cookie';



const MainLayout = ({ children }) => {

  const [fullSidebar, setFullSidebar] = useState(false);
  const [sideBarClass, setSideBarClass] = useState("allHeaderClose");
  const [mainClass, setMainClass] = useState("right__part2");
  const router = useRouter();
  const { isLogged, user, updateUser } = useContext(UserContext);

  const logout = (e) => {
    Cookies.remove('token_cookie');
    router.push('/auth/login');
  }
  return (
    <div className={styles.wrapper}>
      <Header></Header>
      <img src={Back1.src} className={styles.back_image_left} alt="Nom de l'image"></img>
      <img src={Back2.src} className={styles.back_image_right} alt="Nom de l'image"></img>
      <div className={`${styles[mainClass]}`}>
        {children}
      </div>
    </div>
  );
}
/* */

export default MainLayout;