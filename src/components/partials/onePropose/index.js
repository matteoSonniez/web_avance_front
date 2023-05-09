import React from 'react';
import styles from "./index.module.scss";
import Deroulant from '@/img/fleche_droite.png';
import Button from '@/components/UI/Button';
import { useContext, useEffect, useState } from "react";
import Link from 'next/link';


const Index = ({proposition, handelClickDecline, handelClickAccepte}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [flecheDirection, setFlecheDirection] = useState("fleche_close");

    const open = (e) => {
        setFlecheDirection(flecheDirection === "fleche_close" ? "fleche_open" : "fleche_close");
        setIsOpen(!isOpen);
    }

    return (
        <div className={`${styles.one_propose} ${isOpen ? styles.one_propose__open : styles.one_propose__close}`}>
            <div className={styles.content}>
                <img className={styles[flecheDirection]} src={Deroulant.src} onClick={open} alt="deroulant" />
                <div className={styles.info}>
                    <div className={styles.names}>
                        <text>{proposition.mission.title}</text>
                    </div>
                    <div className={styles.dates}>
                        <text>{proposition.mission.dateStart} - {proposition.mission.dateEnd}</text>
                    </div>
                    {proposition.status == "PENDING" &&
                        <div className={styles.buttons} >
                            <Link onClick={()=> handelClickDecline(proposition._id)} className={styles.link_refused} href={"#"}>décliner</Link>
                            <Button
                            handleClick={()=> handelClickAccepte(proposition._id)}
                            type="submit"
                            title="Accepter"
                            className="btn__primary"
                            />
                        </div> 
                    }
                </div>
            </div>
            {isOpen &&
                <div className={styles.other_info}>
                    <text className={styles.company}>{proposition.mission.company.name}</text>
                    <text>{proposition.mission.description}</text>
                    <div className={styles.all_amount}>
                        <text>montant: </text>
                        <div className={styles.amount}>
                            <text>{proposition.mission.amount} €</text>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Index;