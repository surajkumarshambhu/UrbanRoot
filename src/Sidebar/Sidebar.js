import './Sidebar.css';
import {useState} from 'react';
import HomeIcon from '../Images/home.png'
import * as AiIcons from 'react-icons/ai'
import { IconContext } from 'react-icons/lib';

const ArrowInactiveSvg = <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" color='#676E8A' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 15 5 5 5-5"/><path d="M4 4h7a4 4 0 0 1 4 4v12"/></svg>;
// const ArrowActiveSvg = <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" color='#676E8A' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 15 5 5 5-5"/><path d="M4 4h7a4 4 0 0 1 4 4v12"/></svg>;

const styles={
    active:{
        
    },
    notActive:{
        display: "none",
    },
    linkShow:{
        height: "100%", 
        opacity: "1",
        padding: "8px",
    },
    linkHide:{
        opacity: "0",
        height: "0", 
        padding: "0",
        visbility: "hidden",
        cursor: "not-allowed",
        width: "0",
        display: "none"
    },
}

const Sidebar = () =>{
    const [active,setActive] = useState(true);
    const [links,showLinks] = useState(0);
    const handleActive = () =>{
        const act = !active;
        showLinks(0);

        setActive(act);
    }
    const handleLinks = (key) =>{
        if(active === false){
            const act = !active;
            setActive(act);
        }
        if(key === links){
            showLinks(0);
        }
        else{
            showLinks(key);
        }
        
    }
    return(
        <IconContext.Provider value={{ color: '#666E8A',size: '25px' }}>
        <div id="sidebar" className={active === true ? "active" : "notActive"}>
            <div>
                <span  className="icon" onClick={handleActive}>
                    <img src={HomeIcon} alt='HomeIcon' />
                </span>
                <h3 style={active === true ? styles.active : styles.notActive}>Urban ROOT</h3>
                <span style={active === true ? styles.active : styles.notActive} className="icon" onClick={handleActive}><AiIcons.AiOutlineBars></AiIcons.AiOutlineBars></span>
            </div>
            <div className="links">
                <div className="noSub">
                    <a href="/Dashboard">
                        <span className="icon"><AiIcons.AiOutlineDashboard></AiIcons.AiOutlineDashboard></span>
                        <span style={active === true ? styles.active : styles.notActive}>Dashboard</span>
                    </a>
                </div>
                <div className="subsDiv">
                    <div onClick={()=>handleLinks(1)} className="hover-class">
                        <div className="sub">
                            <a href="#">
                                <span className="icon"><AiIcons.AiOutlineShoppingCart></AiIcons.AiOutlineShoppingCart></span>
                                <span style={active === true ? styles.active : styles.notActive}>Products</span>
                            </a>
                        </div>
                        <div style={active === true ? styles.active : styles.notActive}>
                            <span className="icon">{ArrowInactiveSvg}</span>
                        </div>
                    </div>
                    <div style={links === 1 ? styles.linkShow : styles.linkHide} className="subLinks">
                        <a href="/Productlist">- List Product</a>
                        <a href="#">- Add Product</a>
                    </div>
                </div>
                <div className="subsDiv">
                    <div onClick={()=>handleLinks(2)} className="hover-class">
                        <div className="sub">
                            <a href="#">
                                <span className="icon"><AiIcons.AiOutlineBook></AiIcons.AiOutlineBook></span>
                                <span style={active === true ? styles.active : styles.notActive}>Categories</span>
                            </a>
                        </div>
                        <div style={active === true ? styles.active : styles.notActive}>
                            <span className="icon">{ArrowInactiveSvg}</span>
                        </div>
                    </div>
                    <div style={links === 2 ? styles.linkShow : styles.linkHide} className="subLinks">
                        <a href="#">- List Categories</a>
                        <a href="#">- Add Category</a>
                    </div>
                </div>
            </div>
        </div>
        </IconContext.Provider>
    );
}
export default Sidebar;