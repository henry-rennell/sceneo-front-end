import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SessionContext = createContext();



export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    //route to get session data and set session state as that data
    //once ONLY when the component is called
    useEffect(() => {
         axios.get('/session')
            .then(res => { 
                if (res.data.session_id) {
                    setSession(res.data)
                }
            })
    }, [])
    

    return (
        <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>
    );
}

export default SessionContext;