import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddBtn from "./AddBtn";
import Category from "./Category";
import todo_icon from "../assets/todo_icon.png";
import EditModal from "./EditModal";
import useDeleteConfirmer from "../hooks/useDeleteConfirmer";
import { getTodosFromLocalstorage } from "../helpers/localstorage-manager";


const Todo = () => {
  
  const {isAddModalOpen, openAddModal, closeAddModal} = useAddModal();
  const {confirmDelete} =useDeleteConfirmer();
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track the task to edit
  // Store the task details
  const [taskToEdit, setTaskToEdit] = useState({ text: "", category: "" });

  // Load todoList from localStorage on page load
  useEffect(() => {
    const todos = getTodosFromLocalstorage()
    setTodoList(todos);
  }, []);

  // Save todoList to localStorage whenever it changes
  useEffect(() => {
    saveTodosIntoLocalStorage(todoList);
  }, [todoList]);

  const newTodo = (newTodo) => {
    setTodoList((prevTodoList) => [newTodo, ...prevTodoList]);
    closeAddModal();
  };

  const editTodo = (index) => {
    setEditIndex(index); // Set the index of the task to edit
    setTaskToEdit({ ...todoList[index] }); // Set the current task details for editing
    setIsEditModalOpen(true); // Open the edit modal
  };

  const saveEditedTask = (updatedTask) => {
    const updatedTasks = [...todoList];
    updatedTasks[editIndex] = updatedTask; // Update the task at the selected index
    setTodoList(updatedTasks); // Update the state
    setIsEditModalOpen(false); // Close the modal after saving
  };

  // Confirm before deleting todo and save changes to localStorage
  const deleteTodo = (index) => {

    confirmDelete(()=>{
      const updatedTodos = [...todoList];
      updatedTodos.splice(index, 1); // Remove the task at the selected index
      setTodoList(updatedTodos); // Update state with the new list
      localStorage.setItem("todoList", JSON.stringify(updatedTodos)); // Save the updated list to localStorage
    })
  };

  const onCheckChangedCb = (index) => {
    const updatedTodos = [...todoList];
    updatedTodos[index].isComplete = !updatedTodos[index].isComplete;
    setTodoList(updatedTodos);
  };

  const filteredTodoList =
    filter === "All"
      ? todoList
      : todoList.filter((todo) => todo.category === filter);

  return (
    <div
      className="bg-white place-self-center w-[500px] flex flex-col p-7 min-h-[650px]
     rounded-xl max-h-[650px]"
    >
      <div className="flex items-center my-3 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do-List</h1>
      </div>

      <button
        className="bg-orange-600 text-white py-2 px-4 rounded-md mb-4"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add New Task
      </button>

      <div className="flex-2 justify-between my-4">
        <Category selectedFilter={filter} onCategoryChange={setFilter} />
      </div>

      <div
        className="overflow-auto scrollbar-thin scrollbar-thumb-orange-500
       scrollbar-track-transparent"
      >
        <TodoList
          todoList={filteredTodoList}
          deleteTodo={deleteTodo}
          onCheckChangedCb={onCheckChangedCb}
          editTodo={editTodo}
        />
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeAddModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
            <AddBtn newTodo={newTodo} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <EditModal
          task={taskToEdit}
          onSave={saveEditedTask}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Todo;
