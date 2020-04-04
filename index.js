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
