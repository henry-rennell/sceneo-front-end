import { Link } from "react-router-dom";
import "./CSS/Footer.css"

export default function Footer() {



    return(
        <footer className="footer">
            <span>Sceneo ©</span>

            <span>
                Sceneo Is Currently In Development, If you spot a bug or need help with anything please dont hesitate to reach out to: <Link to="mailto:sceneodev@gmail.com">Sceneo Developer</Link>
            </span>
        </footer>
    )
}