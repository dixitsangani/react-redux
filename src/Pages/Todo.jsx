import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from '../Redux/ActionTypes';
import axios from 'axios';
import { getTogo } from '../Redux/Action';

export default function Todo() {
    const [inputData, setInputData] = useState("");
    const [edit, setEdit] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [category, setCategory] = useState("");
    const [filter, setFilter] = useState("");

    const dispatch = useDispatch();
    const todoData = useSelector(store => store.todo);

    useEffect(() => {
        getTogo(dispatch);
    }, [dispatch]);

    const handleTodoSubmit = (e) => {
        e.preventDefault();
        const todoItem = { todo: inputData, completed, category };

        if (edit) {
            axios.patch(`http://localhost:9090/todo/${edit.id}`, todoItem)
                .then((res) => {
                    dispatch({ type: UPDATE_TODO, payload: res.data });
                    resetForm();
                });
        } else {
            axios.post(`http://localhost:9090/todo`, todoItem)
                .then((res) => {
                    dispatch({ type: ADD_TODO, payload: res.data });
                    resetForm();
                });
        }
    };

    const resetForm = () => {
        setInputData("");
        setCompleted(false);
        setCategory("");
        setEdit(null);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9090/todo/${id}`)
            .then(() => {
                dispatch({ type: DELETE_TODO, payload: id });
            });
    };

    const handleEdit = (id) => {
        const isEdited = todoData.find((item) => item.id === id);
        setEdit(isEdited);
        setInputData(isEdited.todo);
        setCompleted(isEdited.completed);
        setCategory(isEdited.category);
    };

    const filteredData = filter ? todoData.filter((item) => item.category === filter) : todoData;

    return (
        <div className="max-w-xl mx-auto p-4 shadow-lg rounded-lg bg-white">
            <h1 className="text-2xl text-center text-gray-800 mb-4">Todo App with Redux</h1>
            <form onSubmit={handleTodoSubmit} className="mb-4">
                <input
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    type="text"
                    placeholder="Enter your todo"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-gray-700">Completed</label>
                </div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                >
                    <option value="">Select category</option>
                    <option value="public">Public</option>
                    <option value="personal">Personal</option>
                    <option value="home">Home</option>
                </select>
                <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
                    {edit ? "Update" : "Add"}
                </button>
            </form>
            <div className="mb-4">
                <label className="mr-4">
                    <input
                        type="radio"
                        name="filter"
                        value=""
                        checked={filter === ""}
                        onChange={(e) => setFilter(e.target.value)}
                        className="mr-1"
                    />
                    All
                </label>
                <label className="mr-4">
                    <input
                        type="radio"
                        name="filter"
                        value="public"
                        checked={filter === "public"}
                        onChange={(e) => setFilter(e.target.value)}
                        className="mr-1"
                    />
                    Public
                </label>
                <label className="mr-4">
                    <input
                        type="radio"
                        name="filter"
                        value="personal"
                        checked={filter === "personal"}
                        onChange={(e) => setFilter(e.target.value)}
                        className="mr-1"
                    />
                    Personal
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="home"
                        checked={filter === "home"}
                        onChange={(e) => setFilter(e.target.value)}
                        className="mr-1"
                    />
                    Home
                </label>
            </div>
            <div className="flex flex-col gap-4">
                {filteredData.map((item) => (
                    <div key={item.id} className="p-4 border border-gray-300 rounded flex justify-between items-center">
                        <div>
                            <h4 className="text-lg"> TASK :  {item.todo}</h4>
                            <h4 className="text-gray-600">TYPE :    {item.completed ? "Completed" : "Not Completed"}</h4>
                            <h5 className="text-gray-500">CATEGORY : {item.category}</h5>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(item.id)} className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
