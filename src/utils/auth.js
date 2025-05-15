export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  
  export const getAuthToken = () => {
    console.log(localStorage.getItem("auth_token"))
    console.log(sessionStorage.getItem("id_token"))
    console.log( 
      getCookie("token")

    )
    return (
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("id_token") ||
      getCookie("token")
    );
  };
  