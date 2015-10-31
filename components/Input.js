import React, { Component } from 'react';

export default class Input extends Component {
	handleAddClick(e) {
		let input = this.refs.desc;
		if(!input.value) return;
		let desc = input.value.trim();
		this.props.onAddClick(desc);
		input.value = '';
	}
	
	handleEnter(e) {
		//console.log(this);
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
				<button onClick={ this.handleAddClick.bind(this) } >
					Add
				</button>
			</div>
		);
	}
}