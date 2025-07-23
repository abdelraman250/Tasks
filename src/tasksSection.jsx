import { useContext } from "react"
import { ListContext } from "./App"

const Tasks = () => {
    const [state, dispatch] = useContext(ListContext);


    return (
      <div>
        <div className="lists">
          <ul className="list-unstyled d-flex justify-content-around fs-4 fw-normal">
            <li onClick={() => { dispatch({type:"all"})}}>all</li>
            <li onClick={() => {dispatch({ type: "completed" });}}>completed</li>
            <li onClick={() => {dispatch({ type: "uncompleted" });}}>uncompleted</li>
          </ul>
        </div>
        <div className="tasks" id="tasks">
                {state.map((task, index) => {
                    return <div className="diff m-3 align-items-baseline" key={index} id={task.info === "completed" ? "completed" : "uncompleted"}>
                        <div className="d-flex align-items-center">
                            <input type="checkbox" id="inputadd" checked={task.info === "completed" ? true : false} onChange={(e) => {
                                dispatch({ type: "checking", element: e.target.nextElementSibling, condition: e.target.checked, id: index });
                            }} />
                            <label htmlFor="inputadd" className={task.info === "completed" ? "completed" : "uncompleted"}>{task.text} </label>
                        </div>
                        <button className="border text-white rounded-pill" onClick={() => dispatch({ type: "deleting", id: index })}>delete</button>
                    </div>
                })
                }
        </div>
      </div>
    );
}

export default Tasks