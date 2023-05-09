import React from 'react';
import styles from "./index.module.scss";
import Button from '@/components/UI/Button';
import Loca from '../../../img/localisateur.png';
import UserContext from "@/context/UserContext";
import Deroulant from '../../../img/fleche_droite.png';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";


const Index = ({freelance}) => {

    const router = useRouter();
    const { user, isLogged, logout } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [flecheDirection, setFlecheDirection] = useState("fleche_close");

    const open = (e) => {
        setFlecheDirection(flecheDirection === "fleche_close" ? "fleche_open" : "fleche_close");
        setIsOpen(!isOpen);
    }

    return (
        <div className={`${styles.one_freelance} ${isOpen ? styles.one_freelance__open : styles.one_freelance__close}`}>
            <div className={styles.content}>
                <img className={styles[flecheDirection]} src={Deroulant.src} onClick={open} alt="deroulant" />
                <div className={styles.info} >
                    <div className={styles.names}>
                        <text>{freelance.user.firstName} {freelance.user.lastName}</text>
                    </div>
                    {freelance.activity != null &&
                     <div className={styles.job}>
                        <text>{freelance.activity.name}</text>
                    </div>
                    }               
                    <div className={styles.address}>
                        <img className={styles.loca} src={Loca.src} alt="localisateur" />
                        <text>{freelance.user.address.street} {freelance.user.address.city} {freelance.user.address.zipCode}</text>
                    </div>
                </div>
            </div>
            {isOpen &&
                <div className={styles.other_info}>
                    <div className={styles.skills}>
                            {freelance.skills.map((skill) => (
                                <div className={styles.one_skill}>
                                    <text >{skill.name}</text>
                                </div>  
                            ))}
                    </div>
                    <div className={styles.rate_xp}>
                        <text className={styles.txt}>Taux journalier: {freelance.rate} €</text>
                        <text className={styles.txt}>Années d'expérience: {freelance.yearOfExperience} ans</text>
                    </div>
                    {user.userType == "COMPANY" &&
                        <div className={styles.btn}>
                            <Button
                            handleClick={()=> router.push({
                                pathname: '/mon-espace-company',
                                query: { freelanceId: freelance._id}
                            }) }
                            type="submit"
                            title="Proposer une mission"
                            className="btn__primary"/>
                        </div> 
                    }
                    
                </div>
            }
        </div>
    );
}

export default Index;