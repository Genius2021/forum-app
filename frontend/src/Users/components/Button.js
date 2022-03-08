import React from 'react'

function Button({type, children, border, fontSize, onClick, justifySelf, smallContainedButton, mediumContainedButton, largeContainedButton, smallOutlinedButton, mediumOutlinedButton, largeOutlinedButton }) {

    const smallContainedButtonStyle = {
        backgroundColor:"#3b5998",
        color:"white",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        border: `${border || "1px #a4a4a4 solid"} `,
        fontSize: `${ fontSize || "1rem"}`,
        outline: "none",
        fontFamily: "Helvetica, Arial, sans-serif",
        justifySelf: `${justifySelf}`,
        zIndex: -0,
    }
    const mediumContainedButtonStyle ={
        backgroundColor:"#3b5998",
        color:"white",
        padding: "1rem",
        borderRadius: "0.3rem",
        border: `${border || "1px #a4a4a4 solid"} `,
        fontSize: `${ fontSize || "1.3rem"}`,
        outline: "none",
        fontFamily: "Helvetica, Arial, sans-serif",
        justifySelf: `${justifySelf}`,
        zIndex:-0,
    }

    const largeContainedButtonStyle = {
        backgroundColor:"#3b5998",
        color:"white",
        padding: "1.2rem",
        borderRadius: "0.3rem",
        border: `${border || "1px #a4a4a4 solid"} `,
        fontSize: `${ fontSize || "1.6rem"}`,
        outline: "none",
        fontFamily: "Helvetica, Arial, sans-serif",
        justifySelf: `${justifySelf}`,
        zIndex: -0,
    }

    const smallOutlinedButtonStyle = {
        backgroundColor:"white",
        color:"#3b5998",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        border: `${border || "1px #3b5998 solid"} `,
        fontSize: `${ fontSize || "1rem"}`,
        outline: "none",
        fontFamily: "Helvetica, Arial, sans-serif",
        justifySelf: `${justifySelf}`,
        zIndex: -0,
    }

    const mediumOutlinedButtonStyle ={
        backgroundColor:"white",
        color:"#3b5998",
        padding: "1rem",
        borderRadius: "0.3rem",
        border: `${border || "1px #3b5998 solid"} `,
        fontSize: `${ fontSize || "1.3rem"}`,
        outline: "none",
        fontFamily: "Helvetica, Arial, sans-serif",
        justifySelf: `${justifySelf}`,
        zIndex:-0,
    }

    const largeOutlinedButtonStyle ={
        backgroundColor:"white",
        color:"#3b5998",
        padding: "1.2rem",
        borderRadius: "0.3rem",
        border: `${border || "1px #3b5998 solid"} `,
        fontSize: `${ fontSize || "1.6rem"}`,
        outline: "none",
        fontFamily: "Helvetica, Arial, sans-serif",
        justifySelf: `${justifySelf}`,
        zIndex:-0,
    }

  return (
    <button style={(smallContainedButton && smallContainedButtonStyle) || 
        (mediumContainedButton && mediumContainedButtonStyle) || 
        (largeContainedButton && largeContainedButtonStyle) || 
        (smallOutlinedButton && smallOutlinedButtonStyle) ||  
        (mediumOutlinedButton && mediumOutlinedButtonStyle) || 
        (largeOutlinedButton && largeOutlinedButtonStyle)
    
    } type={type} onClick={onClick}>{children}</button>
  )
}

export default Button