import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";
import axios from "axios";
import SessionContext from "../../contexts/SessionContext";
import "../CSS/GigPage.css"


export default function GigPage() {
    const navigate = useNavigate();
    //obtaining session details
    const { session } = useContext(SessionContext)
    const params = useParams();
    const [data, setData] = useState(null);
    const [isEditing, setIsEditing ] = useState(false);
    const [editedData, setEditedData] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);
    const [isImageDeleted, setIsImageDeleted ] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        //if condition that states if both session and data are not null, and the user is the account that posted the gig.
        if(session !== null && data !== null && data.username === session.username) {
            setIsAuthor(true)
        }

    }, [session, data])


    const handleEdit = () => {
        // if (isAuthor) {
            setIsEditing(true);
            setEditedData({...data})
        // }
    }

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/gigs/${data.username}/${data.gig_id}`)
        navigate(`/user/${session.username}`)
    
    }

    const handleDeleteImage = () => {
        setIsImage(false);
        setIsImageDeleted(true)
        axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/images/${editedData.username}/${editedData.gig_id}`)
        navigate('/')

    }

    const fd = new FormData();

    const handleSave = e => {
        e.preventDefault();

        const imageFormData = new FormData();

        imageFormData.append("image", image)

        fd.append('title', editedData.title);
    
        fd.append('start_time', editedData.start_time);
        fd.append('artist', editedData.artist);
        fd.append('address', editedData.address);
        
        setData({...editedData})
        setIsEditing(false)

        axios.put(`${process.env.REACT_APP_API_ENDPOINT}/gigs/${editedData.gig_id}/edit`, {...editedData})

        //calling the api to update the images
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/images/${editedData.username}/${editedData.gig_id}`, imageFormData)
            .then(res => setImageUrl(res.data))
            .then(setIsImage(true))

    }

    useEffect(()=> {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/gigs/${params.gig_id}`)
            .then(res => {
                setData(res.data[0])
                return res.data[0]
            })
            .then(gig => {
                axios.get(`${process.env.REACT_APP_API_ENDPOINT}/images/${gig.username}/${gig.gig_id}`).then(res => {
                    if(res.data === 'no images') {
                        return
                    } else {
                        setIsImage(true);
                        setImageUrl(res.data)
                    }
                
                })
            })
    }, [])

    //
    if (!data) {
        return (<h1>loading....</h1>)
    }

    //if the user is editing the provided information, a new page will be shown
    if(isEditing) {
        return (
            <div className={"details" + isEditing? " editing": ""}>
                <form onSubmit={handleSave}>
                    <h2>
                        <span> Title: </span>
                        <input 
                            type="text" 
                            value={editedData.title} 
                            onChange={(e) => {
                                setEditedData({...editedData, title: e.target.value})
                            }}
                        
                        />
                    </h2>
                    {isImageDeleted || !isImage? 
                        (   
                        <div className="image-upload">
                            <span> Upload Image:</span>
                            <input 
                                type="file"
                                onChange={(e) => {
                                    setImage(e.target.files[0])
                                }} 
                        
                            />
                        </div>
                        )
                    :
                        (
                            <div className="image">
                                <img src={isImage? (imageUrl) : ('https://placehold.co/600x400')} alt="Gig-Image"/>
                                <div onClick={handleDeleteImage}>X</div>
                            </div>
                        )
                    }

                    <span>Start Time: 
                        <input 
                            type="text"
                            value={editedData.start_time}
                            onChange={(e) => {
                                setEditedData({...editedData, start_time: e.target.value})
                            }}
                        />

                    </span>
                    <h3>Act(s): 
                        <input 
                        type="text" 
                        value={editedData.artist} 
                        onChange={(e) => {
                            setEditedData({...editedData, artist: e.target.value})
                        }}
                        />
                    </h3>
                    <span>Address: 
                        <input 
                            type="text" 
                            value={editedData.address}
                            onChange={(e) => {
                                setEditedData({...editedData, address: e.target.value})
                            }}
                        />
                    </span>
                    <span><button onClick={handleSave}>Save</button></span>
                </form>

            </div>

        )
    }
    // returning the html page.
    return (
        <div className="details">
            <h2>{data.title}</h2>
            <div className="image">
                {
                    isImage? (<img src={imageUrl} alt="image" />) : (null)
                    
                }
            </div>
            <div className="profile-picture-area">
                {data.username ? 
                    (<ProfilePicture username={data.username} />) : <p>Loading...</p>
                }
            </div>

            <h3>Act(s): {data.artist}</h3>
            <div className="keywords">
                <span>Genres: </span>
                {data.keywords.join(', ')}
            </div>

            <div className="description">
                <p>{data.description}</p>
            </div>
            

            <div className="info">
                <p className="location">
                    <span>{data.city}, </span>
                    <span>{data.venue_name}</span>
                    <span> {data.address}</span>
                </p>
                <p className="time">
                    <span>{data.date} </span>
                    <span>Times: {data.start_time} - {data.finish_time}</span>
                </p>
            </div>
            { isAuthor? 
            (<span>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </span>) :
            (null)
            }
        </div>
    )

}