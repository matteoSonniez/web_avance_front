import React, { use } from 'react';
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import OnePropose from "@/components/onePropose";
import Cookies from 'js-cookie';

const Index = () => {
    const { isLogged, user, updateUser, updateUserCompany } = useContext(UserContext);
    const [token, setToken] = useState(Cookies.get('token_cookie'));
    const [pendingActive, setPendingActive] = useState(true);
    const [refusedActive, setRefusedActive] = useState(false);
    const [acceptedActive, setAcceptedActive] = useState(false);
    const [proposeResponse, setProposeResponse] = useState();
    const [proposeId, setProposeId] = useState(null);
    const [propositionsAccepted, setPropositionsAccepted] = useState([]);
    const [propositionsRefused, setPropositionsRefused] = useState([]);
    const [propositionsPending, setPropositionsPending] = useState([]);

    const {data: propositions, error:propositionsError, loading:loadingPropositions, fetchData:fetchPropositions} = useFetch({url:"proposition/my-propositions", method:"GET", body:null, token:token})
    const {data: propositionsUpdate, error:statusError, loading:loadingStatus, fetchData:fetchStatusUpdate} = useFetch({url:`proposition/update-freelance/${proposeId}`, method:"POST", body: {status: proposeResponse}, token:token})

    const handleRefused = () => {
         setRefusedActive(true);
         setAcceptedActive(false);
         setPendingActive(false);

    };
    const declinePropose = (params) => {
        setProposeResponse("REFUSED");
        setProposeId(params);
    };
    const acceptPropose = (params) => {
        setProposeResponse("ACCEPTED");
        setProposeId(params);
    };

    //<Link onClick={acceptPropose} className={styles.link_refused} href={"/"}>décliner</Link>
     const handleAccepted = () => {
        setRefusedActive(false);
        setAcceptedActive(true);
        setPendingActive(false);
    };
    const handlePending = () => {
        setRefusedActive(false);
        setAcceptedActive(false);
        setPendingActive(true);
    };

    useEffect(() => {
        if (user.freelance != undefined) {
            fetchPropositions();
        }
    }, [user]);

    useEffect(() => {
        if (proposeId != null) {
            fetchStatusUpdate();
        }
    }, [proposeId]);


    useEffect(() => {
        if (propositions.propositions != null) {
            if (propositions.propositions.length != 0) {
                for (var i = 0; i < propositions.propositions.length; i++) {
                    if (propositions.propositions[i].status == "PENDING") {
                      const newProposition = propositions.propositions[i];
                      const alreadyExists = propositionsPending.some(
                        (p) => p.id === newProposition.id
                      );
                      if (!alreadyExists) {
                        setPropositionsPending((prevState) => [...prevState, newProposition]);
                      }
                    }
                    if (propositions.propositions[i].status == "REFUSED") {
                        const newProposition = propositions.propositions[i];
                        const alreadyExists = propositionsRefused.some(
                          (p) => p.id === newProposition.id
                        );
                        if (!alreadyExists) {
                          setPropositionsRefused((prevState) => [...prevState, newProposition]);
                        }
                    }
                    if (propositions.propositions[i].status == "ACCEPTED") {
                        const newProposition = propositions.propositions[i];
                        const alreadyExists = propositionsAccepted.some(
                          (p) => p.id === newProposition.id
                        );
                        if (!alreadyExists) {
                          setPropositionsAccepted((prevState) => [...prevState, newProposition]);
                        }
                    }
                  }
            }
        }
    }, [propositions]);


    return (
        <div className={styles.center}>
            {propositions.propositions != null &&
            <div className={styles.all_page}>
                <div className={styles.header_propose}>
                    <div className={styles.content}>
                        <button onClick={handlePending} className={`${styles.nav_propose} ${ pendingActive ? styles.nav_propose__active : styles.nav_propose__inactive }`}>pending</button>
                        <button onClick={handleRefused} className={`${styles.nav_propose} ${ refusedActive ? styles.nav_propose__active : styles.nav_propose__inactive }`}>refused</button>
                        <button onClick={handleAccepted} className={`${styles.nav_propose} ${ acceptedActive ? styles.nav_propose__active : styles.nav_propose__inactive }`}>accepted</button>
                    </div>
                </div>
                <div className={styles.trait}></div>
                {pendingActive &&
                    <>
                        {propositionsPending.length != 0 && 
                            <div>
                                {propositionsPending.map((proposition) => (
                                    <OnePropose handelClickDecline={declinePropose} handelClickAccepte={acceptPropose} proposition={proposition}></OnePropose>
                                ))}
                            </div>
                        }
                    </>
                }
                {refusedActive &&
                    <>
                        {propositionsRefused.length != 0 && 
                            <div>
                                {propositionsRefused.map((proposition) => (
                                    <OnePropose proposition={proposition}></OnePropose>
                                ))}
                            </div>
                        }
                    </>
                }
                {acceptedActive &&
                    <>
                        {propositionsAccepted.length != 0 && 
                            <div>
                                {propositionsAccepted.map((proposition) => (
                                    <OnePropose proposition={proposition}></OnePropose>
                                ))}
                            </div>
                        }
                    </>
                }
            </div>
            }
        </div>
        
       
    );
}

export default Index;
