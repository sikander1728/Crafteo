import '../../styles/register.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { BiErrorAlt } from 'react-icons/bi'
import { errorToast } from '../../Toasts/error'
import { successToast} from '../../Toasts/success'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, verifyLink } from '../../Actions/User'
import axios from 'axios'
axios.defaults.withCredentials = true

const ResetPassword = () => {
  const initialValues = { password: "", againpassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const { password, againpassword } = formValues
  const [formErrors, setFormErrors] = useState({})
  const [confirmPassword, setConfirmPassword] = useState("")
  const iconref = useRef({})
  const { id, token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { linkerror, iserror, resetmessage } = useSelector((state) => state.user)

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValues = { ...formValues, [name]: value }
    setFormValues(newValues);
    const newErrors = validate(name, value)
    setFormErrors({ ...formErrors, ...newErrors })
  }

  useEffect(() => {
    if (iserror) {
      errorToast(confirmPassword)
    }
    setTimeout(() => {
      dispatch({
        type: "ClearError"
      })
    }, 1000);
    dispatch(verifyLink(id, token))
    if (linkerror) {
      navigate('*')
    }
    if(resetmessage){
      successToast(resetmessage)
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
  }, [confirmPassword, dispatch, id, token, navigate, linkerror, iserror, resetmessage])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password, againpassword)
    if (password !== againpassword) {
      setConfirmPassword("Password do not match")
    }
    dispatch(resetPassword(formValues, id, token))
  }

  const validate = (inputName, inputValue) => {
    const errors = {};
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/

    //Validations
    switch (inputName) {
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
      <ToastContainer />
      <div className='signin-wrapper'>
        {console.log(confirmPassword)}
        <div className="container">
          <div className="row">
            <div className="col d-flex align-items-center">
              <form onSubmit={handleSubmit} className='container signin-form p-5'>
                <div className="brand text-center">
                  <img src='/logo.png' alt="logo" />
                </div>
                <div className=" form-body">
                  <div className="mb-3 input position-relative">
                    <span className='error-icon position-absolute' ref={el => iconref.current['password'] = el} style={{ paddingInlineEnd: '40px' }}>
                      <BiErrorAlt className='text-danger' />
                    </span>
                    <input type="password" name='password' className="form-control" placeholder='New Password'
                      value={formValues.password} onChange={handleChange} />
                    <p className='error-message'>{formErrors.password}</p>
                  </div>
                  <div className="mb-4 input position-relative">
                    <span className='error-icon position-absolute' ref={el => iconref.current['againpassword'] = el}>
                      <BiErrorAlt className='text-danger' />
                    </span>
                    <input type="password" name='againpassword' className="form-control" placeholder='Re-enter New Password'
                      value={formValues.againpassword} onChange={handleChange} />
                    <p className='error-message'>{formErrors.againpassword}</p>
                  </div>

                  <div className="text-center btn-login mb-4">
                    <button
                      disabled={password && againpassword ? false : true}
                      className="btn w-75 rounded-5 btn-primary">Reset Password</button>
                  </div>
                  <div className='text-center new-user'>
                    <span>
                      <Link to='/' className='text-decoration-none signup-user-link'> Back to Login</Link>
                    </span>
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

export default ResetPassword
