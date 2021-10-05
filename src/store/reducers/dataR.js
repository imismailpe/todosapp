import { fromJS } from "immutable";
import * as actions from "../actions/actionTypes";

export const initialState = fromJS({
    todosList: [],
    error: null
});

export const dataR = (state = initialState, action = {}) => {
    switch(action.type){
        case actions.UPDATE_TODOS:
            return state.set('todosList', action.payload)
            .set('error', null);
        default:
            return initialState;
    }
};
export default dataR;