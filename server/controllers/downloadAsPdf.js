const puppeteer = require("puppeteer");
const Project = require("../models/projectModel");
const { generateProjectHtml } = require("./generateProjectHtml");

const downloadAllContent = async (req, res) => {
  try {
    const { project_id } = req.params;

    // const projectDoc = await Project.find({ _id: project_id })
    //   .populate("project_budget")
    //   .populate("project_risks")
    //   .populate("project_phases")
    //   .populate("project_sprints")
    //   .populate("project_stackholder")
    //   .populate("project_audit_history")
    //   .populate("project_operational_matrix")
    //   .populate("project_financial_matrix")
    //   .populate("project_technical_matrix")
    //   .populate("project_version_history")
    //   .populate("project_users");

    // if (!projectDoc) {
    //   return res.status(409).json({ message: "Project does not exists" });
    // }

  
      // Create a browser instance
      const browser = await puppeteer.launch();
      // Create a new page
      const page = await browser.newPage();

      const htmlContent = `
      <html>
      <head>
          <title>Audit History Table</title>
      </head>
      <body>
          <table border="1">
              <tr>
                  <th>Date of Audit</th>
                  <th>Reviewed By</th>
                  <th>Status Reviewed</th>
                  <th>Section</th>
                  <th>Comment/Queries</th>
                  <th>Action Items</th>
              </tr>
              <!-- You can add more rows with data here -->
              <tr>
                  <td>Example Date</td>
                  <td>Example Reviewer</td>
                  <td>Example Status</td>
                  <td>Example Section</td>
                  <td>Example Comment/Query</td>
                  <td>Example Action Item</td>
              </tr>
          </table>
      </body>
      </html>
      `;

      // Set the content of the page
      await page.setContent(htmlContent);

      // Download the PDF
      const pdf = await page.pdf({ format: "A4", printBackground: true });

      // Close the browser instance
      await browser.close();

      // Send the PDF as a response
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
      });
      res.send(pdf);
    
  } catch (error) {
    console.error("Error converting HTML to PDF:", error);
    res.status(500).send("Error converting HTML to PDF");
  }
};

module.exports = { downloadAllContent };
