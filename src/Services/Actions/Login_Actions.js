import { SET_DATA } from "../Types/Login_Types";

export const action_Login_user = (username, password) => async () => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/login`;
await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // grant_type: "password",
      username: username,
      password: password,
    }),
  }).then((response)=>response.json())
    .then((res)=>{
      if (res.success !== false && res.status!==400) {
        localStorage.setItem("username", username);
        localStorage.setItem("inventory_token", res.access_token);
        localStorage.setItem("refreshtoken", res.refresh_token);
        window.location.href = "/";
        console.log(res);
      } else {
        alert("Wrong Username/Password");
      }
    })
 
};
