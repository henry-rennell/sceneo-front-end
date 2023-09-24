import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/SearchBar.css"


export default function SearchBar() {
    const [search, setSearch] = useState(''); 
    const [parameter, setParameter] = useState('title');
    const [message, setMessage] = useState('Search')

    const navigate = useNavigate();
    

    const handleSubmit = () => {
        if (parameter === 'date') {
            let newString = search.replace(/\//g, '%2F')
            setSearch('')
            return navigate(`/search/${parameter}/${newString}`)
        } else {
            navigate(`/search/${parameter}/${search}`);
            setSearch('')
        }
    }

    useEffect(() => {
        if (parameter === 'date') {
            setMessage('DD/MM/YYYY')
        } else {
            setMessage('Search')
        }

    }, [parameter])


    return (
        <div className="searchBar">
                <div className="options">
                    <span 
                        className={"option " + (parameter === 'title'? 'selected' : '')}
                        onClick={e => {setParameter('title')}}>
                            Title
                    </span>
                    <span 
                        className={'option  ' + (parameter === 'artist'? 'selected' : '')}
                        onClick={e => {setParameter('artist')}}>
                            Artist
                    </span>
                    <span 
                        className={'option ' + (parameter === 'keywords'? 'selected' : '')}
                        onClick={e => {setParameter('keywords')}}>
                            Genre
                    </span>
                    <span
                        className={'option ' + (parameter === 'date'? 'selected' : '')} 
                        onClick={e => {setParameter('date')}}>
                            Date
                    </span>
                    <span
                        className={'option ' + (parameter === 'city'? 'selected' : '')} 
                        onClick={e => {setParameter('city')}}>
                            City
                    </span>
                    <span 
                        className={"option " + (parameter === 'venue_name'? 'selected' : '')}
                        onClick={e => {setParameter('venue_name')}}>
                            Venue Name
                    </span>
                </div>
                <div className="input">
                    <input type="text" placeholder={message} value={search} onChange={e => {setSearch(e.target.value)}}/>
                    <span className="search-button" onClick={handleSubmit}> Search </span>
                </div>

        </div>
    )
}