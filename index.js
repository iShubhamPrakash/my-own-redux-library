// LIBRARY CODE-
function createStore(reducer) {
  /*
  Features:
  1. State
  2. Get the state
  3. Subscribe to changes
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

// Create todo reducers-

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.todo];

    case "REMOVE_TODO":
      return state.filter(todo => todo.id !== action.id);

    case "TOGGLE_TODO":
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
    case "ADD_GOAL":
      return [...state, action.goal];

    case "REMOVE_GOAL":
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

// A sample method which will subscribe to the store
function logger(store) {
  console.log("Current state", store.getState());
}

// Subscribing to store changes
store.subscribe(logger(store));

// Dispatch actions
store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }
})

store.dispatch({
  type: 'REMOVE_TODO',
  id: 1
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type: 'REMOVE_GOAL',
  id: 0
})