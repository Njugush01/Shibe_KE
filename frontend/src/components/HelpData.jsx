import "./HelpStyles.css"

function HelpData(props){
    return(
        <div className="h-card">
            <div className="h-image">
                <img src={props.image} alt="image"/>
            </div>
            <h4 className='font-bold'>{props.heading}</h4>
            <p>{props.text}</p>
        </div>
    )
}

export default HelpData;