import '../styles/register.css'
import handicraft from '../images/handicraft.png'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { BiErrorAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { SigninUser } from '../Actions/User'
import { useEffect } from 'react'
import { errorToast } from '../Toasts/error'
import { ToastContainer } from 'react-toastify'
import { successToast } from '../Toasts/success'

const SignIn = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const { email, password } = formValues
  const [formErrors, setFormErrors] = useState({})
  const iconref = useRef({})
  const dispatch = useDispatch()
  const {iserror, message} = useSelector((state) => state.user)

  useEffect(() => {
    if (iserror === 'User Not Found' || iserror === 'Invalid Credentials') {
      errorToast(iserror)
      setTimeout(() => {
          dispatch({
              type: "ClearError"
          })
      }, 3000);
    }
    if(message === 'Signin Successfully'){
      successToast(message)
    //   setTimeout(() => {
    //     dispatch({
    //         type: "ClearSuccess"
    //     })
    // }, 3000);
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValues = { ...formValues, [name]: value }
    setFormValues(newValues);
    const newErrors = validate(name, value)
    setFormErrors({ ...formErrors, ...newErrors })
  }

  const handleSubmit = (e) => {
    if(e.cancelable){
      e.preventDefault();
    }
    dispatch(SigninUser(formValues))
  }

  const validate = (inputName, inputValue) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/

    //Validations
    switch (inputName) {
      case 'email':
        if (!emailRegex.test(inputValue)) {
          errors.email = "Invalid email format!";
          iconref.current['email'].style.display = 'block';
        } else {
          iconref.current['email'].style.display = "none";
          errors.email = "";
        }
        break;
      case 'password':
        if (!passwordRegex.test(inputValue)) {
          errors.password = "Password must contain at least 8 characters, one digit, and a special character ";
          iconref.current['password'].style.display = 'block';
        } else {
          iconref.current['password'].style.display = "none"
          errors.password = "";
        }
        break;
      default:
        break;
    }
    return errors;
  }

  return (
    <>
    {console.log(iserror)}
      <div className='signin-wrapper'>
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col form-image d-flex justify-content-end align-items-center">
              <img src={handicraft} alt="handicraft for signup page" />
            </div>
            <div className="col d-flex align-items-center">
              <form onSubmit={handleSubmit} className='container signin-form p-5'>
                <div className="brand text-center">
                  <img src='/logo.png' alt="logo" />
                </div>
                <div className="mt-4 form-body">
                  <div className="mb-3 input position-relative">
                    <span className='error-icon position-absolute' ref={el => iconref.current['email'] = el}>
                      <BiErrorAlt className='text-danger' />
                    </span>
                    <input type="text" name='email'
                      className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                      placeholder='Email' value={formValues.email} onChange={handleChange} />
                    <p className=' error-message'>{formErrors.email}</p>
                  </div>
                  <div className="mb-3 input position-relative">
                    <span className='error-icon position-absolute' ref={el => iconref.current['password'] = el}>
                      <BiErrorAlt className='text-danger' />
                    </span>
                    <input type="password" name='password' className="form-control" placeholder='Password'
                      id="exampleInputPassword1" value={formValues.password} onChange={handleChange} />
                    <p className='error-message'>{formErrors.password}</p>
                  </div>

                  <div className='mb-3 forgot-password text-end'>
                    <Link to='/accounts/password/reset' className='text-decoration-none link'>
                      <p>Forgot Password?</p>
                    </Link>
                  </div>
                  <div className="text-center btn-login mb-4">
                    <button
                      disabled={email && password ? false : true}
                      className="btn w-75 rounded-5 btn-primary">Sign In</button>
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
    </>
  )
}

export default SignIn
