import { useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/CreateNewUserPage.css';
import '../InterestsSearch'
import axios from "axios";
import InterestSearch from "../InterestsSearch";
import SessionContext from "../../contexts/SessionContext";


export default function CreateUserPage () {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState('individual');
    const [accountData, setAccountData] = useState({});
    const [pWordMatch, setPWordMatch] = useState(true);
    const [submitted, setSubmitted] = useState(false)
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [validated, setValidated] = useState(true);
    const [messageOnSubmit, setMessageOnSubmit] = useState('');
    const [image, setImage] = useState(null);
    const { session, setSession } = useContext(SessionContext)

    useEffect(() => {
        if(submitted) {
            passwordConfirmation === accountData.password? setPWordMatch(true) : setPWordMatch(false);

        }
    }, [submitted])



    useEffect(() => {
        setAccountData({...accountData, account_type: 'individual'})
    }, [])

    const handlePasswordConfirmation = e => {
        setPasswordConfirmation(e.target.value);
        if(accountData.password && e.target.value === accountData.password) {
            setPWordMatch(true);
        } else {
            setPWordMatch(false);
        }

    }

    const handleSubmit = e => {
        e.preventDefault();

        let fd = new FormData();

        fd.append('image', image)
        fd.append('email', accountData.email)
        fd.append('username', accountData.username)
        fd.append('city', accountData.city)
        fd.append('password', accountData.password)
        fd.append('account_type', accountType)
        fd.append('user_name', accountType === 'artist'? accountData.user_name : null)
        fd.append('interests', accountData.keywords);

        axios.post(`${process.env.API_ENDPOINT}/users`, fd)
            .then(res => {
                if(res.data.response === 200) {
                    axios.post(`${process.env.API_ENDPOINT}/sessions`, 
                    {
                        username: accountData.username,
                        password: accountData.password
                    }).then(response =>{
                        if(response.data.session_id) {
                            setSession(response.data)
                            navigate(`/user/${response.data.username}`);
                        }
                    })
                }
                console.log(res.data)
            
            })
            .catch(err => {
                if (err.response.data.error) {
                    let message = err.response.data.error.message
                    if (message.includes('duplicate')) {
                        setMessageOnSubmit('Error, that username / email already exists')
                    } else if (message === 'no image uploaded') {
                        setMessageOnSubmit('Please Include an image!')
                    }
                }
            })
    }

    return (
        <>
        <div className="create-user">

            <h1>Create New User</h1>

            <h3>Which of these best describes you?</h3>
            <div className="account-type-selections">
                <span 
                    className={"account-type-button" + (accountType === 'individual'? " selected" : "")}
                    value="individual" 
                    onClick={() => {
                        setAccountType('individual')
                        setAccountData({...accountData, account_type: 'individual'})
                    }}
                >Individual  
                </span>
                <span 
                    className={"account-type-button" + (accountType === 'artist'? " selected" : "")}
                    value="artist" 
                    onClick={() => {
                        setAccountType('artist')
                        setAccountData({...accountData, account_type: 'artist'})
                    }}
                >Artist  
                </span>
                <span 
                    className={"account-type-button" + (accountType === 'venue'? " selected" : "")}
                    value="venue" 
                    onClick={() => {
                        setAccountType('venue')
                        setAccountData({...accountData, account_type: 'venue'})
                    }}
                >Venue  
                </span>

            </div>

            <form action="">
                <label>Email: </label>
                <input type="text" onChange={e => {
                    setAccountData({...accountData, email: e.target.value })
                }}/>
                <label>Username: </label>
                <input type="text" onChange={e => {
                    setAccountData({...accountData, username: e.target.value })
                }}/>
                <label>City: </label>
                <input type="text" onChange={e => {
                    setAccountData({...accountData, city: e.target.value })
                }}/>
                <label className={accountType === 'artist'? '' : 'invisible'}>Artist / Group Name</label>
                <input type="text" className={accountType === 'artist'? '': ' invisible' } onChange={e => {
                    setAccountData({...accountData, user_name: e.target.value })
                }}/>

                <label>Profile Picture</label>
                <input type="file" onChange={e => {
                    setImage(e.target.files[0])
                }}/>

                <label>Password: </label>
                <input type="password" autoComplete="off" onChange={e => {
                    setAccountData({...accountData, password: e.target.value})
                }}/>

                <label>Confirm Password: </label>
                <input type="password" autoComplete="off" onChange={handlePasswordConfirmation}/>


                <p className="message">{pWordMatch? '': 'Passwords Do Not Match !'}</p>
                <p>{messageOnSubmit}</p>

                <p>Enter your Interests in Genres Below! Just click an interest if you need to remove it.</p>
                <InterestSearch setParentData={setAccountData}/>
                

                <div className="submit_button" onClick={handleSubmit}>Submit</div>
            </form>
            
        </div>
        </>
    )
}