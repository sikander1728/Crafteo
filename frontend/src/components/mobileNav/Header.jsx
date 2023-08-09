import React from 'react'
import './Header.css'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='mobile-header'>
      <div className="row brand d-flex align-items-center">
        <div className='col ps-3'>
          <a href="/">
            <img src="/logo.png" alt="crafteo_logo" />
          </a>
        </div>
        <div className="col pe-3">
          <div className="nav-items d-flex justify-content-end">
            <Link to='/create-new-post'>
              <BiMessageSquareAdd className='nav-icons text-light me-3' />
            </Link>
            <Link to='/'>
              <AiOutlineHeart className='nav-icons text-light' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
