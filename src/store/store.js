import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { factReducer } from '../reducers/factReducer';
import { ruleReducer } from '../reducers/ruleReducer';
import { checkReducer } from '../reducers/checkReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    rule: ruleReducer,
    fact: factReducer,
    check: checkReducer
});


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);