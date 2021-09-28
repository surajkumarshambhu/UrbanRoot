import React from 'react'
import './Login.css'

function Login() {
    return (
        <div className='login-container'>
            <div className='login-body'>
                 <div className='login-header'>
                     <h2>Sign In</h2>
                     <p>Login to stay connected.</p>
                 </div>
                 <div className='login-form-container'>
                     <form>
                         <div className='form-field'>
                            <div class="floating-label form-group">
                                <input class="floating-input form-control" type="email" placeholder="Email" />
                            </div>
                            <div class="floating-label form-group">
                                <input class="floating-input form-control" type="email" placeholder="Password" />
                            </div>
                            <div class="custom-control custom-checkbox mb-3">
                                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                <label class="custom-control-label control-label-1" for="customCheck1">Remember Me</label>
                            </div>
                         </div>
                         <button>Sign In</button>
                     </form>
                 </div>
            </div>
        </div>
    )
}

export default Login
