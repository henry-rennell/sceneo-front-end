import { useEffect, useState, useContext } from 'react';
import SmallGig from '../SmallGig';
import MediumGig from '../MediumGig';
import axios from 'axios';
import SessionContext from '../../contexts/SessionContext';
import "../CSS/HomePage.css"


export default function HomePage() {
    const [results, setResults] = useState([]);
    const [request, setRequest] = useState('default');
    const { session } = useContext(SessionContext)
    //useEffect in order to run this routine once when component mounts
    useEffect(() => {
        //getting data
        if(request === 'default') {
            axios.get(`${process.env.API_ENDPOINT}/gigs/all`)
            //setting results state with the array of objects returned
            .then(res => setResults(res.data))
        } else if (request === 'interests') {
            axios.get(`${process.env.API_ENDPOINT}/gigs/interests/${session.username}`)
            //setting results state with the array of objects returned
            .then(res => setResults(res.data))
        }

    }, [request]);

    const handleAllGigs = () => {
        setRequest('default')
    }
    
    const handleInterests = () => {
        setRequest('interests')
    }
    
    return (
        <div className="home-page">

            {session !== null ? 
                (<div className="gig-buttons">
                    <span 
                        className={"gig-button" + (request === 'default'? ' selected' : '')}
                        onClick={handleAllGigs}> 
                        All Gigs 
                    </span>
                    <span
                        className={"gig-button" + (request === 'interests'? ' selected' : '')} 
                        onClick={handleInterests}>
                            My Interests 
                    </span>
                </div>)
                
                : 

                (<h1>All Gigs: </h1>)
                
            }
            
            <div className="gigs">
                {/* mapping each gig to a Small Gig component */}
                
                {results.map(gig => {
                  return (
                        <MediumGig gig={gig} key={gig.gig_id} />
                    )
                })}

            </div>
        </div>
    )

}