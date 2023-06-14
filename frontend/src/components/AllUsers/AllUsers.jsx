import "../AllUsers/Allusers.css"
import { Link } from 'react-router-dom'

const AllUsers = ({ username, userAvatar }) => {
   // const {user} = useSelector((state)=> state.user)
   return (
      <>
         <div className='users d-flex align-items-center mb-3 '>
            <Link to={`/${username}`}>
               <div className='avatar' style=
                  {{
                     backgroundImage: `url(${userAvatar})`,
                     backgroundPosition: 'center',
                     backgroundSize: 'cover'
                  }} >
               </div>
            </Link>
            <div className="username ms-2">
               <Link to={`/${username}`}>
                  <h5>{username}</h5>
               </Link>
               <h6>Follow</h6>
            </div>
         </div>
      </>
   )
}

export default AllUsers
