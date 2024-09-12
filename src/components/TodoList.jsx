import React from "react";
import delete_icon from "../assets/delete_icon.png";
import edit_icon from "../assets/edit_icon.png";

const TodoList = ({ todoList, deleteTodo, onCheckChangedCb, editTodo }) => {
  return (
    <ul>
      {todoList.map((todoList, index) => (
        <div className="flex items-center my-6 gap-2 " key={index}>
          <div className="flex flex-1 items-center cursor-pointer">
            <input
              className="cursor-pointer appearance-none m-1 w-5 h-5 border border-1 rounded-full 
              checked:bg-orange-600 checked:border-transparent focus:outline-none 
              focus:ring-2 focus:ring-orange-600 relative 
               after:content-[''] after:absolute after:top-[2px]
               after:left-[6px] after:w-[6px] 
               after:h-[12px] after:border-r-2 after:border-b-2
             after:border-white after:rotate-45 after:scale-0 
               checked:after:scale-100 transition-all duration-300"
              type="checkbox"
              onClick={() => onCheckChangedCb(index)}
              checked={todoList.isComplete}
              readOnly
            />
            <li
              className={`text-slate-700 ml-3 text-[17px] break-words max-w-[330px] ${
                todoList.isComplete ? "line-through" : ""
              }`}
            >
              {todoList.text} -{" "}
              <span className="text-gray-500">{todoList.category}</span>
            </li>
          </div>

          <img
            onClick={() => editTodo(index)}
            className="w-5 cursor-pointer"
            src={edit_icon}
            alt="edit"
          />

          <img
            onClick={() => deleteTodo(index)}
            className="w-4 cursor-pointer mr-2"
            src={delete_icon}
            alt="delete"
          />
        </div>
      ))}
    </ul>
  );
};

export default TodoList;
