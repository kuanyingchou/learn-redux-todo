import React, { Component } from 'react';
import * as FilterType from '../constants/filters';

export default class Filter extends Component {
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
				{ this.renderFilter('All', FilterType.ALL, filter) }
				<span>, </span>
				{ this.renderFilter('Active', FilterType.ACTIVE, filter) }
				<span>, </span>
				{ this.renderFilter('Done', FilterType.DONE, filter) }
			</div>
		);
	}
}