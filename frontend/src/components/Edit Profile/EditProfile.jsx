import "../../styles/home.css"
import "./EditProfile.css"
import Navbar from '../Navbar/Navbar'
import Header from '../mobileNav/Header'
import BottomNav from '../mobileNav/BottomNav'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultUser from "../../images/user-default-avatar.png"
import { BiErrorAlt } from 'react-icons/bi'
import { LoadUser, UpdateProfile } from "../../Actions/User"
import { errorToast } from "../../Toasts/error"
import { successToast } from "../../Toasts/success"
import { ToastContainer } from "react-toastify"

const EditProfile = () => {
   const [avatar, setAvatar] = useState(null)
   const { user, loading, iserror, message } = useSelector((state) => state.user)
   const initialValues = { email: `${user.email}`, name: `${user.name}`, username: `${user.username}` };
   const [formValues, setFormValues] = useState(initialValues);
   const { email, name, username } = formValues
   const [formErrors, setFormErrors] = useState({})
   const [formChanged, setFormChanged] = useState(false);
   const iconref = useRef({})
   const dispatch = useDispatch()
   useEffect(() => {
      const isFormChanged =
         name !== user.name ||
         email !== user.email ||
         username !== user.username ||
         avatar;

      setFormChanged(isFormChanged);

      if (iserror) {
         errorToast(iserror);
         setTimeout(() => {
            dispatch({
               type: "ClearError"
            })
         }, 1000);
      }

      if (message) {
         successToast(message);
         setTimeout(() => {
            dispatch({
               type: "ClearSuccess"
            })
         }, 1000);
      }
   }, [
      name, email, username, avatar, iserror, message, dispatch,
      user.name, user.email, user.username
   ]);


   const handleChange = (e) => {
      const { name, value } = e.target;
      const newValues = { ...formValues, [name]: value }
      setFormValues(newValues)
      const newErrors = validate(name, value)
      setFormErrors({ ...formErrors, ...newErrors })
   }

   const handleImageChange = (e) => {
      const file = e.target.files[0]
      const Reader = new FileReader();

      Reader.onload = () => {
         if (Reader.readyState === 2) {
            setAvatar(Reader.result)
         }
      }

      Reader.readAsDataURL(file);
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(UpdateProfile(name, email, username, avatar))
      dispatch(LoadUser())
   }

   const validate = (inputName, inputValue) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const usernameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
      const nameRegex = /^[a-zA-Z\s]*$/;
      const errors = {};

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
            if (inputValue.trim().length < 3) {
               errors.name = "Name must contain at least 3 Characters";
               iconref.current['name'].style.display = 'block';
            } else if (!nameRegex.test(inputValue)) {
               errors.name = 'Invalid name format!';
               iconref.current['name'].style.display = 'block';
            }
            else {
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
         default:
            break;
      }
      return errors;
   }

   return (
      <>
      <ToastContainer/>
         <div className="App">
            <div className='main d-flex'>
               <Navbar />
               <Header />
               <div className='content-section d-flex'>
                  <div className="edit-profile-section w-100">
                     <h2>Edit Profile</h2>
                     <div className="edit-profile-form pt-3 d-flex justify-content-center">
                        <form onSubmit={handleSubmit}>
                           <div className="text-center">
                              {
                                 avatar || user?.avatar ?
                                    <div className="d-flex justify-content-center">
                                       <div className="avatar-background-setting" style={{ backgroundImage: `url(${avatar || user?.avatar.url})` }}></div>
                                    </div> :
                                    <img src={DefaultUser} alt="" />
                              }
                              <div className="choose-file pt-2">
                                 <input type="file" className="custom-input-file" accept='image/*'
                                    onChange={handleImageChange} />
                              </div>
                           </div>
                           <div className="form-body edit-profile-body pt-3">
                              <div className="mb-3 input position-relative">
                                 <span className='error-icon position-absolute' ref={el => iconref.current['name'] = el}>
                                    <BiErrorAlt className='text-danger' />
                                 </span>
                                 <label>Name</label>
                                 <input type="text" className="form-control" name='name'
                                    placeholder='Full Name' value={formValues.name} onChange={handleChange} />
                                 <p className=' error-message'>{formErrors.name}</p>
                              </div>
                              <div className="mb-3 input position-relative">
                                 <span className='error-icon position-absolute' ref={el => iconref.current['email'] = el}>
                                    <BiErrorAlt className='text-danger' />
                                 </span>
                                 <label>Email</label>
                                 <input type="text" className="form-control" id="exampleInputEmail1" name='email'
                                    faria-describedby="emailHelp" placeholder='Email' value={formValues.email} onChange={handleChange} />
                                 <p className=' error-message'>{formErrors.email}</p>
                              </div>
                              <div className="mb-3 input position-relative">
                                 <span className='error-icon position-absolute' ref={el => iconref.current['username'] = el}>
                                    <BiErrorAlt className='text-danger' />
                                 </span>
                                 <label>Username</label>
                                 <input type="text" className="form-control" aria-label="Username" name='username'
                                    placeholder='Username' value={formValues.username} onChange={handleChange} />
                                 <p className=' error-message'>{formErrors.username}</p>
                              </div>
                              <div className="text-center pt-2">
                                 <button disabled={loading || !formChanged}
                                    className="btn rounded-5 btn-primary">Edit Profile</button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
               <BottomNav />
            </div >
         </div >
      </>
   )
}

export default EditProfile
