import styles from "./index.module.scss";

const Index = ({type, name, value, isRequired, placeholder, onChange, className, image }) => {
  return (
    <div className={`${styles[className]}`} >
       <img src={image.src}></img>
      <input 
        name={name} 
        value={value} 
        required={isRequired} 
        placeholder={placeholder}
        type={type}
        onChange={onChange} 
      />
    </div>
  );
}

export default Index;
