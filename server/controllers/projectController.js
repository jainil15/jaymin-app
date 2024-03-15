const Project = require("../models/projectModel");
const Budget = require("../models/budgetModel");
const ClientFeedback = require("../models/clientfeedbackmodel");
const Momsclient = require("../models/momsclientmodel");
const ProjectUpdates = require("../models/projectupdateModel");
const Resource = require("../models/resourcemodel");
const Team = require("../models/teamModel");

const nodemailer = require("nodemailer");

// CREATE PROJECT
const createProject = async (req, res, next) => {
  try {
    const {
      project_name,
      project_desc,
      project_scope,
      project_stack,
      client_name,
      client_email,
      project_manager,
      project_manager_email,
      project_status,
    } = req.body;
    const projectExists = await Project.findOne({ project_name });

    if (projectExists) {
      return res.status(409).json({ message: "Project already exists" });
    }

    const projectDoc = await Project.create({
      project_name,
      project_desc,
      project_scope,
      project_stack,
      client_name,
      client_email,
      project_manager,
      project_manager_email,
      project_status,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: client_email,
      subject: "Welcome to Our Project Management Platform",
      html: `
        <p>Dear ${client_name},</p>
        <p>Thank you for choosing our platform! We're excited to have you on board for your project, "${project_name}".</p>
        <p>Here are some important details:</p>
        <ul>
          <li>Project Name: ${project_name}</li>
          <li>Scope: ${project_scope}</li>
          <li>Project Manager: ${project_manager}</li>
        </ul>
        <p>You can access the platform and download the report pdf on : <a href="http://localhost:3000">Project Management Platform</a></p>
        <p>If you have any questions or need assistance, feel free to reach out to your project manager or our support team.</p>
        <p>Thank you once again, and we look forward to a successful collaboration!</p>
        <p>Best regards</p>
      `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return res.status(200).json({ message: "Project created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DISPLAY ALL PROJECTS
const displayProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({})
    .populate("project_momsclients")
      .populate("project_feeback")
      .populate("project_resources")
      .populate("project_projectUpdates")
      .populate("project_team")
      .populate("project_budget")
      .populate("project_risks")
      .populate("project_sprints")
      .populate("project_stackholder")
      .populate("project_audit_history")
      .populate("project_operational_matrix")
      .populate("project_financial_matrix")
      .populate("project_technical_matrix")
      .populate("project_milestone")
      .populate("project_version_history");

    if (projects) {
      return res.status(200).json(projects);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  const projectDoc = await Project.findById(id);
  if (!projectDoc) {
    return res.status(404).json({ message: "Project not found" });
  }

  await Project.deleteOne({ _id: id });
  return res.status(200).json({ message: "Project deleted successfully" });
};

// EDIT PROJECT
const editProject = async (req, res, next) => {
  try {
    const {
      project_id,
      project_name,
      project_desc,
      project_scope,
      project_stack,
      project_manager,
      client_name,
      client_email,
      project_manager_email,
      project_status,
    } = req.body;

    console.log(req.body);  

    const projectDoc = await Project.findById(project_id);

    if (!projectDoc) {
      return res.status(409).json({ message: "Project does not exist" });
    }

    projectDoc.project_name = project_name;
    projectDoc.project_desc = project_desc;
    projectDoc.project_scope = project_scope;
    projectDoc.project_stack = project_stack;
    projectDoc.project_manager = project_manager;
    projectDoc.project_manager_email = project_manager_email;
    projectDoc.client_name = client_name;
    projectDoc.client_email = client_email;
    projectDoc.project_status = project_status;
    projectDoc.updatedAt = Date.now();

    await projectDoc.save();

    return res.status(200).json({ message: "Project edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// FETCH ONE PROJECT - THIS API FETCHES ALL DETAILS ABOUT PROJECT LIKE BUDGET, AUDIT HISTORY, AND MANY MORE
const fetchOneProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const projectDoc = await Project.findById(id)
    .populate("project_momsclients")
      .populate("project_feeback")
      .populate("project_resources")
      .populate("project_projectUpdates")
      .populate("project_team")
      
      .populate("project_budget")
      .populate("project_risks")
      .populate("project_sprints")
      .populate("project_stackholder")
      .populate("project_audit_history")
      .populate("project_operational_matrix")
      .populate("project_financial_matrix")
      .populate("project_technical_matrix")
      .populate("project_milestone")
      .populate("project_version_history");

    if (!projectDoc) {
      return res.status(409).json({ message: "Project does not exist" });
    }

    return res.status(200).json(projectDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};


module.exports = {
  createProject,
  displayProjects,
  deleteProject,
  editProject,
  fetchOneProject,
};