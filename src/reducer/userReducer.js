const userReducer = (state, action) => {
    switch (action.type) {
        case "USER_DETAILS":
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;