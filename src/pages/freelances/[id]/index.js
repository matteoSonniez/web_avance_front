import React from 'react';
import styles from "./index.module.scss";
import { useRouter } from 'next/router'
import useFetch from "@/hooks/useFetch";
import AccountHeader from "@/components/Account/AccountHeader";
import AccountMain from "@/components/Account/AccountMain";
import { useEffect } from "react";
import { useState } from "react";

const Index = () => {
    const router = useRouter()
    const { id } = router.query
    const [freelance, setFreelance] = useState(null);
    const { data, error, loading, fetchData } = useFetch({url:`freelance/${id}`, method:"GET", body:null, token:null});


    useEffect(() => {
        if(id != undefined){
            fetchData();
        }
    },[id]);

    useEffect(() => {
        if(data.success == true){
            console.log(data)
            setFreelance(data.freelance)
        }
              
    },[data]);

    return (
        <div>
            {freelance != null && 
            <div className={styles.all_account}>
                <AccountHeader freelance={freelance}></AccountHeader>
                <AccountMain freelance={freelance}></AccountMain>
            </div>}
        </div>
    );
}

export default Index;