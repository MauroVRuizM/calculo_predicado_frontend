import { types } from '../types/types';

export const factReducer = (state = {}, action) => {
    switch (action.type) {
        case types.listFact:
            return {
                facts: [...action.payload]
            }
        default:
            return state;
    }
}