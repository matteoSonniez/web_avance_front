import React from 'react';
import styles from "./index.module.scss";
import AnimText from "@/components/AnimationText";

const Index = () => {
    return (
        <div className={styles.body}>
            <AnimText></AnimText>
        </div>
    );
}

export default Index;
