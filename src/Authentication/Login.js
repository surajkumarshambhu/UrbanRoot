import React from 'react'
import './Login.css'
import logo from '../Images/logo.png'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { ApiHelper } from '../Helper/APIHelper';

function Login() {

    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    function submit(e){
        setLoader(true)
        e.preventDefault()
        const postData = 
        {
            request: {
                email:  formData.email,
                password: formData.password,
            }
        }
        let url = "admin-login";
        ApiHelper(url,postData,'POST')
        .then(resposnse => {
            if (resposnse.success === false){
                setLoader(false)
            }
            else{
                localStorage.setItem('user', JSON.stringify(resposnse));
                history.push("/dashboard");
                setLoader(false)
            }
        })
    }

    function handle(e){
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    return (
        <div className='login-container'>
            <div className='login-body cardboxshadows'>
                 <div className='login-form-container'>
                    <div className='login-header'>
                        <h2>Sign In</h2>
                        <p>Login to stay connected.</p>
                    </div>
                     <form onSubmit={(e) => submit(e)}>
                         <div className='form-field'>
                            <div className='form-group-col'>
                                <input className="form-control" type="email" placeholder="Email" id = 'email'  onChange={(e) => handle(e)} value={formData.email}/>
                            </div>
                            <div className='form-group-col'>
                                <input className="form-control" type="password" placeholder="Password" id = 'password'  onChange={(e) => handle(e)} value={formData.password}/>
                            </div>
                            <div>
                                <input type="checkbox"  id="customCheck1" />
                                <label  for="customCheck1">Remember Me</label>
                            </div>
                         </div>
                         <button type='submit' className='btn' disabled={loader}>
                                {
                                    loader === true ? <Loader type="Circles" color="#ff" height={20} width={20}  /> : ""
                                }
                                {
                                    (loader) === true ? "Loading..." : "Sign In"
                                }
                          </button>
                     </form>
                 </div>
                 <div className="logo-container">
                     <img src={logo} alt='logo'></img>
                 </div>
            </div>
        </div>
    )
}

export default Login
