import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: []
	// {
	// 	title : null,
	// 	token : null,
	// 	description : null,
	// },
};

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodos: (state, action) => {
			// state.value.description = action.payload.description;
			// state.value.title = action.payload.title;
			// state.value.token = action.payload.token;
			state.value.push(action.payload);
		},
		removeTodos: (state, action) => {
			state.value = state.value.filter(todos => todos.title !== action.payload.title);
		},
		// todoList : (state, action) => {

		// }
	// 	upDateTodos: (state, action) => {
	// 		state.value = 
	// 	}
	 },
});

export const { addTodos, removeTodos } = todosSlice.actions;
export default todosSlice.reducer;
