import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import "./CSS/ProfilePicture.css"
import axios from "axios";


export default function ProfilePicture ({ username }) {
    const [url, setUrl] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${process.env.API_ENDPOINT}/image/profile_picture/${username}`)
            .then(res => setUrl(res.data))
    }, [])

    const handleClick = () => {
        navigate(`/user/${username}`);
    }

        return (
            <div className="profile-picture-bar rounded-borders">
                <span className="image">
                    <img src={url} alt="profile picture" onClick={handleClick} />
                </span>
                <span>
                    <h4 className="profile-link">
                        <Link to={`/user/${username}`}>{username}</Link>
                    </h4>
                </span>
            </div>
        )


}