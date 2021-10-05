import { fromJS } from "immutable";
import * as actions from "../actions/actionTypes";

export const initialState = fromJS({
    todosList: [
        {text: 'test', status: 'Completed'},
        {text: 'test2', status: ''},
        {text: 'test3', status: 'Completed'},{text: 'test4', status: 'Abandoned'},{text: 'test5', status: 'Completed'}
    ],
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