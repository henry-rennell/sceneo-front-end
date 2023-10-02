import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";
import SmallGig from "../SmallGig";
import SavedGigs from "../SavedGigs";
import SessionContext from "../../contexts/SessionContext";
import "../CSS/UserPage.css"

export default function UserPage() {
    const params = useParams();
    const [username, setUserName] = useState('');
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { session, setSession } = useContext(SessionContext);

    useEffect(()=> {
        setUserName(params.username)
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${params.username}`)
            .then(res => setPosts(res.data))
            .then(setIsLoading(false))
        }, [])
    
    if(isLoading) {
        return (
            <h1>Bear with us... we are loading</h1>
        )
    }

    if(!isLoading) {
        return (
            <>
                <h1>{username}</h1>
                <h2>{session !== null && session.username === username? 'Your Posts:': `${username}'s posts`}</h2>
                <div className="page">
                    <div className="posted-gigs">
                        {posts.length === 0? (<h2> Looks like you havent posted any gigs... <Link to="/gigs/new">would you like to?</Link></h2>) : posts.map((post, index) => {
                            return (
                                        <SmallGig 
                                            gig={post} 
                                            key={`posted gig, ${post.gig_id}`} 
                                        />
                                        )
                                    })
                                    
                                    
                                }
                    </div>

                {/* {
                    session !==null && session.username === params.username? <div className="saved-gigs-container">
                        <h2>Saved Gigs:</h2>
                        <SavedGigs user_id={session.user_id} />

                    </div> : null
                } */}
                    
                </div>

            </>
        )
    }
}
