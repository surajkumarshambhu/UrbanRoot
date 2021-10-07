import * as CONSTANT from '../Helper/Constant';

export function ApiHelper(url, data = {}, method = 'GET') {
    let bearer ='';
    if (localStorage.getItem("user") !== null) {
        let usrData = JSON.parse(localStorage.getItem('user') ?? "");
        bearer = 'Bearer '+ usrData.data.user.token ;
    }
    return fetch(CONSTANT.BASEURL+url, {  // Return promise
        method: method,
        withCredentials: true,
        // credentials: 'include',
        headers: {
            'AcceptLanguage': 'en_US',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'clientVersion': 'WEB:1',
            'Authorization': bearer,
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((result) => {
        if(CONSTANT.DEV_MODE === 1){
            console.log(result);
        }
        return result;
    }, (error) => {
        
    })
}
