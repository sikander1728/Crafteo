import './bottomnav.css'
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { HiShoppingCart } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'


const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <div className="row nav-menu">
         <div className="col d-flex align-items-center">
         <ul className='list-unstyled w-100 d-flex justify-content-evenly'>
          <li>
            <Link to='/' className='text-light text-decoration-none'>
              <AiFillHome  className='bottom-nav-icon'/>
            </Link>
          </li>
          <li>
            <Link to='/' className='text-light text-decoration-none'>
              <AiOutlineSearch  className='bottom-nav-icon'/>
            </Link>
          </li>
          <li>
            <Link to='/' className='text-light text-decoration-none'>
              <HiShoppingCart  className='bottom-nav-icon'/>
            </Link>
          </li>
          <li>
            <Link to='/' className='text-light text-decoration-none'>
              <Avatar className='bottom-nav-icon'/>
            </Link>
          </li>
        </ul>
         </div>
      </div>
    </div>
  )
}

export default BottomNav
