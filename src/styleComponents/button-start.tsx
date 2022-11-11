import {Link} from "react-router-dom";
import {CSSProperties, useState} from "react";


interface IButtonStartProps {
  label: string,
  linkTo: string,
  image: string,
  description: string,
}

const ButtonStart = ({label, linkTo, image, description}: IButtonStartProps) => {

  const [hovered, setHovered] = useState(false)

  const styles = {
    link: {
      color: "#000000",
      backgroundColor: `${hovered ? "var(--main-color)" : "var(--main-color-bright)"}`,
      width: "230px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column" as const,
      alignItems: "center",
      borderRadius: "30px",
      padding: "16px 32px",
      gap: "8px",
      textDecoration: "none",
      ':active': {
        color: '#000000 !important'
      }
    },
    image: {
      height: "100px"
    },
    label: {
      textAlign: "center" as const,
      fontSize: "1.3em",
      fontWeight: "bold",
    },
    description: {
      textAlign: "center" as const,
    }
  };


  return (
    <Link to={linkTo}
          style={styles.link}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>

      <img
        src={image}
        alt={label}
        title={label}
        style={styles.image}/>
      <div style={styles.label}>{label}</div>
      <div style={styles.description}>{description}</div>

    </Link>
  )
}

export default ButtonStart