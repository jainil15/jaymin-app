import React, { useState } from 'react';
import axios from 'axios';

const Client = () => {
    const [clientName, setClientName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [feedbackType, setFeedbackType] = useState('');
    const [detailedFeedback, setDetailedFeedback] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [actionTaken, setActionTaken] = useState(null);
    const [closureDate, setClosureDate] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const feedback = {
            nameofclient: clientName,
            projectname: projectName,
            feedbackType,
            detailedFeedback,
            date,
        };
        try {
            const response = await axios.post('http://localhost:4004/client/add-clientfeedback', feedback);

            console.log(response.data);

            // Clear form fields
            setClientName('');
            setProjectName('');
            setFeedbackType('');
            setDetailedFeedback('');
            setDate(new Date().toISOString().slice(0, 10));

            // Reload the page to fetch updated data
            window.location.reload();
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-8">
            <form onSubmit={handleSubmit} className="rounded px-4 py-8 mb-4 bg-white shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientName">
                        Name of Client:
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="clientName"
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                        Project Name:
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="projectName"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedbackType">
                        Feedback Type:
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="feedbackType"
                            value={feedbackType}
                            onChange={(e) => setFeedbackType(e.target.value)}
                            required
                        >
                            <option value="">Select...</option>
                            <option value="complaint">Complaint</option>
                            <option value="appreciation">Appreciation</option>
                        </select>
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detailedFeedback">
                        Detailed Feedback:
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="detailedFeedback"
                            value={detailedFeedback}
                            onChange={(e) => setDetailedFeedback(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Date:
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Client;
