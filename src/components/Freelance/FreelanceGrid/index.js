import React from 'react';
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import OneFreelance from "@/components/Freelance/OneFreelance";
import Link from 'next/link';

const Index = ({freelances}) => {
    const router = useRouter();
    return (
        
        <div className={styles.all_page}>
            {freelances && freelances.map((freelance) => (
                <OneFreelance freelance={freelance}></OneFreelance>
            ))}  
        </div> 
    );
}

export default Index;
