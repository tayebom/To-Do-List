import React, { useState } from "react";

const EditModal = ({ task, onSave, onClose }) => {
  const [taskText, setTaskText] = useState(task.text);
  const [category, setCategory] = useState(task.category);
  const [error, setError] = useState(""); // For validation

  const handleSave = (event) => {
    event.preventDefault();

    // Validation for the task text
    if (taskText.trim() === "") {
      setError("Task text cannot be empty.");
      return;
    }

    if (category === "") {
      setError("Please select a category.");
      return;
    }

    // Save the updated task if validation passes
    onSave({ ...task, text: taskText, category });
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>

        <form onSubmit={handleSave}>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold">Task</label>
            <textarea
              className="border rounded-md p-2 w-full min-h-[50px] max-h-[350px]"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold">Category</label>
            <select
              className="border rounded-md p-2 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="bg-orange-600 text-white py-2 px-4 rounded-md w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
