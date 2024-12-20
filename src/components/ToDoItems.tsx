import React from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import formatDate from '../utils/formatDate';

interface ToDoItemsProps {
    id: number;
    text: string;
    isComplete: boolean;
    date: Date;
    deleteTodo: (id: number) => void;
    toggle: (id: number) => void;
    
}




const ToDoItems: React.FC<ToDoItemsProps> = ({ id, text, isComplete, date, deleteTodo, toggle}) => {
    return (
        <div className='flex items-center justify-between gap-4 py-2 px-4 mb-2 bg-stone-200 rounded-lg shadow-sm max-w-5xl hover:shadow-inner transition-shadow'>
            <div className='flex items-center flex-1'>
                <input
                    type='checkbox'
                    checked={isComplete}
                    onChange={() => toggle(id)}
                    className='checkbox w-5 h-5 rounded-full  border-gray-300 text-orange-600 focus:ring-orange-500 transition-all'
                />
                <li className={`text-slate-900 font-sans text-[16px] ml-3 ${isComplete ? 'line-through' : ''} decoration-slate-500 flex-1 truncate list-none cursor-pointer`} onClick={() => toggle(id)} id={id.toString()} style={{wordBreak: 'break-word', whiteSpace: 'normal'}}>
                    {`${text} - (${formatDate(date.toString())})`}
                </li>
            </div>
            <button
                type='button'
                className='flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-colors'
                onClick={() => deleteTodo(id)}
            >
                <MdOutlineDelete className='w-5 h-5 text-red-600' />
            </button>
        </div>
    );
};

export default ToDoItems;
