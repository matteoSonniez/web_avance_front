import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/Input";
import Button from "@/components/Button/";
import Notification from "@/components/Notification";
import Cookies from 'js-cookie';
import styles from "./index.module.scss";

const Index = () => {

  const router = useRouter();
  const [token, setToken] = useState(null);

  //const { login } = useContext(UserContext);

  //les formulaires
  const [userForm, setUserForm] = useState({
    email: "",
    password:"",
    firstName:"",
    lastName:"",
    phone:"",
    userType:"",
    address:{
        city:"",
        zipCode: null,
        street:""
    }
  });

  const [freelanceForm, setFreelanceForm] = useState({
    rate: null,
    yearOfExperience: null
  });

  const [companyForm, setCompanyForm] = useState({
    name: "",
    status: "",
    siret: null,
    address: {
      city: "",
      zipCode: null,
      street: ""
    },
  });
 
  

  const { fetchData, data, error, loading } = useFetch({ url: "auth/register", method: "POST", body: userForm, token: null })
  const { data: freelance, error: freelanceError, loading: freelanceLoading, fetchData: fetchDataFreelance } = useFetch({ url: "auth/freelance", method: "POST", body: freelanceForm, token: token });
  const { data: company, error: companyError, loading: companyLoading, fetchData: fetchDataCompany } = useFetch({ url: "auth/company", method: "POST", body: companyForm, token: token });

  //fonctions pour les inputs
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
    if (e.target.name === "zipCode"){
      userForm.address.zipCode = e.target.value
    }
    if (e.target.name === "city"){
      userForm.address.city = e.target.value
    }
    if (e.target.name === "street"){
      userForm.address.street = e.target.value
    }
  }
  const handleChangeFreelance = (e) => {
    setFreelanceForm({
      ...freelanceForm,
      [e.target.name]: e.target.value
    })
  }
  const handleChangeCompany = (e) => {
    setCompanyForm({
      ...companyForm,
      [e.target.name]: e.target.value
    })
    if (e.target.name === "zipCode"){
      companyForm.address.zipCode = e.target.value
    }
    if (e.target.name === "city"){
      companyForm.address.city = e.target.value
    }
    if (e.target.name === "street"){
      companyForm.address.street = e.target.value
    }
  }

  const submitLogin = (e) => {
    e.preventDefault();
    fetchData();
  }
  useEffect(() => {
    if (data.success == true){
      if (data.token) {
        setToken(data.token);
        Cookies.set('token_cookie', data.token); 
      }
    }
  }, [data]);
  useEffect(() => {
    if (token != null){
      if(userForm.userType == "FREELANCE"){
        fetchDataFreelance();
      }
      if(userForm.userType == "COMPANY"){
        fetchDataCompany();
      }
      
    }
  }, [token]);
  
  useEffect(() => {
    if(userForm.userType == "FREELANCE"){
      if (freelance.success == true){
        router.push('/');
      }
    }
    if(userForm.userType == "COMPANY"){
      if (company.success == true){
        router.push('/');
      }
    }
  }, [company, freelance]);


  return (
    <div className={styles.register_form}>
      <h1>USER SIGN UP</h1>
      <form onSubmit={(e)=>submitLogin(e)}>
        <div className={styles.the_inputs}>
          <div className={styles.first_info}>
            <Input
            type="text" 
            name="firstName" 
            placeholder="veuillez saisir votre prénom"
            required={true}
            onChange={(e) => handleChange(e)}
            className="user"
            value={userForm.firstName}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="veuillez saisir votre mot de nom"
              required={true}
              onChange={(e) => handleChange(e)}
              className="user"
              value={userForm.lastName}
            />
            <Input
              type="password"
              name="password"
              placeholder="veuillez saisir votre mot de passe"
              required={true}
              onChange={(e) => handleChange(e)}
              className="password"
              value={userForm.password}
            />
            <Input
              type="email"
              name="email"
              placeholder="veuillez saisir votre email"
              required={true}
              onChange={(e) => handleChange(e)}
              className="email"
              value={userForm.email}
            />
          </div>
          <div className={styles.second_info}>
            <Input
              type="text"
              name="phone"
              placeholder="veuillez saisir votre mot de numéro de téléphone"
              required={true}
              onChange={(e) => handleChange(e)}
              className="tel"
              value={userForm.phone}
            />
            <Input
              type="text"
              name="city"
              placeholder="ville"
              required={true}
              onChange={(e) => handleChange(e)}
              className="address"
              value={userForm.address.city}
            />
            <Input
              type="number"
              name="zipCode"
              placeholder="zip code"
              required={true}
              onChange={(e) => handleChange(e)}
              className="address"
              value={userForm.address.zipCode}
            />
            <Input
              type="text"
              name="street"
              placeholder="rue"
              required={true}
              onChange={(e) => handleChange(e)}
              className="address"
              value={userForm.address.street}
            />
          </div>
        </div>
        <div className={styles.the_radios}>
          <Input
            label="FREELANCE"
            type="radio"
            name="userType"
            placeholder="rue"
            value="FREELANCE"
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="COMPANY"
            type="radio"
            name="userType"
            placeholder="rue"
            value="COMPANY"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {
          userForm.userType == "COMPANY" && 
          <div className={styles.company_form}>
            <div>
              <Input
                type="text"
                name="name"
                placeholder="veuillez saisir le nom de l'entreprise"
                required={true}
                onChange={(e) => handleChangeCompany(e)}
                value={companyForm.name}
              />
              <Input
                type="text"
                name="status"
                placeholder="veuillez saisir le status de l'entreprise"
                required={true}
                onChange={(e) => handleChangeCompany(e)}
                value={companyForm.status}
              />
              <Input
                type="number"
                name="siret"
                placeholder="siret"
                required={true}
                onChange={(e) => handleChangeCompany(e)}
                value={companyForm.siret}
            />
            </div>
            <div>
              <Input
                type="text"
                name="city"
                placeholder="ville"
                required={true}
                onChange={(e) => handleChangeCompany(e)}
                value={companyForm.address.city}
              />
              <Input
                type="number"
                name="zipCode"
                placeholder="zip code"
                required={true}
                onChange={(e) => handleChangeCompany(e)}
                value={companyForm.address.zipCode}
              />
              <Input
                type="text"
                name="street"
                placeholder="rue"
                required={true}
                onChange={(e) => handleChangeCompany(e)}
                value={companyForm.address.street}
              />
            </div>
          </div>
        }
        {
          userForm.userType == "FREELANCE" && 
          <div className={styles.freelance_form}>
            <Input
              type="number"
              name="rate"
              placeholder="rate"
              required={true}
              onChange={(e) => handleChangeFreelance(e)}
              value={freelanceForm.rate}
            />
            <Input
              type="number"
              name="yearOfExperience"
              placeholder="Années d'expérience"
              required={true}
              onChange={(e) => handleChangeFreelance(e)}
              value={freelanceForm.yearOfExperience}
            />
          </div>

        }
        <Button
          type="submit"
          title="Inscriprion"
          className="btn__primary"
        />
      </form>
      {
        error && (
          <Notification type="warning" message={error.message}/>
        )
      }
    </div>
  );

}

export default Index;



