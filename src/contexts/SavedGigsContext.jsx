import { useContext, useState, createContext, useEffect } from "react";
import SessionContext from "./SessionContext";
import axios from "axios";

const SavedGigsContext = createContext();


export function SavedGigsProvider({ children }) {
    const [savedGigs, setSavedGigs] = useState(null);
    const {session, setSession } = useContext(SessionContext);

    useEffect(() => {
        if(session !== null) {
            axios.get(`${process.env.API_ENDPOINT}/users/saved/${session.user_id}`)
                .then(res => {
                    let ids = res.data.map(gig => {
                        return gig.gig_id
                })
                    setSavedGigs([...ids]);
                })
        }
    }, [session])


    return(
        <SavedGigsContext.Provider value={{savedGigs, setSavedGigs }}>{children}</SavedGigsContext.Provider>
    );


}

export default SavedGigsContext;