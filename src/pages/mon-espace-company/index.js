import React from 'react';
import UserContext from "@/context/UserContext";
import styles from "./index.module.scss";
import { useContext, useEffect, useState } from "react";
import OneMisson from '@/components/partials/oneMission';
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import AddImage from '@/img/ajouter.png';
import useFetch from "@/hooks/useFetch";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();
    const [token, setToken] = useState(Cookies.get('token_cookie'));
    const [isOpen , setIsOpen] = useState(false);
    const [freelanceId, setSearchString] = useState(router.query.freelanceId);
    const [missionForm , setMissionForm] = useState({
        dateStart: "",
        dateEnd:"",
        amount: null,
        title: "",
        description: ""
      });

    const {data: missions, error:missionsError, loading:loadingMissions, fetchData:fetchMissions} = useFetch({url:"mission/missions", method:"GET", body:null, token:token})
    const {data: missionCreated, error:missionsCreateError, loading:loadingCreateMissions, fetchData:fetchCreateMissions} = useFetch({url:"mission", method:"POST", body:missionForm, token:token})
    
    useEffect(() => {
        if(token != null) {
            fetchMissions();
        }
    }, [token]);

    useEffect(() => {
        if (missionCreated.success == true) {
            setIsOpen(false);
            fetchMissions();
        }
    }, [missionCreated]);

    const submitForm = (e) => {
        e.preventDefault();
        fetchCreateMissions();
    }

    const handleChange = (e) => {
        setMissionForm({
          ...missionForm,
          [e.target.name]: e.target.value
        })
      }

    return (
        <div>
            { isOpen && (
                <Modal title="Ajouter une mission" closeModal={()=>setIsOpen(false)}>
                    <form  onSubmit={(e) => {submitForm(e)}}>
                        <div>
                            <div>
                                <Input
                                type="text" 
                                name="title" 
                                value={missionForm.title}
                                isRequired={true}
                                placeholder="titre de la mission"
                                onChange={(e) => handleChange(e)}
                                />
                                <Input
                                type="text" 
                                name="description" 
                                value={missionForm.description}
                                isRequired={true}
                                placeholder="déscription"
                                onChange={(e) => handleChange(e)}
                                />
                                <Input
                                type="text" 
                                name="dateStart" 
                                value={missionForm.dateStart}
                                isRequired={true}
                                placeholder="date de fin"
                                onChange={(e) => handleChange(e)}
                                />
                                <Input
                                type="text" 
                                name="dateEnd" 
                                value={missionForm.dateEnd}
                                isRequired={true}
                                placeholder="date de fin"
                                onChange={(e) => handleChange(e)}
                                />
                                <Input
                                type="number" 
                                name="amount" 
                                value={missionForm.amount}
                                isRequired={true}
                                placeholder="montant"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>      
                        </div>
                        <Button type="submit" title="ajouter" className="btn__primary"/>
                    </form>
                </Modal>
                )
            }
            {missions.missions != null && 
            <div className={styles.all_page}>
                <div onClick={() => {setIsOpen(true)}} className={styles.add_mission}>
                    <img src={AddImage.src}></img>
                </div>
                {missions.missions.length == 0 &&
                    <text>pas de mission pour le moment </text>
                }
                {missions.missions.map((mission) => (
                    <OneMisson freelanceId={freelanceId} mission={mission}></OneMisson> 
                ))}
            </div>     
            }
        </div>
    );
}

export default Index;
