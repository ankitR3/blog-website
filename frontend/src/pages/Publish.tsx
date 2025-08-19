import { AppBar } from "../components/AppBar"

export const Publish = () => {
    return <div>
        <AppBar />
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                <input type="text" className="bg-white border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-lg placeholder-gray-400 transition-all duration-200 hover:shadow-xl focus:shadow-xl" placeholder="Title" />
                <TextEditor />
            </div>
        </div>
    </div>
}


function TextEditor() {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                    <div className="bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea 
                            id="editor" 
                            rows={8} 
                            className="block w-full px-6 py-4 text-base text-gray-700 bg-white border-0 pl-6 resize-none focus:outline-none focus:ring-0 placeholder-gray-400" 
                            placeholder="Write an article..." 
                            required 
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="mt-4 inline-flex items-center px-8 py-3 text-sm font-semibold text-center text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                    Publish post
                </button>
            </div>
        </div>
    );
}