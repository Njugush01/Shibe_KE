function Hero(props){
    return(
        <>
         <div className={props.cName}>
            <img alt="HeroImg" src={props.heroImg}/>
            <div className="hero-text text-center">
                <h1>{props.title}</h1>
                <p>{props.text}</p>
                <div className="flex flex-col items-center"> {/* Ensures buttons are stacked vertically */}
                    <a href={props.url} className={props.btnClass + " mb-4"}>
                       {props.buttonText}
                    </a>
                    {props.additionalButton && (
                        <a href={props.additionalButton.url} className={props.additionalButton.btnClass + " mt-4 text-black text-lg"}>
                            {props.additionalButton.buttonText}
                        </a>
                    )}
                </div>
            </div>
         </div>
        </>
    )
}

export default Hero;
