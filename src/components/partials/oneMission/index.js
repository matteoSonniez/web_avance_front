import React from 'react';
import styles from "./index.module.scss";
import Deroulant from '@/img/fleche_droite.png';
import Button from '@/components/UI/Button';
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Edit from "@/img/edition2.png";
import Delete from "@/img/supprimer.png";
import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';


const Index = ({mission, handelClickDecline, handelClickAccepte, freelanceId}) => {

    const [token, setToken] = useState(Cookies.get('token_cookie'));
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [flecheDirection, setFlecheDirection] = useState("fleche_close");

    const {data: propose, error:proposeError, loading:loadingPropose, fetchData:fetchPropose} = useFetch({url:`proposition/create/${mission._id}`, method:"POST", body:{"freelance": `${freelanceId}`}, token:token})
    const {data: missionDelete, error:missionDeleteError, loading:loadingMissionDelete, fetchData:fetchMissionDelete} = useFetch({url:`proposition/create/${mission._id}`, method:"POST", body:{"freelance": `${freelanceId}`}, token:token})

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
                    <div className={styles.buttons}>
                        <img src={Edit.src}></img>
                        <img src={Delete.src}></img>
                    </div>
                </div>
            }
        </div>
    );
}

export default Index;