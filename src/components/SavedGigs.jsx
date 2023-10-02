import axios from "axios";
import { useState, useEffect } from "react";
import SmallGig from "./SmallGig";
import "./CSS/SavedGigs.css"

//saved gigs component for user profile
export default function SavedGigs({ user_id }) {
    const [savedGigs, setSavedGigs] = useState([]);


    useEffect(() => {
        axios.get(`${process.env.API_ENDPOINT}/users/saved/${user_id}`)
            .then(res => setSavedGigs([...res.data]))

    }, [])


    return (
        <div className="saved-gigs">
            {savedGigs.length === 0? (<h2>Looks Like you havent saved anything....</h2>): savedGigs.map((gig, index) => (
                 <SmallGig gig={gig} key={`saved-gig, ${gig.gig_id}`} />
            ))}
        </div>
    )
}