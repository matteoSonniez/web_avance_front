import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import UserContext from "@/context/UserContext";
import Button from "@/components/UI/Button";
import React from 'react';
import styles from "./index.module.scss";

const Index = () => {
  const router = useRouter();
  const { user, isLogged, logout } = useContext(UserContext);
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <text className={styles.logo}>DevFinder</text>
        <Link href="/" className={styles.the_link}>accueil</Link>
        {user.userType == "COMPANY" ? 
          <Link href="/mon-espace-company" className={styles.the_link}>mon espace</Link>
        :
          <Link href="/mon-espace" className={styles.the_link}>mon espace</Link>
        }
      </div>
      {user.isAdmin == true &&
        <Link href="/admin" className={styles.the_link}>admin</Link>
      }
      <div className={styles.header__right}>
        <Link href="/auth/login" onClick={logout} className={styles.header__link}>Déconnexion</Link>
        <Button
            type="submit"
            title="Profile"
            className="btn__primary"
            handleClick={() => router.push('/profile')}              
        />
      </div>
    </div>
  );
}

export default Index;
