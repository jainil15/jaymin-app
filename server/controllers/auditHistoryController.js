const Project = require("../models/projectModel");
const AuditHistory = require("../models/auditHistoryModel");
const nodemailer = require("nodemailer");

// Function to send email
const sendAuditHistoryEmail = async (projectDoc, mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const clientEmail = projectDoc.client_email; // Fetch client email from project
    // also add project name to the subject
    const project_name = projectDoc.project_name;
    mailOptions.subject = `Audit History for Project: ${project_name}`;

    const updatedMailOptions = { ...mailOptions, to: clientEmail }; // Update mail options with client email

    transporter.sendMail(updatedMailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

// CREATE AUDIT HISTORY
const createAuditHistory = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { dateOfAudit, reviewedBy, status, comment, actionItem } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this Audit" });
    }

    const auditHistoryDoc = await AuditHistory.create({
      dateOfAudit,
      reviewedBy,
      status,
      comment,
      actionItem,
    });

    // ADD AUDIT HISTORY ID TO PROJECT TABLE
    projectDoc?.project_audit_history?.push(auditHistoryDoc._id);
    const project_name = projectDoc.project_name;
    await projectDoc.save();

    // Send email to client
    const mailOptions = {
      from: process.env.EMAIL_USER,
      html: `
        <p>Hello,</p>
        <p>Your ${project_name} audit history details are given below:</p>
        <table style="border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid black; padding: 8px;">Field</th>
            <th style="border: 1px solid black; padding: 8px;">Value</th>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Date of Audit</td>
            <td style="border: 1px solid black; padding: 8px;">${dateOfAudit}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Reviewed By</td>
            <td style="border: 1px solid black; padding: 8px;">${reviewedBy}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Status</td>
            <td style="border: 1px solid black; padding: 8px;">${status}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Comment</td>
            <td style="border: 1px solid black; padding: 8px;">${comment}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Action Item</td>
            <td style="border: 1px solid black; padding: 8px;">${actionItem}</td>
          </tr>
        </table>
        <br />
        <p>Regards,</p>
        <p>Customer Sussess Platform</p>
      `,
    };

    await sendAuditHistoryEmail(projectDoc, mailOptions);

    return res.status(200).json({ message: "AuditHistory created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE AUDIT HISTORY
const deleteAuditHistory = async (req, res, next) => {
  try {
    const { project_id, auditHistory_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    //Remove from project table
    projectDoc.project_audit_history = projectDoc.project_audit_history.filter(
      (audit) => audit.toString() !== auditHistory_id
    );

    // Save the updated project document
    await projectDoc.save();
    const project_name = projectDoc.project_name;
    await AuditHistory.deleteOne({ _id: auditHistory_id });

    // Send email to client
    const mailOptions = {
      from: process.env.EMAIL_USER,
      html: `
        <p>Hello,</p>
        <p>An audit history for your ${project_name} has been deleted.</p>
        <br />
        <p>Regards,</p>
        <p>Customer Sussess platform</p>
      `,
    };

    await sendAuditHistoryEmail(projectDoc, mailOptions);

    return res.status(200).json({ message: "AuditHistory deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT AUDIT HISTORY
const editAuditHistory = async (req, res, next) => {
  try {
    const { dateOfAudit, reviewedBy, status, comment, actionItem } = req.body;
    const { auditHistory_id } = req.params;
    const auditHistoryDoc = await AuditHistory.findOne({
      _id: auditHistory_id,
    });

    if (!auditHistoryDoc) {
      return res.status(409).json({ message: "AuditHistory does not exist" });
    }

    await auditHistoryDoc.set({
      dateOfAudit,
      reviewedBy,
      status,
      comment,
      actionItem,
    });

    await auditHistoryDoc.save();

    const projectDoc = await Project.findOne({ project_audit_history: auditHistory_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found for this Audit History" });
    }

    const project_name = projectDoc.project_name; // Fetch project name from projectDoc

    // Send email to client
    const mailOptions = {
      from: process.env.EMAIL_USER,
      html: `
        <p>Hello,</p>
        <p>An audit history for your ${project_name} has been updated.</p>
        <table style="border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid black; padding: 8px;">Field</th>
            <th style="border: 1px solid black; padding: 8px;">Value</th>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Date of Audit</td>
            <td style="border: 1px solid black; padding: 8px;">${dateOfAudit}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Reviewed By</td>
            <td style="border: 1px solid black; padding: 8px;">${reviewedBy}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Status</td>
            <td style="border: 1px solid black; padding: 8px;">${status}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Comment</td>
            <td style="border: 1px solid black; padding: 8px;">${comment}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 8px;">Action Item</td>
            <td style="border: 1px solid black; padding: 8px;">${actionItem}</td>
          </tr>
        </table>
        <br />
        <p>Regards,</p>
        <p>Your Company Name</p>
      `,
    };

    await sendAuditHistoryEmail(projectDoc, mailOptions);

    return res.status(200).json({ message: "AuditHistory edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};


module.exports = { createAuditHistory, deleteAuditHistory, editAuditHistory };
