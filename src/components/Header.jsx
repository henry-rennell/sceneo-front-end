import { Link, useNavigate } from "react-router-dom";
import SessionContext from "../contexts/SessionContext";
import SearchBar from "./SearchBar";
import { useContext } from "react";

import "./CSS/Header.css";
import axios from "axios";


export default function Header() {
    const { session, setSession } = useContext(SessionContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        axios.delete('/sessions')
            .then(setSession(null))
            .then(navigate('/'))
    }

    const handleCreateUser = () => {
        navigate(`/create_user`);
    }

    const handleLogIn = () => {
        navigate(`/login`)
    }

    const handleSavedGigs = () => {
        navigate(`/saved`);
    }


    return (
            <header className="top-banner">
                <span className="logo">
                    <Link to="/"><h1>Sceneo</h1></Link>
                </span>
                    
                <div className="login-buttons">
                    {
                        session !==null ? 
                            (<div className="logged-in-buttons">
                                <span className="add-new-gig-button">
                                    <Link to={`/gigs/new`}>Add New Gig</Link>
                                </span>
                                <span className="saved-button" >
                                    <Link to={`/saved`}>Saved Gigs</ Link>
                                </span>
                                
                                <span className="user-page-button">
                                    <Link to={`/user/${session.username}`}>{session.username}</Link>
                                </span>
                                <span className="logout-button" onClick={handleLogOut}>
                                    Log Out
                                </span>
                            </div>) :
                            (<div className="logged-out-buttons">
                                <span className="login-button" onClick={handleLogIn}>Login</span>

                                <span className="create-user-button"onClick={handleCreateUser}>Create Account</span>
                            </div>)
                    
                    }
                </div>
            </header>
    )


}