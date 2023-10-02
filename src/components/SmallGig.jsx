import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SaveButton from './SaveButton';
import SessionContext from '../contexts/SessionContext';
import "./CSS/SmallGig.css"

export default function SmallGig ({ gig }) {
    const [imageUrl, setImageUrl] = useState(null);

    const {session, setSession} = useContext(SessionContext);


    //calling the images route to get presignedURL for image
    useEffect(() => {
        //making a request to get the imageURL
        axios.get(`${process.env.API_ENDPOINT}/image/${gig.username}/${gig.gig_id}`)
            .then(res => {
                if(res.data === 'no images') {
                    setImageUrl('https://placehold.co/600x400')
                } else {
                    setImageUrl(res.data)
                }
            
            })
    }, []);


    return (
        <div className="gig">
            <div className="title">
                <h2><Link to={`/gigs/${gig.gig_id}`}>{gig.title}</Link></h2>
            </div>
            <img src={imageUrl} alt="gig-image"/>
            <div className="under-image-bar">
                <span>
                    { session !== null? 
                        (<SaveButton gig_id={gig.gig_id} user_id={session.user_id} />)
                        :
                        null
                    }
                </span>
                <span><Link to={`/user/${gig.username}`}>{gig.username}</Link></span>

            </div>

            <div className="venue_time">
                <span>{gig.venue_name}</span>

                <span>{gig.date} @ {gig.start_time}</span>
            </div>

            <p>{gig.keywords.join(', ')}</p>
        </div>
    )
}