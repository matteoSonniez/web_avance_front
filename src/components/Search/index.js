import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Search from '../../img/chercher.png';
import Filtre from '../../img/filtre.png';
import Input from "@/components/Inputs";
import Button from "@/components/Button/";

const Index = ({className}) => {
  const router = useRouter();
   
  const [searchString, setSearchString] = useState({
    searchString: ""
  });
  const [filterClass, setFilterClass] = useState("filter_close");

  const handleChange = (e) => {
    setSearchString({[e.target.name]: e.target.value})
  }
  const searchFreelance = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/freelances',
      query: { searchString: searchString.searchString}
    })
    
  }
  const allFreelances = () => {
    setSearchString({
      searchString: ""
    })
  }
  const changeFilterClass = () => {
    if (filterClass == "filter_close") {
      setFilterClass("filter_open");
    } else {
      setFilterClass("filter_close");
    }
  }
  
  return (
        <div className={styles[className]}>
         <form className={styles.form_style} onSubmit={(e)=>searchFreelance(e)}>
            <Input 
              className="the_input"
              type="text" 
              name="searchString" 
              placeholder="Chercher avec 'Nom', 'Javascript', 'paris'..."
              required={true}
              image={Search}
              onChange={(e) => handleChange(e)}
              value={searchString.searchString}
            />
            <div className={styles.all_button}>
              <Button
                type="submit"
                title="Chercher un freelance"
                className="btn__primary"
              />
              <text>ou</text>
              <Button
                handleClick={allFreelances}
                type="submit"
                title="Tous les freelances"
                className="btn__primary"
              />
            </div>
            <div className={styles.filter} onClick={changeFilterClass}>
              <img className={styles[filterClass]} src={Filtre.src}></img>
            </div>
          </form>
        </div>
  )
}

export default Index;
