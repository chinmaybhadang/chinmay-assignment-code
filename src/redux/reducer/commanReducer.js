const initState = {
    users : []
}

const commanReducer = (state = initState, action) => {

    // This for add data to store through reducer

    if(action.type === "ADD_DATA"){
        let newUsers = action.object
        let array = state["users"]
        array.unshift(newUsers)
        return{
            ...state,
            users:array
        }
    }

    // This for delete data to store through reducer
    
    if(action.type === "DELETE_DATA"){
        let newUsers = state.users.filter(user => {
            return action.id !== user.id
        })
        return{
            ...state,
            users:newUsers
        }
    }

    // This for edit data to store through reducer
    
    if(action.type === "EDIT_DATA"){
        return{
            ...state,
            users:action.array
        }
    }
    return state;
}

export default commanReducer