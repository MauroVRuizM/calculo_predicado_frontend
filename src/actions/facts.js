import axios from 'axios';
import { types } from '../types/types';

export const startListFacts = () => {
    return async(dispatch) => {
        const result = await axios.get('https://us-central1-prolsimu.cloudfunctions.net/api/fact/all');
        dispatch(listFacts(result.data.data));
    }
}

export const startAddFacts = (facts) => {
    return async(dispatch) => {
        const result = await axios.post(
            'https://us-central1-prolsimu.cloudfunctions.net/api/fact/create',
            JSON.stringify(facts), {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                }
            }
        );
        dispatch(addFact(result.data.success, result.data.message));
    }
}

export const listFacts = (facts) => {
    return {
        type: types.listFact,
        payload: facts
    }
}

export const addFact = (success, msg) => {
    return {
        type: types.addFact,
        payload: {
            success,
            msg
        }
    }
}