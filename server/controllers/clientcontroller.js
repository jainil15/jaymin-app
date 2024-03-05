const ClientFeedback = require('../models/clientfeedbackmodel');

const addClientFeedback = async (req, res) => {
    try {
        const { feedbackType, nameofclient, projectname, date, detailedFeedback, actionTaken, closureDate } = req.body;

        const clientFeedbackDoc = await ClientFeedback.create({
            feedbackType,
            nameofclient,
            projectname,
            date,
            detailedFeedback,
            actionTaken,
            closureDate,
        });

        return res.status(200).json(clientFeedbackDoc);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error occurred ${error}` });
    }
};

const getClientFeedbacks = async (req, res) => {
    try {
        const clientFeedbacks = await ClientFeedback.find({});
        return res.status(200).json(clientFeedbacks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error occurred ${error}` });
    }
};

const editClientFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { feedbackType, nameofclient, projectname, date, detailedFeedback, actionTaken, closureDate } = req.body;

        const clientFeedbackDoc = await ClientFeedback.findByIdAndUpdate(
            id,
            {
                feedbackType,
                nameofclient,
                projectname,
                date,
                detailedFeedback,
                actionTaken,
                closureDate,
            },
            { new: true }
        );

        if (!clientFeedbackDoc) {
            return res.status(404).json({ message: 'No client feedback found with this id' });
        }

        return res.status(200).json(clientFeedbackDoc);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error occurred ${error}` });
    }
};

const deleteClientFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const clientFeedbackDoc = await ClientFeedback.findByIdAndDelete(id);
        return res.status(200).json(clientFeedbackDoc);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error occurred ${error}` });
    }
};

module.exports = {
    addClientFeedback,
    getClientFeedbacks,
    editClientFeedback,
    deleteClientFeedback,
};
