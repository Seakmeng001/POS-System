import moment from 'moment'
export const config={
image_path: "http://localhost:80/POS/image_1/"
}
export const formatDateClient = (date,pattern="DD/MM/YYYY") =>{
    return moment(date).format(pattern)
}
export const formatDateServer = (date,pattern="YYYY-MM-DD") =>{
    return moment(date).format(pattern)
}
export const getCurrentUser = () => {
    var profile = localStorage.getItem("profile")
    if(profile != "" && profile != null){
        profile = JSON.parse(profile)
        return profile;
    }
    return null;
}
export const isLogin = () => {
    const isUserLogin = localStorage.getItem("isLogin");
    if(isUserLogin == null || isUserLogin== "null"||isUserLogin ==""|| isUserLogin==0){
        return false;
    }
    return true;
}