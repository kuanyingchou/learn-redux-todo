import { createStore } from 'redux';

const ADD_TODO = 'ADD_TODO';
const CHECK_TODO = 'CHECK_TODO';
const CLEAR_TODO = 'CLEAR_TODO';
const SET_FILTER = 'SET_FILTER';

const FILTER_ALL = 0;
const FILTER_DONE = 1;
const FILTER_UNDONE = 2;

function add_todo(desc) {
	return { type: ADD_TODO, desc};
}
function check_todo(index) {
	return { type: CHECK_TODO, index};
}
function clear_todo() {
	return { type: CLEAR_TODO };
}
function set_filter(filter) {
	return { type: SET_FILTER, filter };
}

function reduce(state = {todos: [], filter: FILTER_ALL}, action) {
	switch(action.type) {
		case ADD_TODO:
			return {
				todos: [...state.todos, {desc: action.desc, done:false}], 
				filter: state.filter
			};
		case CHECK_TODO:
			let item = state.todos[action.index];
			return {
				todos: [...state.todos.slice(0, action.index),
						{desc: item.desc, done: true},
						...state.todos.slice(action.index+1)],
				filter: state.filter
			};
		case CLEAR_TODO:
			return { todos: [], filter: state.filter };

		case SET_FILTER:
			return { todos: state.todos, filter: action.filter };
		default:
			return state;
	}
}

let store = createStore(reduce);
store.subscribe(()=>{
	console.log('[');
	store.getState().todos.forEach((i)=>console.log(i));
	console.log(']');
});

store.dispatch(add_todo('hey'));
store.dispatch(add_todo('ho'));
store.dispatch(add_todo("let's go"));

store.dispatch(check_todo(2));
store.dispatch(check_todo(0));
store.dispatch(set_filter(FILTER_UNDONE));
