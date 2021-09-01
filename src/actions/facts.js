import axios from 'axios';
import { types } from '../types/types';

export const startListFacts = () => {
    return async(dispatch) => {
        const result = await axios.get('https://us-central1-prolsimu.cloudfunctions.net/api/fact/all');
        dispatch(listFacts(result.data.data));
    }
}

export const listFacts = (facts) => {
    return {
        type: types.listFact,
        payload: facts
    }
}