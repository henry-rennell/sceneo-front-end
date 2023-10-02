import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import SmallGig from "../SmallGig";
import "../CSS/SearchResultsPage.css"

export default function SearchResultsPage () {
    const params = useParams();
    const [results, setResults ] = useState([]);
    const [parameters, setParameters] = useState({});
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        let { parameter, searchTerm } = params;

        if(params.parameter === 'date') {
            searchTerm = searchTerm.replace(/%2F/g, '/');    
        }

        axios.get(`${process.env.API_ENDPOINT}/gigs/search?${parameter}=${searchTerm}`)
            .then(res => setResults(res.data))
            .then(setIsLoading(false))
            
    }, [params])


    return (
        <>
            <h2>Search Results: </h2>
            {
                isLoading? 
                    (<h3>Loading....</h3>)
                    :
                    (<div className="results">

                    {
                        results.length === 0 && !isLoading? 
                            (<h3>We couldn't find what you were after... Sorry :/</h3>)
                            :
                            (results.map(result => (
                                <SmallGig gig={result} key={result.gig_id}/>
                            )))
                            
                    }
    
                </div>)
            }
            
        </>
    )
}