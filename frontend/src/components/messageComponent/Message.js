import "./Message.css";

function Message(props) {
    return (
        <div className={`alert alert-${props.variant || "info"}`}>
            {props.children}
            
        </div>
    )
}

export default Message
