import '../styles/register.css'
import handicraft from '../images/handicraft.png'
import { Link } from 'react-router-dom'


const SignIn = () => {
  return (
    <div className='signin-wrapper'>
      <div className="container">
        <div className="row">
          <div className="col form-image d-flex justify-content-end align-items-center">
            <img src={handicraft} alt="handicraft for signup page" />
          </div>
          <div className="col d-flex align-items-center">
            <form action="" className='container signin-form p-5'>
              <div className="brand text-center">
                <img src='/logo.png' alt="logo" />
              </div>
              <div className="mt-4 form-body">
                <div className="mb-3 input">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' />
                </div>
                <div className="mb-3 input">
                  <input type="password" className="form-control" placeholder='Password' id="exampleInputPassword1" />
                </div>

                <div className='mb-3 forgot-password text-end'>
                  <Link to='/#' className='text-decoration-none link'>
                    <p>Forgot Password?</p>
                  </Link>
                </div>
                <div className="text-center btn-login mb-4">
                  <button type="button" className="btn w-75 rounded-5 btn-primary">Sign In</button>
                </div>
                <div className='text-center new-user'>
                  <h6 className='text-light'>Don't have an account?
                    <span>
                      <Link to='/register' className='text-decoration-none signup-user-link'> Sign up</Link>
                    </span>
                  </h6>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
