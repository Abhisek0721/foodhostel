let defaultUserAddress = {
    pincode: "140307",
    city: "",
    state: "",
    buildingName: "",
    roadName: ""
}

const userAddressReducer = (state = defaultUserAddress, action) => {
    switch (action.type) {
        case "userAddress":
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default userAddressReducer;