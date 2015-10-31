import * as ActionType from '../constants/actions';

export function add_todo(desc) {
	return { type: ActionType.ADD_TODO, desc};
}
export function toggle_todo(index) {
	return { type: ActionType.TOGGLE_TODO, index };
}
export function clear_todo() {
	return { type: ActionType.CLEAR_TODO };
}
export function set_filter(filter) {
	return { type: ActionType.SET_FILTER, filter };
}