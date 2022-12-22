import './StartPage.css'

export default function StartPage(props){
    return(
        <div>
            <h1>Welcome to Trivia Land</h1>
            <button onClick={props.onClick}>START</button>
        </div>
    )
}