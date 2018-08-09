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

function isURL(str_url){
    let reg = /(http|https):\/\/.+/g
    if (reg.test(str_url)){
        return true;
    }else{
        return false;
    }
}


export {
    judgePlatform,
    isURL
}