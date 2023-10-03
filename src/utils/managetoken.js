import axios from "axios";

export const checkToken = async () => {
    // check auth
    const token = localStorage.getItem('token');
    if(token){
        await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/users/verifyToken/${token}`
        ).then((res) => {
            if(res?.data?.status) {
                return true;
            }
            return false;
        }).catch(() => {
            return false;
        });
    }else{
        return false;
    }
}


