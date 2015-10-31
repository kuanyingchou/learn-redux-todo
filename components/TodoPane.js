import React, { Component } from 'react';
import Input from './Input';
import TodoList from './TodoList';
import Filter from './Filter';
import * as ActionCreator from '../actions/actions';

export default class TodoPane extends Component {
	// handleItemClick(key, checked) {
	// 	let dispatch = this.props.dispatch; //TODO: why this failed?
	// }

	handleClear() {
		this.props.dispatch(ActionCreator.clearDone());
	}

	render() {
		let { todos, filter, dispatch } = this.props;
		return (
			<div>
				<Input onAddClick={ 
					(desc)=>{ 
						dispatch(ActionCreator.addTodo(desc)); 
					}
				}
				/>
				<TodoList 
						todos={todos} 
						onItemClick={
							(key)=>{
								dispatch(ActionCreator.toggleTodo(key));
							}
						}
				/>
				<Filter 
						filter={filter} 
						onFilterClick={
							(filter) => {
								dispatch(ActionCreator.setFilter(filter));
							}
						}
				/>
				<button 
						onClick={this.handleClear.bind(this)}
						disabled={
							todos.filter((t)=>t.done).length > 0?
							false: true }> 
					Clear Completed 
				</button>
			</div>
		);
	}
}