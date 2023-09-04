import "../AllUsers/Allusers.css"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { folloUnfollow } from "../../Actions/User"
import DefaultUser from '../../images/user-default-avatar.png'

const AllUsers = ({ username, userAvatar, userId}) => {
   const dispatch = useDispatch();

   const followhandler = () => {
      dispatch(folloUnfollow(userId))
   }

   return (
      <>
         <div className='users d-flex align-items-center mb-3 '>
            <Link to={`/${username}`}>
               <div className='avatar' style=
                  {{
                     backgroundImage: `url(${userAvatar ? userAvatar : DefaultUser})`,
                     backgroundPosition: 'center',
                     backgroundSize: 'cover'
                  }} >
               </div>
            </Link>
            <div className="username ms-2">
               <Link to={`/${username}`}>
                  <h5>{username}</h5>
               </Link>
               {userId? <h6 style={{cursor: 'pointer'}} onClick={followhandler}>Follow</h6> : null}
            </div>
         </div>
      </>
   )
}

export default AllUsers
