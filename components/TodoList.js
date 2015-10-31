import React, { Component } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
	renderItem(item, index) {
		return (
			<TodoItem 
				key = {index}
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