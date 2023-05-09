import React, { use } from 'react';
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useFetch from "@/hooks/useFetch";
import AccountHeader from "@/components/Account/AccountHeader";
import AccountMain from "@/components/Account/AccountMain";
import AccountMainCompany from "@/components/Account/AccountMainCompany";
import Cookies from 'js-cookie';

const Index = () => {

    const { isLogged, user, updateUser, updateUserCompany } = useContext(UserContext);
  
    const [token, setToken] = useState(Cookies.get('token_cookie'));
    const [freelance_id, setFreelance_id] = useState(null);
    //forms
    const [userForm, setUserForm] = useState(null);
    const [freelanceForm, setFreelanceForm] = useState(null);
    const [companyForm, setCompanyForm] = useState(null);
    const [skillsForm, setSkillsForm] = useState([]);

    //modals
    const [isOpen , setIsOpen] = useState(false);
    const [isOpenFreelance , setIsOpenFreelance ] = useState(false);
    const [isOpenCompany , setIsOpenCompany ] = useState(false);

    //requetes api
    const {data: freelance, error:freelanceError, loading:loadingFreelance, fetchData:fetchDataFreelance} = useFetch({url:"user/my-freelance", method:"POST", body:{"freelance_id":`${freelance_id}`}, token:token})
    const {data: dataUpdate, error:errorUpdate, loading:loadingUpdate, fetchData:fetchDataUpdate} = useFetch({url:"/user", method:"PUT", body:userForm, token:token})
    const {data: freelanceUpdate, error:errorUpdateFreelance, loading:loadingUpdateFreelance, fetchData:fetchFreelanceUpdate} = useFetch({url:"/user/freelance", method:"PUT", body:freelanceForm, token:token})
    const {data: companyUpdate, error:errorUpdateCompany, loading:loadingUpdateCompany, fetchData:fetchCompanyUpdate} = useFetch({url:"/user/company", method:"PUT", body:companyForm, token:token})
    const {data: skills, error:errorSkills, loading:loadingSkills, fetchData:fetchSkills} = useFetch({url:"/skill", method:"GET", body:null, token:null})
    const {data: activitys, error:errorActivitys, loading:loadingActivitys, fetchData:fetchActivitys} = useFetch({url:"/activity", method:"GET", body:null, token:null})


    //les use effects
    useEffect(() => {
        setUserForm(user)
        console.log(user, "userCOMPANYYYY");
        if (user.freelance != undefined) {
            setFreelance_id(user.freelance._id);
        }
        if (user.company != undefined) {
            setCompanyForm(user.company);
        }
    }, [user]);
    
    useEffect(() => {
        if (freelance_id != null) {
            fetchDataFreelance();
            fetchSkills();
            fetchActivitys();
        }
    }, [freelance_id]);


    useEffect(() => {
        if(freelance != null) {
            setFreelanceForm(freelance.freelance);
        }
    }, [freelance]);

    useEffect(() => {
        if (skills != null) {
        }
    }, [skills]);

    useEffect(() => {
        if (activitys != null) {
        }
    }, [activitys]);

    useEffect(() => {
        if (dataUpdate.success) {
            setIsOpen(false);
            updateUser(dataUpdate.user)
        }
    }, [dataUpdate]);

    useEffect(() => {
        if (freelanceUpdate.success) {
            fetchDataFreelance();
            setIsOpenFreelance(false);
        }
    }, [freelanceUpdate]);



    //les handlechanges
    const handleChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
        if (e.target.name === "zipCode"){
            userForm.address.zipCode = e.target.value
        }
        if (e.target.name === "city"){
            userForm.address.city = e.target.value
        }
        if (e.target.name === "street"){
            userForm.address.street = e.target.value
        }
        if (e.target.name === "rate"){
            userForm.freelance.rate = e.target.value
        }
        if (e.target.name === "yearOfExperience"){
            userForm.freelance.yearOfExperience = e.target.value
        }
        if (e.target.name === "name"){
            userForm.company.name = e.target.value
        }
        if (e.target.name === "siret"){
            userForm.company.siret = e.target.value
        }
        if (e.target.name === "company_city"){
            userForm.company.address.city = e.target.value
        }
        if (e.target.name === "company_street"){
            userForm.company.address.street = e.target.value
        }
        if (e.target.name === "company_zipCode"){
            userForm.company.address.zipCode = e.target.value
        }
    }

    function handleJobSelectChange(event) {
        const selectedValue = event.target.value;
        const selectedActivity = JSON.parse(selectedValue);
        userForm.freelance.activity = selectedActivity;
      }  
    const handleChangeSkills = (e) => {
        if (e.target.checked) {
          skillsForm.push(e.target.value);
        } else {
          const index = skillsForm.indexOf(e.target.value);
          if (index !== -1) {
            skillsForm.splice(index, 1);
          }
        }
        userForm.freelance.skills = skillsForm;
      }

    //les submitForm
    const submitForm = (e) => {
        e.preventDefault();
        fetchDataUpdate();
        if (dataUpdate.success) {
            setIsOpen(false);
        }
    }
    const openModal = (e) => {
        setIsOpen(true);
        setSkillsForm([]);
    }

    return (
        <div>
            { isOpen && (
                <Modal title="Modifier mon profil" closeModal={()=>setIsOpen(false)}>
                    <form className={styles.all_modal} onSubmit={(e) => {submitForm(e)}}>
                        <div className={styles.all_inputs}>
                            <div className={styles.inputs}>
                                <Input 
                                className="for_modal_freelance"
                                type="text" 
                                name="firstName" 
                                value={userForm.firstName}
                                isRequired={true}
                                placeholder="enter your firstName"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={styles.inputs}>
                                <Input 
                                className="for_modal_freelance"
                                type="text" 
                                name="lastName" 
                                value={userForm.lastName}
                                isRequired={true}
                                placeholder="enter your lastName"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={styles.inputs}>
                                <Input 
                                className="for_modal_freelance"
                                type="text" 
                                name="email" 
                                value={userForm.email}
                                isRequired={true}
                                placeholder="enter your email"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={styles.inputs}>
                                <Input 
                                className="for_modal_freelance"
                                type="text" 
                                name="phone" 
                                value={userForm.phone}
                                isRequired={true}
                                placeholder="enter your phone"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={styles.inputs}>
                                <Input 
                                className="for_modal_freelance"
                                type="text" 
                                name="city" 
                                value={userForm.address.city}
                                isRequired={true}
                                placeholder="enter your city"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={styles.inputs}>
                                <Input 
                                className="for_modal_freelance"
                                type="text" 
                                name="street" 
                                value={userForm.address.street}
                                isRequired={true}
                                placeholder="enter your street"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={styles.inputs}>
                                <Input 
                                className="for_modal_freelance"
                                type="text" 
                                name="zipCode" 
                                value={userForm.address.zipCode}
                                isRequired={true}
                                placeholder="enter your zipCode"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                            {userForm.userType == "FREELANCE" &&
                                <div className={styles.rate_xp}>
                                    <div className={styles.inputs}>
                                        <Input
                                        type="text" 
                                        name="rate" 
                                        value={userForm.freelance.rate}
                                        isRequired={true}
                                        className="for_modal_freelance"
                                        placeholder="enter your rate"
                                        onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className={styles.inputs}>
                                        <Input
                                        type="text" 
                                        name="yearOfExperience" 
                                        value={userForm.freelance.yearOfExperience}
                                        isRequired={true}
                                        className="for_modal_freelance"
                                        placeholder="enter your lastName"
                                        onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        {userForm.userType == "FREELANCE" &&
                            <div>
                                <div className={styles.jobs}>
                                    <label for="job-select">Métier:</label>
                                    <select name="pets" id="job-select" onChange={handleJobSelectChange}>
                                        { userForm.freelance.activity != null
                                            ? <option value={userForm.freelance.activity}>{userForm.freelance.activity.name}</option>
                                            : <option value="">Choose an activity</option>
                                        }
                                        {activitys.activities.map((activity) => (
                                            <option value={JSON.stringify(activity)}>{activity.name}</option>                                    
                                        ))}
                                    </select>
                                </div>
                                {skills != null &&(
                                    <div className={styles.all_skills}>
                                        {skills.skills.map((skill) => (
                                            <label>
                                                {skill.name}
                                                <input
                                                type="checkbox" 
                                                name="" 
                                                value={`${skill._id}`}
                                                placeholder="enter your email"
                                                onChange={(e) => handleChangeSkills(e)}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        }
                        {userForm.userType == "COMPANY" &&
                            <div>
                                <Input
                                label="numéro de siret" 
                                type="number" 
                                name="siret" 
                                value={userForm.company.siret}
                                isRequired={true}
                                className="for_modal_freelance"
                                placeholder="enter your siret"
                                onChange={(e) => handleChange(e)}
                                />
                                <Input
                                label="nom de l'entreprise"
                                type="text" 
                                name="name" 
                                value={userForm.company.name}
                                isRequired={true}
                                className="for_modal_freelance"
                                placeholder="enter your name"
                                onChange={(e) => handleChange(e)}
                                />
                                <Input
                                label="city"
                                type="text" 
                                name="company_city" 
                                value={userForm.company.address.city}
                                isRequired={true}
                                className="for_modal_freelance"
                                placeholder="enter your name"
                                onChange={(e) => handleChange(e)}
                                />
                                <Input
                                label="zip code"
                                type="text" 
                                name="company_zipCode" 
                                value={userForm.company.address.zipCode}
                                isRequired={true}
                                className="for_modal_freelance"
                                placeholder="enter your name"
                                onChange={(e) => handleChange(e)}
                                />
                                <Input
                                label="street"
                                type="text" 
                                name="company_street" 
                                value={userForm.company.address.street}
                                isRequired={true}
                                className="for_modal_freelance"
                                placeholder="enter your name"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                        }
                        <Button type="submit" title="modifier" className="btn__primary"/>
                    </form>
                </Modal>
                )
            }
            
            {isLogged != false && 
                <div className={styles.all_page}>
                    <div className={styles.all_account}>
                        <AccountHeader  user={user} handleClick={() => {openModal()}}></AccountHeader>
                        {user.userType == "FREELANCE" ?
                            <div className={styles.main_account}>
                                {freelance.freelance != null &&
                                    <AccountMain user={user} ></AccountMain>
                                }
                            </div>  
                        :
                        <AccountMainCompany user={user}></AccountMainCompany>     
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Index;
