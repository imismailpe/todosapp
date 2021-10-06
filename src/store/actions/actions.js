import * as actions from "./actionTypes";

//update todos list on store
export function setTodos(data){
    return {
        type: actions.UPDATE_TODOS,
        payload: data
    };
};