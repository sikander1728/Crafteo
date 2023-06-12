import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Actions/User';
import AllUsers from '../components/AllUsers/AllUsers';
import BottomNav from '../components/mobileNav/BottomNav';
import Header from '../components/mobileNav/Header';
import Navbar from '../components/Navbar/Navbar';
import '../styles/home.css'
import Defaultavatar from "../images/user-default-avatar.png"

const Home = () => {
    const { users } = useSelector((state) => state.allUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className="App">
            <div className='main d-flex'>
                <Navbar />
                <Header />
                <div className='content-section d-flex'>
                    <div className="posts-section">
                        <h1>sikander</h1>
                    </div>
                    <div className="suggested-users-section">
                        {
                            users && users.length > 0 ? users.map((user) => {
                                return <AllUsers userAvatar={user?.avatar ? user.avatar.url : Defaultavatar}
                                    username={user.username} />
                            }) : <h4>No Users Yet</h4>
                        }

                    </div>
                </div>
                <BottomNav />
            </div>
        </div>
    )
}

export default Home