import axios from 'axios'
import urlJoin from 'url-join'
export const baseConfig = {
    baseUrl: "http://172.16.10.208:5200/",
    client_id: "OnlineCalculationClient",
    client_secret: "secret595"
}

export const getAccessTokenConfig = {
    path: "connect/token",
    request: {
        grant_type: "password",
        scope: "openid profile offline_access online_calculation"
    }
}

export const getAccessToken = (username, password) => {
    const url = urlJoin(baseConfig.baseUrl, getAccessTokenConfig.path)
    const { client_id, client_secret } = baseConfig
    const request = { client_id, client_secret, username, password, ...getAccessTokenConfig.request }
    var formdata = new FormData();
    for(var k in request){
        formdata.append(`${k}`,request[k])
    } 
    let authUrl = process.env.NODE_ENV === 'production' ? url : getAccessTokenConfig.path
    return axios({
            url: authUrl,
            method:'POST',
            data:formdata,
        })

}



export const setCookie = (key, value, t) =>{
	var oDate=new Date();
	oDate.setTime(oDate.getTime() + t * 1000 * 24);
	document.cookie=key+"="+encodeURIComponent(value)+";expires="+oDate.toUTCString();

}
export const getCookie = (key) => {
    var cookie = document.cookie.replace(/\s+/g, "");
    var arr = cookie.split(";");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].split("=")[0] === key) {
            return arr[i].split("=")[1];
        }
    }
} 
