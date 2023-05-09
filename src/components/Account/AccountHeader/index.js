import React from 'react';
import styles from "./index.module.scss";
import Personne from '@/img/user2.png';
import Loca from '@/img/localisateur.png';
import Modif from '@/img/editer.png';

const Index = ({freelance, user, handleClick}) => {
    return (
        <div className={styles.all_header}>
            <div className={styles.account_image}>
                <img src={Personne.src}></img>
            </div>
            <div className={styles.account_info}>
                <div className={styles.all_names}>
                    <text className={styles.names}>{user.firstName} {user.lastName}</text>
                </div>
                {user.userType == "FREELANCE" &&
                    <div className={styles.job}>
                        {user.freelance.activity != null &&
                            <text>{user.freelance.activity.name}</text>
                        }
                    </div>
                }
                <div className={styles.loca}>
                    <img src={Loca.src}></img>
                    <text className={styles.address}>{user.address.city}, {user.address.street}</text>
                </div>
            </div>
            <div onClick={handleClick} className={styles.modif}>
                <img src={Modif.src}></img>
                <text>Modifier</text>
            </div>
        </div>
    );
}
export default Index;
