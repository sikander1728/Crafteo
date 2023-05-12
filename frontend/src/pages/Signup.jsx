import handicraft from '../images/handicraft.png'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/register.css'
import { useState, useRef } from 'react'
import { BiErrorAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Signupuser } from '../Actions/User'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react'
import { errorToast } from '../Toasts/error'
import { successToast } from '../Toasts/success'

const Signup = () => {
    const initialValues = { email: "", name: "", username: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const { email, name, username, password } = formValues
    const [formErrors, setFormErrors] = useState({})
    const iconref = useRef({})
    const dispatch = useDispatch()
    const { iserror, loading, user } = useSelector((state) => state.user)
    const navigate = useNavigate()


    useEffect(() => {
        if (iserror === 'User Already Exists'
            || iserror === 'This username has already taken'
            || iserror === 'Password must contain at leats 8 charaters, one digit and a special character') {
            errorToast(iserror)
            setTimeout(() => {
                dispatch({
                    type: "ClearError"
                })
            }, 3000);
        }
        if (user === 'User Created Successfully') {
            successToast(user)
            setTimeout(() => {
                // dispatch({
                //     type: "ClearSuccess"
                // })
                navigate('/')
            }, 1000);
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValues = { ...formValues, [name]: value }
        setFormValues(newValues)
        const newErrors = validate(name, value)
        setFormErrors({ ...formErrors, ...newErrors })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Signupuser(formValues))
    }

    const validate = (inputName, inputValue) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
        const usernameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/

        //validating inputs over the case
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
            case 'name':
                if (inputValue.length < 3) {
                    errors.name = "Name must contain at least 3 Characters";
                    iconref.current['name'].style.display = 'block';
                } else {
                    iconref.current['name'].style.display = "none";
                    errors.name = "";
                }
                break;
            case 'username':
                if (!usernameRegex.test(inputValue)) {
                    errors.username = "Invalid username!"
                    iconref.current['username'].style.display = 'block';
                } else {
                    iconref.current['username'].style.display = "none";
                    errors.username = "";
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
            <div className='signin-wrapper'>
                <ToastContainer />
                <div className="container">
                    <div className="row">
                        <div className="col form-image d-flex justify-content-end align-items-center">
                            <img src={handicraft} alt="handicraft for signup page" />
                        </div>
                        <div className="col d-flex align-items-center">
                            <form onSubmit={handleSubmit} className='container signin-form pt-4 pb-4 ps-5 pe-5'>
                                <div className="brand text-center">
                                    <img src='/logo.png' alt="logo" />
                                </div>
                                <div className="mt-4 form-body">
                                    <div className="mb-3 input position-relative">
                                        <span className='error-icon position-absolute' ref={el => iconref.current['email'] = el}>
                                            <BiErrorAlt className='text-danger' />
                                        </span>
                                        <input type="text" className="form-control" id="exampleInputEmail1" name='email'
                                            faria-describedby="emailHelp" placeholder='Email' value={formValues.email} onChange={handleChange} />
                                        <p className=' error-message'>{formErrors.email}</p>
                                    </div>
                                    <div className="mb-3 input position-relative">
                                        <span className='error-icon position-absolute' ref={el => iconref.current['name'] = el}>
                                            <BiErrorAlt className='text-danger' />
                                        </span>
                                        <input type="text" className="form-control" name='name'
                                            placeholder='Full Name' value={formValues.name} onChange={handleChange} />
                                        <p className=' error-message'>{formErrors.name}</p>
                                    </div>
                                    <div className="mb-3 input position-relative">
                                        <span className='error-icon position-absolute' ref={el => iconref.current['username'] = el}>
                                            <BiErrorAlt className='text-danger' />
                                        </span>
                                        <input type="text" className="form-control" aria-label="Username" name='username'
                                            placeholder='Username' value={formValues.username} onChange={handleChange} />
                                        <p className=' error-message'>{formErrors.username}</p>
                                    </div>
                                    <div className="mb-3 input position-relative">
                                        <span className='error-icon position-absolute' ref={el => iconref.current['password'] = el}>
                                            <BiErrorAlt className='text-danger' />
                                        </span>
                                        <input type="password" className="form-control" placeholder='Password' name='password'
                                            id="exampleInputPassword1" value={formValues.password} onChange={handleChange} />
                                        <p className=' error-message'>{formErrors.password}</p>
                                    </div>
                                    <div className='mb-3 policy-text text-center'>
                                        <p>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
                                    </div>
                                    <div className="text-center btn-login mb-4">
                                        <button
                                            disabled={email && name && username && password ? false : loading ? true : true}
                                            className="btn w-75 rounded-5 btn-primary">Sign Up</button>
                                    </div>
                                    <div className='text-center new-user'>
                                        <h6 className='text-light'>Don't have an account?
                                            <span>
                                                <Link to='/' className='text-decoration-none signup-user-link'> Sign In</Link>
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

export default Signup
