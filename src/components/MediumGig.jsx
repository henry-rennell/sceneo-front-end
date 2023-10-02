import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"
import SaveButton from "./SaveButton";
import SessionContext from "../contexts/SessionContext";
import "./CSS/MediumGig.css"

export default function MediumGig({ gig }) {
    const [imageUrl, setImageUrl] = useState(null);
    const { session, setSession } = useContext(SessionContext)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/image/${gig.username}/${gig.gig_id}`)
            .then(res => {
                if(res.data === 'no images') {
                    setImageUrl('http://placehold.co/600x400')
                } else {
                    setImageUrl(res.data)
                }
            })
    }, []);



    return (
        <div className="medium-gig">
            <div className="title">
                <h2><Link to={`gigs/${gig.gig_id}`}>{gig.title}</Link></h2>
            </div>
            <img src={imageUrl} alt="gig-image" />
            <div className="medium-top-row">
                <span>
                { 
                    session !== null? 
                            (<SaveButton gig_id={gig.gig_id} user_id={session.user_id} />)
                        :
                            null
                }
                </span>
                <span className="artists">
                    Acts: {gig.artist}
                </span>
                <span>
                    <Link to={`/user/${gig.username}`}>{gig.username}</Link>
                </span>
            </div>
            <div className="medium-venue-time">
                <span>
                    {gig.venue_name}
                </span>
                <span>
                    {`${gig.date} @ ${gig.start_time}`}
                </span>

                <p>
                    {gig.keywords.join(', ')}
                </p>
            </div>
        </div>
    )
}