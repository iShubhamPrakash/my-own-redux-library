// LIBRARY CODE-
function createStore(reducer) {
  /*
  Features:
  1. State
  2. Get the state
  3. Subscribe to changes
  4. Update the state
  */

  let state;

  let listeners = []; // It contains all the subcribed methods which will be invoked everytime the state is changed

  const getState = () => state; // returns the currest state

  // This method add a new listener to the listeners array (i.e subscribs to changes) and returns a function that can unsubscribe
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(thisListener => thisListener !== listener);
    };
  };

  // Dispatch is what actually changes the state and invoke all the subscribed listeners
  const dispatch = action => {
    //Reducer is a pure function which returns a new state based on action
    // Action is a simple object which specify what to do and how to do, it has action type-"what to do", payload- "how to do/data"
    state = reducer(state, action);

    // invoke all the listeners
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

// APP CODE-

// Action types-
const ADD_TODO ='ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO='TOGGLE_TODO'
const ADD_GOAL= 'ADD_GOAL'
const REMOVE_GOAL='REMOVE_GOAL'

// Action Creators- These are just functions which returns action object

const addTodo=(todo)=>{
return {
  type: ADD_TODO,
  todo: todo
}
}
const removeTodo=(id)=>{
return {
  type: REMOVE_TODO,
  id: id
}
}
const toggleTodo=(id)=>{
return {
  type: TOGGLE_TODO,
  id: id
}
}
const addGoal=(goal)=>{
return {
  type: ADD_GOAL,
  goal: goal
}
}
const removeGoal=(id)=>{
  return {
    type: REMOVE_GOAL,
    id: id
  }

}

// Create todo reducers-
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.todo];

    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
      );
    default:
      return state;
  }
}

// Create goals reducers-
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.goal];

    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);

    default:
      return state;
  }
}

// Combine the todo and goal reducers into one root reducer called app-

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

// Create the store-
const store = createStore(app);

// Subscribing to store changes
store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

// Dispatch actions
store.dispatch(addTodo({
  id: 0,
  name: "Create my own redux library",
  complete: false
}));

store.dispatch(addTodo({
  id: 1,
  name: "Write the code",
  complete: false
}));

store.dispatch(addTodo({
  id: 2,
  name: "Sleep",
  complete: true
}));

store.dispatch(removeTodo(2));

store.dispatch(toggleTodo(0));

store.dispatch(addGoal({
  id: 0,
  name: "Become a better developer"
}));

store.dispatch(addGoal({
  id: 1,
  name: "Get a Girl friend"
}));

store.dispatch(removeGoal(1));
