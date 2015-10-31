import React, { Component } from 'react';

export default class TodoItem extends Component {
	render() {
		let { index, checked, desc, onItemClick } = this.props;
		//console.log(index);
		return (
			<div>
				<input 
						type="checkbox" 
						checked = { checked } 
						onChange = { 
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