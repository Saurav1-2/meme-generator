import { useState, useEffect, useRef } from "react";
import { toPng } from 'html-to-image';

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        memeUrl: "http://i.imgflip.com/1bij.jpg"
    });
    const [allMemes, setAllMemes] = useState([]);
    const memeRef = useRef(null);

    function handleChange(event) {
        const { value, name } = event.currentTarget;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const newMemeUrl = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            memeUrl: newMemeUrl
        }));
    }

    function downloadMeme() {
        if (memeRef.current) {
            toPng(memeRef.current)
                .then(dataUrl => {
                    const link = document.createElement('a');
                    link.download = 'meme.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch(error => {
                    console.error('Failed to download meme:', error);
                    alert('Failed to download meme. Please try again.');
                });
        }
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
            .catch(error => console.error("Failed to fetch memes:", error));
    }, []);

    return (
        <main>
            <div className="form">
                <label>
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new image</button>
                <button onClick={downloadMeme}>Download Meme</button>
            </div>
            <div className="meme" ref={memeRef}>
                <img src={meme.memeUrl} alt="meme" />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    );
}