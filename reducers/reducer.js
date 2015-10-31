import * as FilterType from '../constants/filters';
import * as ActionType from '../constants/actions';
import { combineReducers } from 'redux';

function todos(state = [], action) {
	switch(action.type) {
		case ActionType.ADD_TODO:
			return [...state, {desc: action.desc, done:false}];
		case ActionType.TOGGLE_TODO:
			let item = state[action.index];
			return [
				...state.slice(0, action.index),
				{desc: item.desc, done: !item.done},
				...state.slice(action.index+1)
			];
		case ActionType.CLEAR_DONE:
			return state.filter((item) => !item.done);
		default:
			return state;
	}
}

function filter(state = FilterType.ALL, action) {
	switch(action.type) {
		case ActionType.SET_FILTER:
			return action.filter;
		default:
			return state;
	}
}

//>> reducers' names are the same as state's properties 
export default combineReducers({todos, filter}); 
