import { useContext,useState } from "react"
import { ListContext } from "./App"

const Addingdiv = () => {
  // ussing context for dispatch
  const [, dispatch] = useContext(ListContext);
  const [ inputvalue, setinputvalue ] = useState();

  // result of input section
    return (
      <div className="d-flex align-items-baseline">
        <input id="input" type="text" placeholder="add a new task" onChange={(ele)=>{return setinputvalue(ele.currentTarget.value);}} className="border w-75 rounded-pill m-3 ps-3" />
        <button className="border text-white rounded-pill" onClick={() => dispatch({ type: "adding",value:inputvalue })}>
          add task
        </button>
      </div>
    );
}

export default Addingdiv