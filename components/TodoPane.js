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
		this.props.dispatch(ActionCreator.clear_todo());
	}

	render() {
		let { todos, filter, dispatch } = this.props;
		return (
			<div>
				<Input onAddClick={ 
					(desc)=>{ 
						dispatch(ActionCreator.add_todo(desc)); 
					}
				}
				/>
				<TodoList 
						todos={todos} 
						onItemClick={
							(key)=>{
								dispatch(ActionCreator.toggle_todo(key));
							}
						}
				/>
				<Filter 
						filter={filter} 
						onFilterClick={
							(filter) => {
								dispatch(ActionCreator.set_filter(filter));
							}
						}
				/>
				<button onClick={this.handleClear.bind(this)}> 
					Clear Completed 
				</button>
			</div>
		);
	}
}