let defaultToken = localStorage.getItem("token");

const userTokenReducer = (state = defaultToken, action) => {
    switch (action.type) {
        case "userToken":
            state = action.token;
            return state;
        default:
            return state;
    }
}

export default userTokenReducer;
