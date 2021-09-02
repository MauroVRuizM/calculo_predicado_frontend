import axios from 'axios';
import { types } from '../types/types';

export const startListRules = () => {
    return async(dispatch) => {
        const result = await axios.get('https://us-central1-prolsimu.cloudfunctions.net/api/rule/all');
        dispatch(listRules(result.data.data));
    }
}

export const startAddRules = (rule) => {
    return async(dispatch) => {
        const result = await axios.post(
            'https://us-central1-prolsimu.cloudfunctions.net/api/rule/create',
            JSON.stringify(rule), {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                }
            }
        );
        dispatch(addRule(result.data.success, result.data.message));
    }
}

export const listRules = (rules) => {
    return {
        type: types.listRule,
        payload: rules
    }
}

export const addRule = (success, msg) => {
    return {
        type: types.addRule,
        payload: {
            success,
            msg
        }
    }
}