import trollface from '../assets/trollface.png';
export default function Header()
{
    return(
    <header className="header">
        <img src={trollface} alt="Troll face Logo" />
        <h1>Meme Generator</h1>
    </header>
    )
}