const Project = require("../models/projectModel");
const Milestone = require("../models/MlieStoneModel");


// CREATE MILESTONE
const createMilestone = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const {
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this milestone" });
    }

    const milestoneDoc = await Milestone.create({
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    });

    // ADD MILESTONE ID TO PROJECT TABLE
    projectDoc?.project_milestone.push(milestoneDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "Milestone created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE MILESTONE
const deleteMilestone = async (req, res, next) => {
  try {
    const { project_id, milestone_id } = req.params;
    
    const projectDoc = await Project.findById(project_id);

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the milestone exists in the project
    const milestoneIndex = projectDoc.project_milestone.findIndex(
      milestone => milestone.toString() === milestone_id
    );

    if (milestoneIndex === -1) {
      return res.status(404).json({ message: "Milestone not found in project" });
    }

    // Remove the milestone with the specified milestone_id
    projectDoc.project_milestone.splice(milestoneIndex, 1);

    // Save the updated project document
    await projectDoc.save();

    // Delete the milestone document
    await Milestone.deleteOne({ _id: milestone_id });

    return res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// EDIT MILESTONE
const editMilestone = async (req, res, next) => {
  try {
    const {
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    } = req.body;
    const { milestone_id } = req.params;
    const milestoneDoc = await Milestone.findOne({ _id: milestone_id });

    if (!milestoneDoc) {
      return res.status(409).json({ message: "Milestone does not exist" });
    }

    await milestoneDoc.set({
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    });

    await milestoneDoc.save();
    return res.status(200).json({ message: "Milestone edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = { createMilestone, deleteMilestone, editMilestone }; // Fixed export statement
