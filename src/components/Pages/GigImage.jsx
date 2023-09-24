import { useState } from "react";

export default function GigImage ({ gig }) {

    const [image, setImage] = useState(null);
    
    const imageFormData = new FormData();
    imageFormData.append("image", image)

    const handleDeleteImage = () => {
        


    }



}