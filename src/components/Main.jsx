import { useState,useEffect } from "react";

export default function Main()
{
    const [meme,setMeme] = useState({
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
        memeUrl:"http://i.imgflip.com/1bij.jpg"

    })

    const [allMemes,setAllMemes]=useState([])

    function handleChange(event){
        const {value,name} = event.currentTarget
        setMeme((prevMeme)=>({
            ...prevMeme,
            [name]:value
        }))
    }

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random()*allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            memeUrl: newMemeUrl
        }))
    }

    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then((res)=>res.json())
        .then(data=>setAllMemes(data.data.memes))
    },[])


    return(
        <main>
            <div className="form">
                <label>
                    <input type="text" placeholder="One does not simply" name="topText" onChange={handleChange}/>
                </label>
                <label>
                    <input type="text" placeholder="Walk into Mordor" name="bottomText"  onChange={handleChange}/>
                </label>
                <button onClick={getMemeImage}>Get a new image </button>
            </div>
            <div className="meme">
                <img src={meme.memeUrl} alt="meme"/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}