import { types } from '../types/types';

export const checkReducer = (state = {}, action) => {
    switch (action.type) {
        case types.askCheck:
            return {
                status: action.payload.status,
                response: [...action.payload.response]
            }
        case types.clearChek:
            return {
                response: ''
            }
        default:
            return state;
    }
}