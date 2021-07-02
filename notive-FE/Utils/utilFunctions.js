export const darkThemeValues = {
    background1: "#04619f",
    background2: "#000000",
    fontColor: "#FFFFFF",
    headerColor: "#332940",
    navFontColor: "#FFFFFF"

  }

export const lightThemeValues = {
    background1: "#0093E9",
    background2: "#80D0C7",
    fontColor: "rgba(0, 0, 0, 0.6)",
    headerColor: "#e8e8e8",
    navFontColor: "rgba(0, 0, 0, 0.50)"

}

export const changeThemeMode = (styles) => {
    document.documentElement.style.setProperty('--background-color1', styles.background1);
    document.documentElement.style.setProperty('--background-color2', styles.background2);
    document.documentElement.style.setProperty('--font-color', styles.fontColor );
    document.documentElement.style.setProperty('--header-color', styles.headerColor );
    document.documentElement.style.setProperty('--nav-font-color', styles.navFontColor );
}


export const errorRequestHandler = (errorObj) => {
    if(errorObj.response === undefined){
        const noConnectionMessage = "We could have not connect to the server, check your internet connection or refresh tne page"
        return noConnectionMessage
    } 
    
    const errorData = errorObj.response.data
    if(errorData.non_field_errors !== undefined) return errorData.non_field_errors
    if(errorData.error !== undefined) return errorData.error.detail
    if(errorData.old_password !== undefined) return errorData.old_password.detail

    return "Sorry, there was an unexpected  error. Please reload"
}