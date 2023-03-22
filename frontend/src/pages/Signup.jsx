import handicraft from '../images/handicraft.png'
import { Link } from 'react-router-dom'
import '../styles/register.css'
import { useState } from 'react'

const Signup = () => {
    const initialValues = { email: "", name: "", username: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
        console.log(formValues)
    }

    return (
        <div className='signin-wrapper'>
            <div className="container">
                <div className="row">
                    <div className="col form-image d-flex justify-content-end align-items-center">
                        <img src={handicraft} alt="handicraft for signup page" />
                    </div>
                    <div className="col d-flex align-items-center">
                        <form action="" className='container signin-form pt-4 pb-4 ps-5 pe-5'>
                            <div className="brand text-center">
                                <img src='/logo.png' alt="logo" />
                            </div>
                            <div className="mt-4 form-body">
                                <div className="mb-3 input">
                                    <input type="email" className="form-control" id="exampleInputEmail1" name='email'
                                        faria-describedby="emailHelp" placeholder='Email' value={formValues.email} onChange={handleChange} />
                                </div>
                                <div className="mb-3 input">
                                    <input type="text" className="form-control" name='name'
                                        placeholder='Full Name' value={formValues.name} onChange={handleChange} />
                                </div>
                                <div className="mb-3 input">
                                    <input type="text" className="form-control" aria-label="Username" name='username'
                                        placeholder='Username' value={formValues.username} onChange={handleChange} />
                                </div>
                                <div className="mb-3 input">
                                    <input type="password" className="form-control" placeholder='Password' name='password'
                                        id="exampleInputPassword1" value={formValues.password} onChange={handleChange} />
                                </div>
                                <div className='mb-3 policy-text text-center'>
                                    <p>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
                                </div>
                                <div className="text-center btn-login mb-4">
                                    <button type="button" className="btn w-75 rounded-5 btn-primary">Sign Up</button>
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
    )
}

export default Signup
