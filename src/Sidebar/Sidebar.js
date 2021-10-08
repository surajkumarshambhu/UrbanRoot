import React, {useState} from 'react'
import './Sidebar.css';
import { useHistory } from 'react-router';
import HomeIcon from '../Images/home.png'
import * as AiIcons from 'react-icons/ai'
import { IconContext } from 'react-icons/lib';

const ArrowInactiveSvg = <svg className="svg-icon iq-arrow-right arrow-active" width="20" height="20" color='#676E8A' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 15 5 5 5-5"/><path d="M4 4h7a4 4 0 0 1 4 4v12"/></svg>;
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
    const history = useHistory();
    const [active,setActive] = useState(false);
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

    function navigate(){
        localStorage.removeItem('user');
        history.push("/");
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
                        <a href="/Addproduct">- Add Product</a>
                    </div>
                </div>
                <div className="subsDiv">
                    <div onClick={()=>handleLinks(2)} className="hover-class">
                        <div className="sub">
                            <a href="#">
                                <span className="icon"><AiIcons.AiOutlineBook></AiIcons.AiOutlineBook></span>
                                <span style={active === true ? styles.active : styles.notActive}>Catagories</span>
                            </a>
                        </div>
                        <div style={active === true ? styles.active : styles.notActive}>
                            <span className="icon">{ArrowInactiveSvg}</span>
                        </div>
                    </div>
                    <div style={links === 2 ? styles.linkShow : styles.linkHide} className="subLinks">
                        <a href="/Catagories">- List Catagories</a>
                        <a href="/AddCatagories">- Add Category</a>
                    </div>
                </div>
                <div className="subsDiv">
                    <div onClick={()=>handleLinks(2)} className="hover-class">
                        <div className="sub">
                            <a href="#">
                                <span className="icon"><AiIcons.AiFillFileImage></AiIcons.AiFillFileImage></span>
                                <span style={active === true ? styles.active : styles.notActive}>Purchase</span>
                            </a>
                        </div>
                        <div style={active === true ? styles.active : styles.notActive}>
                            <span className="icon">{ArrowInactiveSvg}</span>
                        </div>
                    </div>
                    <div style={links === 2 ? styles.linkShow : styles.linkHide} className="subLinks">
                        <a href="/Getorders">- List Purchase Orders</a>
                        <a href="/Calulatebill">- New Purchase</a>
                    </div>
                </div>
                <div className="noSub">
                    <button className='logout' onClick={()=>navigate()}>
                        <span className="icon"><AiIcons.AiOutlineLogout></AiIcons.AiOutlineLogout></span>
                        <span style={active === true ? styles.active : styles.notActive}>Logout</span>
                    </button>
                </div>
            </div>
        </div>
        </IconContext.Provider>
    );
}
export default Sidebar;