import React from 'react'
import { useAuth } from '../context/AuthContext'

function Home() {
    const auth = useAuth();
    return (
        <>
            <h1>Welcome!</h1>
            <button onClick={() => auth.logOut()} className="btn-submit">
                logout
            </button>
        </>
    )
}

export default Home