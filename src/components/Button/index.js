import styles from "./index.module.scss";

const Index = ({ type, title, handleClick, className, id }) => {
  return (
    <button id={id} type={type} onClick={handleClick} className={`${styles.btn} ${styles[className]}`}>
      {title}
    </button>
  );
}

export default Index;
