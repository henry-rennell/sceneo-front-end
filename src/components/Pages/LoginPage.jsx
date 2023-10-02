import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SessionContext from "../../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginPage.css"

export default function LoginPage () {
    const { session, setSession } = useContext(SessionContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = e => {
        e.preventDefault();
        
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/sessions`, { username, password })
            .then(res => {
                if (res.data.username) {
                    setSession(res.data)
                } else {
                    setMessage(res.data)
                }
            })

    }

    useEffect(() => {
        if(session !== null) {
            navigate(`/`);
        }
    }, [session])

    return (
        <>
            <h3> Login: </h3>
            <form action="">
                <div className="inputs">
                    <p>Username / Email: </p>
                    <input type="text" onChange={(e) => setUsername(e.target.value)}/>

                    <p>Password: </p>
                    <input autoComplete="none" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                


                <div className="logon-button" onClick={handleSubmit}>
                    <span>Log in</span>
                </div>

                <p>{message}</p>
            </form>

        
        </>
    ) 
}