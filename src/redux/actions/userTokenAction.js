const userTokenAction = (token) => {
    return {
        type: "userToken",
        token: token
    }
}

export default userTokenAction;
