import React from 'react'

import './headerNav.css'

const HeaderNav = ({ changeRoute, isSignedIn }) => {
    if(isSignedIn){
        return (
            <nav className="Header">
                <span onClick={ changeRoute.bind(null, 'signin')} className="f3 link dim black underline pa3 pointer">
                    Sign Out
                </span>
            </nav>
        )
    } else {
        return (
            <nav className="Header">
                <span onClick={ changeRoute.bind(null, 'signin')} className="f3 link dim black underline pa3 pointer">
                    Sign In
                </span>
                <span onClick={ changeRoute.bind(null, 'register')} className="f3 link dim black underline pa3 pointer">
                    Register
                </span>
        </nav>
        )
    }
    
}

export default HeaderNav