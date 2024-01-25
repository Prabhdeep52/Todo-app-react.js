import React , {useState} from "react";
import { useTodo } from "../context";

function TodoForm() {
    
    const [todo , setTodo] = useState("") 
    const {addTodo} = useTodo() ; // we are getting the addTodo function from the context , we can use  useTOdo anywhere in the app to get the context(all the functions and todos)

    const add = (e) => {
        e.preventDefault(); 

        if(!todo) return ; // if the todo is empty then return
        addTodo({todo , completed :false });
        setTodo(""); // this will clear the input field after adding the todo
    }

    return (
    
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 h-14 text-[14px]"
                value={todo}    
                onChange={(e) => setTodo (e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

