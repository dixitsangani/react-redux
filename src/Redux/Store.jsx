
import { applyMiddleware, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk'
import Reducer from '../Redux/Reducer'

const initialValue = {
    count: 0,
    todo:[]
}

// step 1 setup the store

export const store = legacy_createStore(Reducer, initialValue,applyMiddleware(thunk));
 console.log(store.getState())