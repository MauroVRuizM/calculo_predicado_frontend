import axios from 'axios';
import { types } from '../types/types';

export const startListRules = () => {
    return async(dispatch) => {
        const result = await axios.get('https://us-central1-prolsimu.cloudfunctions.net/api/rule/all');
        dispatch(listRules(result.data.data));
    }
}

export const listRules = (rules) => {
    return {
        type: types.listRule,
        payload: rules
    }
}