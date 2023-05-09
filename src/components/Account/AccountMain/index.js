import React from 'react';
import styles from "./index.module.scss";
import Modif from '../../../img/editer.png';

const Index = ({user, handleClick}) => {
    return (
        <div className={styles.all_account}>           
            <div className={styles.user_info}>
                <div className={styles.all_info}>
                    <div className={styles.one_info}>
                        <text className={styles.title_info}>Prénom</text>
                        <text className={styles.info}>{user.firstName}</text>
                    </div>
                    <div className={styles.trait}></div>
                    <div className={styles.one_info}>
                        <text className={styles.title_info}>Nom</text>
                        <text className={styles.info}>{user.lastName}</text>
                    </div>
                    <div className={styles.trait}></div>
                    <div className={styles.one_info}>
                        <text className={styles.title_info}>Email</text>
                        <text className={styles.info}>{user.email}</text>
                    </div>
                    <div className={styles.trait}></div>
                    <div className={styles.one_info}>
                        <text className={styles.title_info}>Adresse</text>
                        <text className={styles.info}>{user.address.street} {user.address.zipCode} {user.address.city}</text>
                    </div>
                    <div className={styles.trait}></div>   
                    <div className={styles.one_info}>
                        <text className={styles.title_info}>Téléphone</text>
                        <text className={styles.info}>{user.phone}</text>
                    </div>  
                </div>
            </div>
            <div className={styles.freelance_info}>
                <div className={styles.all_info}>
                {user.freelance.activity != null &&
                    <text className={styles.actity_name}>{user.freelance.activity.name}</text>
                }
                    <div className={styles.trait}></div>
                    <div className={styles.other_info}>
                        <div className={styles.skills}>
                            {user.freelance.skills.map((skill) => (
                                <div>
                                    <text className={styles.one_skill}>{skill.name}</text>
                                </div>  
                            ))}
                        </div>
                        <div className={styles.right}>
                            <div className={styles.collum}>
                                <text className={styles.title_info}>Taux journalier:</text>
                                <text className={styles.info}>{user.freelance.rate} €</text>
                            </div>
                            <div className={styles.collum}>
                                <text className={styles.title_info}>Années d'expérience:</text>
                                <text className={styles.info}>{user.freelance.yearOfExperience} ans</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
/**
 * {freelance.skills.map((skill) => (
                <text>{skill.name}</text>
            ))}
             */
export default Index;
