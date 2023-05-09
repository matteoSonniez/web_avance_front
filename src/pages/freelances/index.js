import React from 'react';
import { useRouter } from 'next/router'
import styles from "./index.module.scss";
import useFetch from "@/hooks/useFetch";
import SearchInputs from "@/components/Search";
import FreelanceGrid from "@/components/Freelance/FreelanceGrid";
import OneFreelance from "@/components/Freelance/OneFreelance";
import { useContext, useEffect, useState } from "react";
import Search from '../../img/chercher.png';
import Input from "@/components/Inputs";
import AnimText from "@/components/AnimationText";

const Index = () => {
    const router = useRouter()
    const [searchString, setSearchString] = useState({
        searchString: router.query.searchString
      });
    const { fetchData, data, error, loading } = useFetch({ url: "freelance/search", method: "POST", body: {searchString: router.query.searchString}, token: null })

    useEffect(() => {
        fetchData()
      }, []);
    useEffect(() => {
        fetchData();
    }, [router.query]);
    

    return (
        <>
            <div className={styles.search_center}>
                <div className={styles.title_div}>
                    <h1 className={styles.title}><AnimText text="Find" className="patterns__three"></AnimText> what you need.
                    </h1>
                </div>
                <SearchInputs className="search_second"></SearchInputs>
                {data &&
                    <FreelanceGrid freelances={data.freelances}></FreelanceGrid>
                }
            </div>
            
        </>
    );
}
/*
 */
export default Index;
