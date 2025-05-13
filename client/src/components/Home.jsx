import React from 'react'
import { useAuth } from '../context/AuthContext'
import UsersReport from '../views/reports/UsersReport';

function Home() {
    const auth = useAuth();

    return (
        <>
            <h1>Welcome {auth.user?.name}!</h1>
            <button onClick={() => auth.logOut()} className="btn-submit">
                logout
            </button>
            <UsersReport /> 
        </>
    )
}

export default Home;