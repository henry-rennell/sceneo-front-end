import { Link } from "react-router-dom"

export default function NotFound() {


    return (
        <div className="not-found-message">
            
            <h3>Oops... Looks we can't give you what you are looking for....</h3>
    
            <h4><Link to="/">Head To Home Page</Link></h4>

        </div>
    )
}