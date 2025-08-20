import axios from "axios";
import { AppBar } from "../components/AppBar"
import { BACKEND_URL } from "../config";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div>
        <AppBar />
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                <input
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    type="text" 
                    className="block w-full px-6 py-4 text-base text-gray-700 bg-white border-0 resize-none focus:outline-none focus:ring-0 placeholder-gray-400 shadow-lg rounded-xl transition-all duration-200 hover:shadow-xl focus:shadow-xl" 
                    placeholder="Title" 
                />
                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                <button
                    onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        navigate(`/blog/${response.data.id}`)
                    }}
                    type="submit" 
                    className="mt-4 inline-flex items-center px-8 py-3 text-sm font-semibold text-center text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-4">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                    <div className="bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            onChange={onChange}
                            id="editor" 
                            rows={8} 
                            className="block w-full px-6 py-4 text-base text-gray-700 bg-white border-0 pl-6 resize-none focus:outline-none focus:ring-0 placeholder-gray-400" 
                            placeholder="Write an article..." 
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}