import React, { Component } from 'react';

export default class Input extends Component {
	constructor() {
		super();
		this.state = { value: '' };
	}
	handleAddClick(e) {
		if(!this.state.value) return;
		let desc = this.state.value.trim();
		this.props.onAddClick(desc);
		this.setState({value:''});
	}

	handleChange(e) {
		this.setState({value: e.target.value});
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
						value={ this.state.value }
						autoFocus="true"
						onChange={ this.handleChange.bind(this) }
						onKeyDown={ this.handleEnter.bind(this) } 

				/>
				<button 
						onClick={ this.handleAddClick.bind(this) } 
						disabled={this.state.value?false:true}>
					Add
				</button>
			</div>
		);
	}
}