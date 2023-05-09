import { useRouter } from "next/router";
import UserContext from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import styles from "./index.module.scss";
import SearchInputs from "@/components/Search";
import Icon1 from '../img/icon1.svg';
import Icon2 from '../img/icon2.svg';
import Icon3 from '../img/icon3.svg';
import AnimText from "@/components/AnimationText";


export default function Home() {
  const router = useRouter();
  const { user, isLogged, logout } = useContext(UserContext);
  console.log(user, "USER!!!!!!!!!!!")

  return (
    <div className={styles.center}>
      <div className={styles.all_home}>
        <div className={styles.title_div}>
            <h1 className={styles.title}><AnimText text="Freelances" className="patterns__one"></AnimText> <text>your</text> email game with an intuitive email builder.
            </h1>
            <div className={styles.sous_title}>
              <text>
                Create your email templates 20 faster, with no design limits and no coding skills. 
              </text>
            </div>
        </div>
        <SearchInputs className="search"></SearchInputs>
        <div className={styles.second_part}>
          
          <div className={styles.text_icon}> 
            <text className={styles.title}>Plus de 150k <AnimText text="utilisateurs" className="patterns__two"></AnimText>dans le monde entier</text>
            <div className={styles.sous_title}>
               <text>message de sous titre pour faire un exemple test</text>
            </div>
          </div>
          <div className={styles.all_icons}>
            <div className={styles.all_icons_size}>
              <div className={styles.one_icon}>
                <img className={styles.icon_image} src={Icon1.src}></img>
                <h1>10k accords passés</h1>
                <text>Suspendisse molestie at elit blandit convallis. Phasellus cursus risus et tortor gravida</text>
              </div>
              <div className={styles.one_icon}>
                <img className={styles.icon_image} src={Icon2.src}></img>
                <h1>150k freelances</h1>
                <text>Suspendisse molestie at elit blandit convallis. Phasellus cursus risus et tortor gravida</text>
              </div>
              <div className={styles.one_icon}>
                <img className={styles.icon_image} src={Icon3.src}></img>
                <h1>25k entreprises</h1>
                <text>Suspendisse molestie at elit blandit convallis. Phasellus cursus risus et tortor gravida</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
