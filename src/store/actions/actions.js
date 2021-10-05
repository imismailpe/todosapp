import * as actions from "./actionTypes";

export function setTodos(data){
    return {
        type: actions.UPDATE_TODOS,
        payload: data
    };
};