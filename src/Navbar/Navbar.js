import './Navbar.css';
import * as AiIcons from 'react-icons/ai'
import UserIcon from '../Images/user_icon.png'
import { IconContext } from 'react-icons/lib';

const Navbar = () =>{
    return(
        <IconContext.Provider value={{ color: '#666E8A',size: '20px' }}>
        <div id="navbar">
            <div>
          
            </div>
            <div className='nav-content'>
                <button>
                    <div>
                        <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                        <span>New Order</span>
                    </div>
                </button>
                <AiIcons.AiOutlineNotification></AiIcons.AiOutlineNotification>
                <AiIcons.AiOutlineMail></AiIcons.AiOutlineMail>
                <img src={UserIcon} alt="UserIcon"></img>
            </div>
        </div>
        </IconContext.Provider>
    );
}
export default Navbar;