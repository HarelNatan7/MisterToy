
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"

import { UserMsg } from './user-msg.jsx'

export function AppHeader() {


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
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>    
}
