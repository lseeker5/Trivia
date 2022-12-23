import './StartPage.css'

export default function StartPage(props){
    return(
        <div className='start-page'>
            <p className='start-page-title'>Welcome to Trivia Land</p>
            <button className='start-page-button' onClick={props.onClick}>START</button>
        </div>
    )
}