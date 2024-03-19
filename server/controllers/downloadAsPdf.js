// Importing required modules
const puppeteer = require("puppeteer");
const Project = require("../models/projectModel.js");
const { ProjectHtml } = require("./ProjectHtml.js");

// Function to download all content
const downloadAllContent = async (req, res) => {
  // Extract project_id from request parameters
  const { project_id } = req.params;

  try {
    // Fetch the project document from the database
    const projectDoc = await Project.find({ _id: project_id })
      .populate("project_risks")
      .populate("project_sprints")
      .populate("project_audit_history")
      .populate("project_operational_matrix")
      .populate("project_financial_matrix")
      .populate("project_technical_matrix")
      .populate("project_version_history");

    // If the project does not exist, return an error response
    if (!projectDoc) {
      return res.status(409).json({ message: "Project does not exist" });
    }

    // Generate HTML content dynamically using ProjectHtml function
    const htmlContent = ProjectHtml(projectDoc);

    // Create a new browser instance using Puppeteer
    const browser = await puppeteer.launch();
    // Create a new page in the browser
    const page = await browser.newPage();

    // Set the content of the page with the dynamically generated HTML
    await page.setContent(htmlContent);

    // Generate a PDF from the page content
    const pdf = await page.pdf({ format: "A4", printBackground: true });

    // Close the browser instance
    await browser.close();

    // Set the response headers
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });

    // Send the PDF as a response
    res.send(pdf);
  } catch (error) {
    // Log the error and send an error response if something goes wrong
    console.error("Error in downloadAllContent:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Export the function
module.exports = { downloadAllContent };
