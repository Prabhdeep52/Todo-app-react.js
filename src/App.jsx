import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { ToDoProvider } from './context'
import TodoForm from './components/ToDoForm'
import TodoItem from './components/ToDoItem'

function App() {
  const [todos , setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prevTodos) => [{id:Date.now() , ...todo} , ...prevTodos ])
  }

  const updateTodo = (id , newTodo) => {
    setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? newTodo : todo))
  }

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))// it will return all the todos except the one with the id we passed
  }
  
  const toggleComplete = (id) => {
    setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? {...todo , completed: !todo.completed} : todo))
  }
  
  // this will get called as soon as the component is rendered and will bring the todos from the local storage
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0){
      setTodos(todos)
    }
  } , [])  

  useEffect(()=>{
    localStorage.setItem('todos' , JSON.stringify(todos))
  }, [todos])

    return (
    <ToDoProvider value= {{todos , updateTodo , addTodo , toggleComplete , deleteTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>

                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                            <div key ={todo.id} className='w-full'>
                              <TodoItem todo={todo}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </ToDoProvider>
  )
}

export default App
