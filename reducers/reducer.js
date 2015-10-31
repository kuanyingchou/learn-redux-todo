import * as FilterType from '../constants/filters';
import * as ActionType from '../constants/actions';

export default function reduce(
		state = {todos: [], filter: FilterType.FILTER_ALL}, action) {
	switch(action.type) {
		case ActionType.ADD_TODO:
			return {
				todos: [...state.todos, {desc: action.desc, done:false}], 
				filter: state.filter
			};
		case ActionType.TOGGLE_TODO:
			let item = state.todos[action.index];
			return {
				todos: 
						[...state.todos.slice(0, action.index),
						{desc: item.desc, done: !item.done},
						...state.todos.slice(action.index+1)],
				filter: state.filter
			};
		case ActionType.CLEAR_TODO:
			return { 
				todos: state.todos.filter((item) => !item.done), 
				filter: state.filter 
			};

		case ActionType.SET_FILTER:
			return { todos: state.todos, filter: action.filter };
		default:
			return state;
	}
}