import { MdError } from "react-icons/md";
import { MdCheck } from "react-icons/md";

const Alert = (props) => {
    return (
        <div className={props.class}>
            {props.icon==="success" ? <MdCheck color= "#61de61" fontSize="20px"/> : <MdError color="#ff6666" fontSize="20px"/>}
            <p>{props.text}</p>
        </div>
    );
  }
  
export default Alert;
  