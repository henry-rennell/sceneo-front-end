import axios from "axios";
import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import InterestSearch from "../InterestsSearch";
import SessionContext from "../../contexts/SessionContext";

export default function CreateNewGig() {
    const [data, setData] = useState({});
    const { session } = useContext(SessionContext)
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        let fd = new FormData();

        fd.append('image', images)
        fd.append('title', data.title)
        fd.append('description', data.description)
        fd.append('city', data.city)
        fd.append('address', data.address)
        fd.append('artist', data.artist)
        fd.append('start_time', data.start_time);
        fd.append('keywords', data.keywords);
        fd.append('finish_time', data.finish_time)
        fd.append('tickets_link', data.tickets_link)
        fd.append('venue_name', data.venue_name)
        fd.append('date', data.date)
        fd.append('username', session.username)

        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/gigs`, fd)
            .then(res => {
                navigate(`/gigs/${res.data.gig_id}`);
            })
    }
    


    return (
        <div>
            <h1>Enter Gig Details:</h1>
            <form action="">

                <label>Event Title:</label>
                <input 
                    type="text" 
                    onChange={(e) => {
                        setData({...data, title: e.target.value})
                    }}
                />

                <label>Image(s)</label>
                <input type="file" onChange={e => {
                    setImages(e.target.files[0])
                }}/>


                <label >Event Description: </label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setData({...data, description: e.target.value})
                    }} 
                />

                <label>City: </label>
                <input 
                    type="text" 
                    onChange={(e) => {
                        setData({...data, city: e.target.value})
                    }}
                />


                <label htmlFor="">Performing Artist: </label>
                <input 
                    type="text" 
                    onChange={(e) => {
                        setData({...data, artist: e.target.value})
                    }}
                />

                <label>Venue Name: </label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setData({...data, venue_name: e.target.value})
                    }} 
                />

                <label>Address: </label>
                <input 
                    type="text" 
                    onChange={(e) => {
                        setData({...data, address: e.target.value})
                    }}
                />

                <label> Tickets Page: </label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setData({...data, tickets_link: e.target.value})
                    }} 
                
                />

                <label>Date: </label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setData({...data, date: e.target.value})
                    }}
                />

                <label >Start Time: </label>
                <input 
                    type="text" 
                    onChange={(e) => {
                        setData({...data, start_time: e.target.value})
                    }}
                />

                <label>Finish Time: </label>
                <input 
                    type="text" 
                    onChange={(e) => {
                        setData({...data, finish_time: e.target.value})
                    }}
                />

                <p>Enter The Genre(s) of your gig here.</p>
                <InterestSearch setParentData={setData} />

                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}