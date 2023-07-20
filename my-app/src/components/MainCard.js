
const MainCard = (props) => {
    const EMPTY_HEART = "🤍";
    const FULL_HEART = "💖";

    const heartIcon = props.alreadyFavorites ? FULL_HEART : EMPTY_HEART;

    return (
        <div className="main-card">
            <img src={props.src} alt={props.alt} width={props.width} />
            <button
                onClick={props.onHeartClick}
                onMouseOver={props.onMouseOver}>{heartIcon}</button>
        </div>
    );
}


export default MainCard;