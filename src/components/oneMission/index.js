import React from 'react';
import styles from "./index.module.scss";
import Deroulant from '../../img/fleche_droite.png';
import Button from '@/components/Button';
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
//import Link from 'next/link';


const Index = ({mission, handelClickDecline, handelClickAccepte, freelanceId}) => {

    const [token, setToken] = useState(Cookies.get('token_cookie'));
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [flecheDirection, setFlecheDirection] = useState("fleche_close");

    const {data: propose, error:proposeError, loading:loadingPropose, fetchData:fetchPropose} = useFetch({url:`proposition/create/${mission._id}`, method:"POST", body:{"freelance": `${freelanceId}`}, token:token})

    const open = (e) => {
        setFlecheDirection(flecheDirection === "fleche_close" ? "fleche_open" : "fleche_close");
        setIsOpen(!isOpen);
    }

    return (
        <div className={`${styles.one_mission} ${isOpen ? styles.one_mission__open : styles.one_mission__close}`}>
            <div className={styles.content}>
                <img className={styles[flecheDirection]} src={Deroulant.src} onClick={open} alt="deroulant" />
                <div className={styles.info}>
                    <div className={styles.names}>
                        <text>{mission.title}</text>
                    </div>
                    <div className={styles.dates}>
                        <text>{mission.dateStart} - {mission.dateEnd}</text>
                    </div>
                        <div className={styles.buttons} >
                            {freelanceId == undefined ?
                                <Button
                                handleClick={() => router.push('/freelances')}
                                type="submit"
                                title="Proposer a un freelance"
                                className="btn__primary"
                                />
                            :
                                <Button
                                handleClick={() => fetchPropose()}
                                type="submit"
                                title="Proposer cette mission"
                                className="btn__primary"
                                />
                            }
                            
                        </div>
                </div>
            </div>
            {isOpen &&
                <div className={styles.other_info}>
                    <text>{mission.description}</text>                   
                    <div className={styles.all_amount}>
                        <text>montant: </text>
                        <div className={styles.amount}>
                            <text>{mission.amount} €</text>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Index;