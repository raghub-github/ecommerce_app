const userReducer = (state, action) => {
    switch (action.type) {
        case "USER_DETAILS":
            console.log("action", action.payload);
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;