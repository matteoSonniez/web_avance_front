import React from 'react';
import styles from "./index.module.scss";

const Index = ({ text, className }) => {
    return (
        <div className={`${styles.patterns} ${styles[className]}`}>
            <svg width="330px">
                <text x="50%" y="50%" textAnchor="middle"  >
                    {text}
                </text>
            </svg>
        </div>
    );
}

export default Index;
