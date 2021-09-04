import axios from 'axios';
import { types } from '../types/types';

export const startAskCheck = (clause) => {
    return async(dispatch) => {
        const result = await axios.post(
            'https://us-central1-prolsimu.cloudfunctions.net/api/ia/checking', {
                "message": JSON.stringify(clause),
            }, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                }
            }
        );
        dispatch(listCheck(result.data.message, result.status));
    }
}

export const listCheck = (response, status) => {
    return {
        type: types.askCheck,
        payload: {
            status,
            response
        }
    }
}

export const clearCheck = () => {
    return {
        type: types.clearChek
    }
}