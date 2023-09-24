
import { useContext, useEffect, useState } from "react";
import SessionContext from "../../contexts/SessionContext";
import SavedGigs from "../SavedGigs";
import "../CSS/SavedGigsPage.css"

export default function SavedGigsPage() {
    const {session, setSession} = useContext(SessionContext);
    
    return (
        <>
        {session!==null && session.username?

            (<>
            <h2>My Saved Gigs:</h2>
            <div className="saved-gigs-container">
                <SavedGigs user_id={session.user_id} />
            </div>
            </>)
            : 
            (<h2>You're Gonna Have to log in to save gigs...</h2>)

        }
        </>
    )
}