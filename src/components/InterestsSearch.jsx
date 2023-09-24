import { useState, useEffect } from "react"


export default function InterestSearch({ setParentData }) {
    const [keywords, setKeywords] = useState([]);
    const [string, setString] = useState('');
    const [message, setMessage] = useState('');
    
    const handleAdd = () => {
        //Regex pattern that blacklists numbers and special characters other than ' ' and '-'.
        const validationPattern = /^[a-zA-ZäöüÄÖÜ - ']*$/
        //validating entered string to meet this condition.
        if(!validationPattern.test(string)) {
            setMessage('Special characters not allowed in Keywords');
            //prohibiting the entry of string if it contains specified characters. 
            return;
        }

        //adding interest to interests array
        setKeywords(prevKeywords => {
             let newArray = [...prevKeywords, string];
        
             return newArray;
        })
        //resetting textbox value
        setString('');
    }

    useEffect(() => {
        setParentData(prevData => {
            let parentData = {...prevData}
            parentData.keywords = [...keywords];
            return parentData
        })
        
    }, [keywords])

    const handleRemove = e => {
        //making a deep copy of interests array for modification
        let keywordsCopy = [...keywords];
        //filtering out the interest to be removed (e.target.textContent)
        let newKeywords = keywordsCopy.filter(keyword => keyword !== e.target.textContent)
        //setting the newly filtered array as Interests
        setKeywords([...newKeywords])
    }

    const handleTextInput = e => {
        setString(prevString  => e.target.value)
    }


    return (
        <div className="interests">
            <span>
                <input type="text" value={string} onChange={handleTextInput}/>
                <div className="add-btn" onClick={handleAdd}>ADD</div>
                <span>{message}</span>
            </span>
            <div className="selected">
                {keywords.map((keyword, index) => (
                        <span key={index} onClick={handleRemove} value={keyword}>
                            {keyword}
                        </span>
                ))}
            </div>
        </div>
    )
}