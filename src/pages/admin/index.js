import React, { use } from 'react';
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Edit from "@/img/edition2.png";
import Delete from "@/img/supprimer.png";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useFetch from "@/hooks/useFetch";
import Cookies from 'js-cookie';

const Index = () => {
    const { isLogged, user, updateUser, updateUserCompany } = useContext(UserContext);
  
    const [token, setToken] = useState(Cookies.get('token_cookie'));
    const [acticityIdDelete, setActicityId] = useState(null);
    const [skillIdDelete, setSkillId] = useState(null);

    const [isOpen , setIsOpen] = useState(false);
    //const [isOpen , setIsOpen] = useState(false);

    //activitys
    const {data: activitys, error:activityError, loading:loadingActivity, fetchData:fetchActivitys} = useFetch({url:"activity", method:"GET", body:null, token:null})
    const {data: activitysUpdate, error:activityUpdateError, loading:loadingActivityUpdate, fetchData:fetchActivitysUpdate} = useFetch({url:`activity/${acticityIdDelete}`, method:"DELETE", body:null, token:token})
    const {data: activitysDelete, error:activityDeleteError, loading:loadingActivityDelete, fetchData:fetchActivitysDelete} = useFetch({url:`activity/${acticityIdDelete}`, method:"DELETE", body:null, token:token})
    //skills
    const {data: skills, error:skillsError, loading:loadingSkills, fetchData:fetchSkills} = useFetch({url:"skill", method:"GET", body:null, token:null})
    const {data: skillsDelete, error:skillsDeleteError, loading:loadingSkillsDelete, fetchData:fetchSkillsDelete} = useFetch({url:`skill/${skillIdDelete}`, method:"DELETE", body:null, token:token})
    //users
    const {data: users, error:usersError, loading:loadingUsers, fetchData:fetchUsers} = useFetch({url:"user/admin/users", method:"GET", body:null, token:token})
    //missions
    const {data: missions, error:missionsError, loading:loadingMissions, fetchData:fetchMissions} = useFetch({url:"mission/admin/mission", method:"GET", body:null, token:token})

    useEffect(() => {
        if(token != null) {
            fetchSkills();
            fetchActivitys();
            fetchUsers();
            fetchMissions();
        }
        
    }, [token]);

    useEffect(() => {
        console.log(users, 'TEST');
    }, [users]);

    useEffect(() => {
        if(acticityIdDelete != null) {
            fetchActivitysDelete();
        }
    }, [acticityIdDelete]);

    useEffect(() => {
        if(skillIdDelete != null) {
            fetchSkillsDelete();
        }
    }, [skillIdDelete]);

    useEffect(() => {
        console.log(skillsDelete, "erorrrrrrr");
    }, [skillsDelete]);

    const modifActivity =  (id) => {
        setActicityId(id);
    }

    const modifSkill =  (id) => {
        setSkillId(id);
    }
    const submitForm = (e) => {
        e.preventDefault();
    }
    return (
        <div className={styles.all_page}>
            { isOpen && (
                <Modal title="Modifier mon profil" closeModal={()=>setIsOpen(false)}>
                    <form className={styles.all_modal} onSubmit={(e) => {submitForm(e)}}>
                        <Input 
                            className="for_modal_freelance"
                            type="text" 
                            name="firstName" 
                            value="test"
                            isRequired={true}
                            placeholder="enter your firstName"
                            onChange={(e) => handleChange(e)}
                        />
                        <Button type="submit" title="modifier" className="btn__primary"/>
                    </form>
                </Modal>
                )
            }
            {skills.skills != null &&
                <div className={styles.one_part}>
                    <text className={styles.title}>Compétences</text>
                    <div className={styles.btn}> <Button handleClick={() => {setIsOpen(true)}} type="submit" title="Ajouter" className="btn__primary"/></div>
                    <div className={styles.all_info}>
                        {skills.skills.map((skill) => (
                            <div className={styles.info}>
                                <text >{skill.name}</text>
                                <img onClick={() => modifSkill(skill._id)} src={Delete.src}></img>
                                <img src={Edit.src}></img>
                            </div>  
                        ))}
                    </div>
                </div>
            }
            {activitys.activities != null &&
                <div className={styles.one_part}>
                    <text className={styles.title}>Métiers</text>
                    <div className={styles.btn}> <Button type="submit" title="Ajouter" className="btn__primary"/></div>
                    <div className={styles.all_info}>
                        {activitys.activities.map((activity) => (
                            <div className={styles.info}>
                                <text >{activity.name}</text>
                                <img onClick={() => modifActivity(activity._id)} src={Delete.src}></img>
                                <img src={Edit.src}></img>
                            </div>  
                        ))}
                    </div>  
                </div>
            }
            {users.users != null &&
                <div className={styles.one_part}>
                    <text className={styles.title}>Utilisateurs</text>
                    <div className={styles.btn}> <Button type="submit" title="modifier" className="btn__primary"/></div>
                    <div className={styles.all_info}>
                        {users.users.map((user) => (
                            <div className={styles.info}>
                                <text >{user.firstName}</text>
                                <img src={Delete.src}></img>
                            </div>  
                        ))}
                    </div>  
                </div>
            }
            {missions.missions != null &&
                <div className={styles.one_part}>
                    <text className={styles.title}>Missions</text>
                    <div className={styles.btn}> <Button type="submit" title="modifier" className="btn__primary"/></div>
                    <div className={styles.all_info}>
                        {missions.missions.map((mission) => (
                            <div className={styles.info}>
                                <text>{mission.title}</text>
                            </div>  
                        ))}
                    </div>  
                </div>
            }
        </div>
    );
}

export default Index;
