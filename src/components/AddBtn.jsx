import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm } from "react-hook-form";

const AddBtn = ({ newTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    newTodo({
      id: Date.now(),
      text: data.task,
      category: data.category,
      isComplete: false,
    });

    reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="place-self-center flex flex-col"
      >
        <div className="flex items-center my-7 bg-gray-200 rounded-md">
          <textarea
            className="bg-transparent border-0 outline-none flex-1 scrollbar-thin
          h-14 pl-6 pr-2 placeholder:text-slate-600 resize rounded-md 
          scrollbar-track-transparentscrollbar-thumb-orange-600 p-2
          scrollbar-corner-transparent min-h-[40px] max-h-[350px]"
            placeholder="Add your Task"
            {...register("task", { required: "Task is required" })}
          />
        </div>

        {errors.task && <p className="text-red-500">{errors.task.message}</p>}

        <div className="flex bg-transparent justify-center gap-10">
          <select
            {...register("category", { required: "Please select a category" })}
            className="bg-orange-600 border-0  rounded-md text-white w-32 h-12"
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>

          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}

          <button
            type="submit"
            className="border-none rounded-md bg-orange-600 w-32 h-12 
          text-white text-lg font-medium cursor-pointer"
          >
            ADD +
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default AddBtn;
