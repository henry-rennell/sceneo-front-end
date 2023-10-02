import axios from "axios"
import { useContext, useEffect, useState } from "react"
import SessionContext from "../contexts/SessionContext";
import "./CSS/SaveButton.css"
import SavedGigsContext from "../contexts/SavedGigsContext";



export default function SaveButton({gig_id, user_id}) {
    const [isSaved, setIsSaved] = useState(false);
    const { session, setSession } = useContext(SessionContext);
    const { savedGigs, setSavedGigs } = useContext(SavedGigsContext);


    useEffect(() => {
        if(savedGigs !== null) {
            if(savedGigs.includes(gig_id)) {
                setIsSaved(true)
            }
        }
    }, [])
    
    const handleClick = () => {
        //handling clicking on save button
        if(isSaved) {
            //removing requested gig from saved state
            let gigToBeRemoved = gig_id;

            //creating copy of savedGigs and removing gigToBeRemoved
            let newSavedGigs = [...savedGigs].filter(gig => {
                if(gigToBeRemoved === gig) {
                    return;
                } else {
                    return gig;
                }
            })
            
            //updating savedGigs context to remove requested gig
            setSavedGigs(newSavedGigs)

            //if saved => unsave it
            setIsSaved(false)
            axios.delete(`${process.env.API_ENDPOINT}/users/saved/${gig_id}/${user_id}`)


        } else if (!isSaved) {
            //if not saved => save it
            setIsSaved(true);

            axios.post(`${process.env.API_ENDPOINT}/users/saved/${gig_id}/${user_id}`)

            let newSavedGigs = [...savedGigs, gig_id];

            setSavedGigs(newSavedGigs);
        }

    }
    
    return (
        <div className={"save-button" +( isSaved? " saved" : "")} onClick={handleClick}>
            {isSaved? 'unsave' : 'save'}
        </div>
    )
}