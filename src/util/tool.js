import uuidv1 from 'uuid/v1';


function formatParams(data){
    let temp = [];
    Object.keys(data).forEach((item,index) => {
        temp.push(`${item}=${data[item]}`);
    })

    return temp.join('&');
}

let customFetch = data => {

    if(!fetch){
        throw new Error("浏览器版本不支持fetch,请更换新版浏览器");
    }
    if(data.method && data.method.toLowerCase() === 'post'){
        return fetch(data.url,{
            method:'POST',
            mode:"cors",
            headers:{
                "Content-type":'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body:formatParams(data.params)
        })
        .then(response => response.json())
    }else{
        return fetch(data.url + dealParams(data.params),{
            method:'GET',
            credentials: "include"
        })
        .then(response => response.json())
    }


    function dealParams(params){
        if(!params) return '';
        return '?' + Object.keys(params).reduce((val,cur,index) => {
            return val +=  (index === 0 ? '' : '&') + `${cur}=${encodeURIComponent(params[cur])}`
        },'')
    }
}




let parseDom = function (str) {
	　　 var objE = document.createElement("div");
	　　 objE.innerHTML = str;
	　　 return objE.childNodes;
}


let judgePlatform = () => {


    let platform = navigator.platform;

    if(platform.indexOf('Mac') === 0){
        return 'Mac';
    }else if (platform.indexOf('Win')){
        return 'Win';
    }else{
        return 'Nonmainstream'
    }
}


export {
    customFetch,
    parseDom,
    judgePlatform
}