import { useEffect, useState } from "react";

function App() {
  const [todos,setTodos] = useState([])
  const [popupActive,setPopupactive] = useState(false)
  const [newTodo,setNewTodo] = useState('')

  useEffect(()=>{
    GetTodos()
  },[])

  const GetTodos = ()=>{
    fetch("http://localhost:3007/todos")
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.log(err))
  }

  const complete_todo = async (id) => {
    try {
      const data = await fetch(`http://localhost:3007/todo/complete/${id}`)
        .then(res => res.json())
        .catch(err => console.log(err));
  
      setTodos(todos.map(todo => (todo._id === data._id ? { ...todo, complete: data.complete } : todo)));
    } catch (err) {
      console.log(err);
    }
  };
  const delete_todo = async (id) => {
    try {
      const data = await fetch(`http://localhost:3007/todo/delete/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .catch(err => console.log(err));
  
      setTodos(todos.filter(todo => todo._id !== data._id));
    } catch (err) {
      console.log(err);
    }
  };
  const addTodo = async()=>{
    const data = await fetch("http://localhost:3007/todo/new",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      })
    }).then(res=> res.json())

    setTodos([...todos,data])
  }
  return (
    <div className="App">
      <h1>Your To-do List</h1>
      {todos.map(todo =>(
         <div className="tasks" key={todo._id} >
            <div className={"todo-"+ (todo.complete? "iscomplete":"")} onClick={()=>complete_todo(todo._id)}>
            </div>
            <div className="main-text">{todo.text}</div>
            <div className="cross" onClick={()=> delete_todo(todo._id)}>X</div>
          </div>
      ))}
      <div className="addPopup" onClick={()=>setPopupactive(true)}>+</div>
      {
        popupActive?(
          <div className="popup">
            <div className="cross" onClick={()=> setPopupactive(false)}>X</div>
            <div className="content">
              <input type="text" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} placeholder="New Task"/>
              <button className="button" onClick={()=> {
                addTodo()
                setNewTodo('')
              }}>Add Task</button>
            </div>
          </div>
        ) :''
      }
    </div>
  );
}

export default App;
