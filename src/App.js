import { createContext, useEffect, useReducer } from 'react';
import AddingDiv from './inputSection';
import './App.css';
import Tasks from './tasksSection';

  // creating context
export const ListContext = createContext();

function App() {
  // creating use reducer hook
  const [state, dispatch] = useReducer(reducer, localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []);

  // the mooooooost important function
  function reducer(state, action) {
    const uncompleteddivs = document.querySelectorAll("#uncompleted");
    const completeddivs = document.querySelectorAll("#completed");
    switch (action.type) {
      case "adding":
        return [...state, { text: action.value, info: "uncompleted" }];
      case "deleting":
        return state.filter((e, index) => {
          return index !== action.id;
        });
      case "checking":
        if (action.condition) {
          action.element.classList.add("completed");
        } else {
          action.element.classList.remove("completed");
        }
        return state.map((task, index) => {
          if (action.id === index) {
            return { ...task, info: action.condition ? "completed" : "uncompleted", id: index };
          } else {
            return { ...task };
          }
        });
      case "completed":
        uncompleteddivs.forEach((ele) => {
          ele.style.display = "none";
        });
        completeddivs.forEach((ele) => {
          ele.style.display = "flex";
        });
        return state;
      case "uncompleted":
        uncompleteddivs.forEach((ele) => {
          ele.style.display = "flex";
        });
        completeddivs.forEach((ele) => {
          ele.style.display = "none";
        });
        return state;
      case "all":
        completeddivs.forEach((ele) => {
          ele.style.display = "flex";
        });
        uncompleteddivs.forEach((ele) => {
          ele.style.display = "flex";
        });
        return state;
      default:
        return state;
    }
  };
  // upload data to localstorage
  useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(state))
  },[state])
  // the finel result
  return (
    <div className='container bg-light mt-5'>
      <ListContext.Provider value={[state, dispatch ]}>
        <AddingDiv />
        <Tasks />
      </ListContext.Provider>
    </div>
  );
}

export default App;
