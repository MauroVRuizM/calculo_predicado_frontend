import { types } from '../types/types';

export const ruleReducer = (state = {}, action) => {
    switch (action.type) {
        case types.listRule:
            return {
                rules: [...action.payload]
            }
        default:
            return state;
    }
}