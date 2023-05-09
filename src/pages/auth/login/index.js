import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/Input";
import Button from "@/components/Button/";
import Notification from "@/components/Notification";
import Profile from '../../../img/profile.png';
import styles from "./index.module.scss";
import Cookies from 'js-cookie';

const Index = () => {

  const router = useRouter();

  const { login } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    email: "",
    password:""
  });

  const [token, setToken] = useState();

  const { fetchData, data, error, loading } = useFetch({ url: "/auth/login", method: "POST", body: userForm, token: null })
  const { data: user, error: userError, loading:userLoading, fetchData:fetchDataUser } = useFetch({ url: "user", method: "GET", body: null, token: token });

  useEffect(() => {
    if (data.token) {
      setToken(data.token);
      //localStorage.setItem('token', data.token);
      Cookies.set('token_cookie', data.token);
    }
  }, [data]);

  useEffect(() => {
    if (token != null) {
      fetchDataUser();  
    }
  },[token])

  useEffect(() => {
    if (user.success == true) {
      login(user.user);
      router.push('/');
    }
  },[user])

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = (e) => {
    e.preventDefault();
    fetchData();
  }

  return (
    <div className={styles.login_form}>
      <h1>USER LOGIN</h1>
      <form onSubmit={(e)=>submitLogin(e)}>
        <Input
          type="email" 
          name="email"
          required={true}
          onChange={(e) => handleChange(e)}
          className="user"
          image={Profile}
          value={userForm.email}
        />
        <Input
          type="password"
          name="password"
          required={true}
          onChange={(e) => handleChange(e)}
          className="password"
          image={Profile}
          value={userForm.password}
        />
        <div className={styles.forgot_pass}>
          <text>forgot password?</text>
        </div>
        <Button
          type="submit"
          title="CONNEXION"
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


