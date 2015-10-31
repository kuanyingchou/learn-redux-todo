import React, { Component } from 'react';

export default class TodoItem extends Component {
	renderDesc(desc, checked) {
		if(checked) {
			return (
				<del> {desc} </del>
			);
		} else {
			return (
				<span> {desc} </span>
			);	
		}
		
	}
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
				{ this.renderDesc(desc, checked) }
			</div>
		);
	}
}