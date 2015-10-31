import { createStore } from 'redux';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const CLEAR_TODO = 'CLEAR_TODO';
const SET_FILTER = 'SET_FILTER';

const FILTER_ALL = 0;
const FILTER_DONE = 1;
const FILTER_UNDONE = 2;

function add_todo(desc) {
	return { type: ADD_TODO, desc};
}
function toggle_todo(index) {
	return { type: TOGGLE_TODO, index };
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
		case TOGGLE_TODO:
			let item = state.todos[action.index];
			return {
				todos: 
						[...state.todos.slice(0, action.index),
						{desc: item.desc, done: !item.done},
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

//=============

class TodoItem extends Component {
	render() {
		let { index, checked, desc, onItemClick } = this.props;
		console.log(index);
		return (
			<div>
				<input 
						type="checkbox" 
						checked = { checked } 
						onClick = { 
							(e) => {
								onItemClick(index);
							} 
						}
				/>
				<span> {desc} </span>
			</div>
		);
	}
}

class TodoList extends Component {
	renderItem(item, index) {
		return (
			<TodoItem 
				index = {index}
				checked = {item.done} 
				desc = {item.desc}
				onItemClick = {this.props.onItemClick} 
			/>
		)
	}

	render() {
		let todos = this.props.todos;
		return (
			<div>
				{
					todos.map(
						(item, index) => this.renderItem(item, index)
					)
				}
			</div>
		);
	}
}

class Filter extends Component {
	handleClick(e, filter) {
		e.preventDefault();
		if(filter != this.props.filter) { //TODO: necessary?
			this.props.onFilterClick(filter);
		}
	}



	renderFilter(display, filter, currentFilter) {
		if(currentFilter === filter) {
			return ( <span> {display} </span> );
		} else {
			return (
				<a 
					href='#'
					onClick={ e=> this.handleClick(e, filter) }> 
					{ display }
				</a>
			);
		}
	}

	render() {
		let filter = this.props.filter;
		return (
			<div>
				{ this.renderFilter('All', FILTER_ALL, filter) }
				<span>, </span>
				{ this.renderFilter('Active', FILTER_UNDONE, filter) }
				<span>, </span>
				{ this.renderFilter('Done', FILTER_DONE, filter) }
			</div>
		);
	}
}

class Input extends Component {
	handleAddClick(e) {
		let input = this.refs.desc;
		if(!input.value) return;
		let desc = input.value.trim();
		this.props.onAddClick(desc);
		input.value = '';
	}
	
	handleEnter(e) {
		console.log(this);
		if(e.which === 13) {
			this.handleAddClick();
		}
	}

	render() {
		return (
			<div>
				{ /*TODO: no auto bind???*/ }
				<input 
						type="text" 
						placeholder="Add New Todos Here" 
						autoFocus="true"
						ref="desc" 
						onKeyDown={ this.handleEnter.bind(this) } 

				/>
				<button onClick={ this.handleAddClick } >
					Add
				</button>
			</div>
		);
	}
}

class TodoPane extends Component {
	// handleItemClick(key, checked) {
	// 	let dispatch = this.props.dispatch; //TODO: why this failed?
	// }
	render() {
		let { todos, filter, dispatch } = this.props;
		return (
			<div>
				<Input onAddClick={ 
					(desc)=>{ 
						dispatch(add_todo(desc)); 
					}
				}
				/>
				<TodoList 
						todos={todos} 
						onItemClick={
							(key)=>{
								dispatch(toggle_todo(key));
							}
						}
				/>
				<Filter 
						filter={filter} 
						onFilterClick={
							(filter) => {
								dispatch(set_filter(filter));
							}
						}/>
			</div>
		);
	}
}

// store.dispatch(add_todo('hey'));
// store.dispatch(add_todo('ho'));
// store.dispatch(add_todo("let's go"));

// store.dispatch(toggle_todo(2, true));
// store.dispatch(toggle_todo(0, true));
// store.dispatch(set_filter(FILTER_UNDONE));

function getFilteredTodos(todos, filter) {
	switch(filter) {
		case FILTER_ALL:
			return todos;
		case FILTER_DONE:
			return todos.filter((item)=>item.done);
		case FILTER_UNDONE:
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
		document.getElementById('root'));




