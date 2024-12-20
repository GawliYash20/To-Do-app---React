import React, { useEffect, useRef, useState } from "react"
import todo_icon from "../assets/calendar-days-regular.svg"
import ToDoItems from "./ToDoItems"
import toast from "react-hot-toast";



interface Todo {
    id: number;
    text: string;
    isComplete: boolean;
    date: Date;
}

const ToDo = () => {

    const [todoList, setToDoList] = useState<Todo[]>(() => {
                                                            const storedTodos = localStorage.getItem("TodoList");
                                                            return storedTodos ? JSON.parse(storedTodos) : [];
                                                        });

    useEffect(() => {
        localStorage.setItem("TodoList", JSON.stringify(todoList));
        todoList.forEach((todo) => dateAlert(todo));
    }, [todoList])


    const inputRef = useRef<HTMLInputElement>(null);
    const inputDateRef = useRef<HTMLInputElement>(null);

    const add = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (inputRef.current !== null && inputDateRef.current?.value) { // Ensure both values are not null or undefined
            const inputText = inputRef.current.value.trim();
            const inputDate = inputDateRef.current.value; // This will always be a string, as checked
            if (inputText === "" || inputDate === "") {
                return null;
            }
    
            // Convert string date to Date object
            const todoDate = new Date(inputDate);
    
            const newTodo: Todo = {
                id: Date.now(),
                text: inputText,
                date: todoDate, // Store as Date object
                isComplete: false,
            };
    
            setToDoList((prevTodo) => [...prevTodo, newTodo]);
    
            inputRef.current.value = ""; // Clear the input field
        } else {
            console.error("Input reference is null or date value is undefined.");
        }
    };
    

    const deleteTodo = (id: number) => {
        return setToDoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id))
    }

    const toggle = (id: number) => {
        setToDoList((prevTodos) => {
            return prevTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, isComplete: !todo.isComplete }
                    : todo // Ensure other todos remain unchanged
            );
        });
    };

    const dateAlert = (todo: Todo) => {
        const currentDate = new Date();
        const todoDate = new Date(todo.date); // Convert the date object if stored in string
        const diffTime = Math.abs(todoDate.getTime() - currentDate.getTime()); // Get the difference in milliseconds
        if (diffTime < 0) {
            toast.error(`Task date is on due. Task: ${todo.text}`)
        }

    }


    return (
        <div className='bg-white place-self-center w-11/12 max-w-md
            flex flex-col p-7 min-h-[550px] rounded-xl'>


            {/* ---------Title---------- */}

            <div className='flex items-center mt-7 gap-2'>
                <img className="w-8" src={todo_icon} alt="Todo-icon" />
                <h1 className="text-3xl font-semibold">To-Do-List</h1>
            </div>

            {/* ---------------Input Box ---------- */}
            <div className="flex items-center my-7 bg-stone-400 rounded-full">
                <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 text-slate-900 font-medium  placeholder:text-stone-600 " type="text" placeholder="Add your task" />
                <input ref={inputDateRef} type="date" className="bg-transparent w-5 h-14 mr-2 cursor-pointer"/>
                <button onClick={(e) => add(e)} className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer hover:bg-orange-500 transition-colors">ADD</button>
            </div>

            {/* ---------------Task List ---------- */}
            <div>
                {todoList.map((item, index) => (
                    <ToDoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} date={item.date}
                        deleteTodo={deleteTodo} toggle={toggle}/>
                ))}
            </div>
        </div>
    )
}

export default ToDo