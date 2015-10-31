import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TodoPane from './components/TodoPane';
import * as FilterType from './constants/filters';
import * as ActionType from './constants/actions';
import reduce from './reducers/reducer';
import createLogger from 'redux-logger';

let logger = createLogger();
let createStoreWithMiddleware = applyMiddleware(logger)(createStore);
let store = createStoreWithMiddleware(reduce);

// store.subscribe(()=>{
// 	console.log('[');
// 	store.getState().todos.forEach((i)=>console.log(i));
// 	console.log(']');
// });

//=============
function getFilteredTodos(todos, filter) {
	switch(filter) {
		case FilterType.FILTER_ALL:
			return todos;
		case FilterType.FILTER_DONE:
			return todos.filter((item)=>item.done);
		case FilterType.FILTER_UNDONE:
			return todos.filter((item)=> ! item.done);
	}
}

let App = connect(
	(state)=>(
		{
			todos: getFilteredTodos(state.todos, state.filter),
			filter: state.filter
		}
	)
)(TodoPane);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);


// store.dispatch(add_todo('hey'));
// store.dispatch(add_todo('ho'));
// store.dispatch(add_todo("let's go"));

// store.dispatch(toggle_todo(2, true));
// store.dispatch(toggle_todo(0, true));
// store.dispatch(clear_todo());
// store.dispatch(set_filter(FILTER_UNDONE));


