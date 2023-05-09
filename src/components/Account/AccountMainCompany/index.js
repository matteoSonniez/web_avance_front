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
            <div className={styles.company_info}>
                <div className={styles.all_info}>
                    <text className={styles.company_name}>{user.company.name}</text>
                    
                    <div className={styles.other_info}>
                        <div className={styles.one_info}>
                            <text className={styles.title_info}>Status</text>
                            <text className={styles.info}>{user.company.status}</text>
                        </div>
                        <div className={styles.trait}></div>
                        <div className={styles.one_info}>
                            <text className={styles.title_info}>numéro de siret</text>
                            <text className={styles.info}>{user.company.siret}</text>
                        </div>
                        <div className={styles.trait}></div>
                        <div className={styles.one_info}>
                            <text className={styles.title_info}>Adresse company</text>
                            <text className={styles.info}>{user.address.street} {user.address.zipCode} {user.address.city}</text>
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
