import styles from "./index.module.scss";

const Index = ({ label, type, name, value, isRequired, placeholder, onChange, className, isCheck }) => {
  return (
    <div className={styles.wrapper}>
      {
        label && (
          <label>{label}</label>
        )
      }
      <input 
      name={name} 
      value={value} 
      required={isRequired} 
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      className={`${styles[className]}`}
      checked={isCheck}  
      />
    </div>
  );
}

export default Index;
