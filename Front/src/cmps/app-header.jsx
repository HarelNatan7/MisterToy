
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"

import { UserMsg } from './user-msg.jsx'
import { LoginSignup } from './login-signup.jsx'
import { userService } from '../services/user.service.js'

export function AppHeader() {

    const [user, setUser] = useState(userService.getLoggedinUser())

    function onChangeLoginStatus(user) {
        setUser(user)
    }
    function onLogout() {
        userService.logout()
            .then(() => {
                setUser(null)
            })
    }

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    const imgUrl = 'logo.png'

    return <header className="app-header full main-layout" >
            <UserMsg />
            <img className='logo' src={require(`../assets/img/${imgUrl}`)} />
            <h1>Mister Toy</h1>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/review">Reviews</NavLink> |
                <NavLink to="/about">About</NavLink> |
                {user && <NavLink to={`/user-details/${user._id}`}>User Details</NavLink>}
            </nav>
            {user ? (
                < section >
                    <h2>Hello {user.fullname}</h2>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
                </section>
            )}
        </header>    
}
