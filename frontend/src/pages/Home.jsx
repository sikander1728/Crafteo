import React from 'react'
import BottomNav from '../components/mobileNav/BottomNav';
import Header from '../components/mobileNav/Header';
import Navbar from '../components/Navbar/Navbar';
import '../styles/home.css'

const Home = () => {
    return (
        <div className="App">
            <div className='main d-flex'>
                <Navbar/>
                <Header/>
                <div className='content-section'>
                    <div className="content">
                        <h1>sikander</h1>
                    </div>
                </div>
                <BottomNav/>
            </div>

        </div>
    )
}

export default Home
