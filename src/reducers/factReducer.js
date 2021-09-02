import { types } from '../types/types';

export const factReducer = (state = {}, action) => {
    switch (action.type) {
        case types.addFact:
            return {
                success: action.payload.success,
                msg: action.payload.msg
            }
        case types.listFact:
            return {
                facts: [...action.payload]
            }
        default:
            return state;
    }
}