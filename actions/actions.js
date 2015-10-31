import * as ActionType from '../constants/actions';

export function addTodo(desc) {
	return { type: ActionType.ADD_TODO, desc};
}
export function toggleTodo(index) {
	return { type: ActionType.TOGGLE_TODO, index };
}
export function clearDone() {
	return { type: ActionType.CLEAR_DONE };
}
export function setFilter(filter) {
	return { type: ActionType.SET_FILTER, filter };
}