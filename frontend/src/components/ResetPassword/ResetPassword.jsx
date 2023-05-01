import { useState, useRef } from 'react'
import '../../styles/register.css'
import { Link } from 'react-router-dom';
import { BiErrorAlt } from 'react-icons/bi'
import { useDispatch } from 'react-redux';
import { Resetpassword } from '../../Actions/User';

const ResetPassword = () => {
    const initialValues = { email: "", password: "" };
    const [resetValue, setResetValue] = useState(initialValues);
    const { email } = resetValue
    const [formErrors, setFormErrors] = useState({})
    const iconref = useRef({})
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValues = { ...resetValue, [name]: value }
        setResetValue(newValues);
        const newErrors = validate(name, value)
        setFormErrors({ ...formErrors, ...newErrors })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(resetValue)
        dispatch(Resetpassword(resetValue))
    }

    const validate = (inputName, inputValue) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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
            default:
                break;
        }
        return errors;
    }

    return (
        <>
        <div className='signin-wrapper'>
            <div className="container">
                <div className="row">
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
                                        placeholder='Email' value={resetValue.email} onChange={handleChange} />
                                    <p className=' error-message'>{formErrors.email}</p>
                                </div>
                                <div className="text-center btn-login mb-4 mt-4">
                                    <button
                                        disabled={email ? false : true}
                                        className="btn w-50 rounded-5 btn-primary">Send</button>
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
