import { useEffect, useState } from "react";

function App() {
  const [todos,setTodos] = useState([])

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
    </div>
  );
}

export default App;
