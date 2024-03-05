import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const FeedbackFetch = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [editedFeedback, setEditedFeedback] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4004/client/get-clientfeedbacks');
                setFeedbacks(response.data);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };
        fetchData();
    }, []);

    const handleChange = (event, id, field) => {
        const updatedFeedbacks = feedbacks.map(feedback => {
            if (feedback._id === id) {
                return {
                    ...feedback,
                    [field]: event.target.value,
                };
            }
            return feedback;
        });
        setFeedbacks(updatedFeedbacks);
        setEditedFeedback(id);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editedFeedback) {
            const feedback = feedbacks.find(feedback => feedback._id === editedFeedback);
            try {
                await axios.put(`http://localhost:4004/client/edit-clientfeedback/${editedFeedback}`, feedback);
                window.location.reload();
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">All Client Feedbacks</h2>
            <form onSubmit={handleSubmit}>
                <table className="table-auto w-full mx-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Feedback Type</th>
                            <th className="px-4 py-2">Date Received</th>
                            <th className="px-4 py-2">Detailed Feedback</th>
                            <th className="px-4 py-2 hover:bg-gray-100">Action Taken (Editable)</th>
                            <th className="px-4 py-2 hover:bg-gray-100">Closure Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(feedback => (
                            <tr key={feedback._id}>
                                <td className="border px-4 py-2">{feedback.feedbackType}</td>
                                <td className="border px-4 py-2">{format(parseISO(feedback.date), 'dd/MM/yyyy')}</td>
                                <td className="border px-4 py-2">{feedback.detailedFeedback}</td>
                                <td className="border px-4 py-2 hover:bg-gray-200">
                                    <input
                                        type="text"
                                        value={feedback.actionTaken || ''}
                                        onChange={(event) => handleChange(event, feedback._id, 'actionTaken')}
                                    />
                                </td>
                                <td className="border px-4 py-2 hover:bg-gray-200">
                                    {feedback.closureDate ? format(parseISO(feedback.closureDate), 'dd/MM/yyyy') :
                                        <input
                                            type="date"
                                            onChange={(event) => handleChange(event, feedback._id, 'closureDate')}
                                        />
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block">
                    Save
                </button>
            </form>
        </div>
    );
};

export default FeedbackFetch;
