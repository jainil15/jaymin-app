const ProjectHtml = (projectDoc) => {
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  let htmlContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          h1 {
            margin-top: 20px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #dddddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          p {
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Project Description</h1>
        <p>${projectDoc[0]?.project_desc}</p>
  
        <h1>Scope</h1>
        <p>${projectDoc[0]?.project_scope}</p>
  
        <h1>Project Stack (Tech)</h1>
        <div>${projectDoc[0]?.project_stack}</div>

        <h1>Audit History</h1>
        <table>
          <thead>
            <tr>
              <th>Date of Audit</th>
              <th>Reviewed By</th>
              <th>Status</th>
              <th>Comment/Queries</th>
              <th>Action Item</th>
            </tr>
          </thead>
          <tbody>`;
  projectDoc[0]?.project_audit_history.forEach((auditHistory) => {
    htmlContent += `
                    <tr>
                      <td>${formatDate(auditHistory.dateOfAudit)}</td>
                      <td>${auditHistory.reviewedBy}</td>
                      <td>${auditHistory.status}</td>
                      <td>${auditHistory.comment}</td>
                      <td>${auditHistory.actionItem}</td>
                    </tr>`;
  });
  htmlContent += `
          </tbody>
        </table>
  
        <h1>Version History</h1>
        <table>
          <thead>
            <tr>
              <th>Version</th>
              <th>Type</th>
              <th>Change</th>
              <th>Change Reason</th>
              <th>Created By</th>
              <th>Revision Date</th>
              <th>Approval Date</th>
              <th>Approved By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Initial</td>
              <td>Project initiation</td>
              <td>N/A</td>
              <td>Admin</td>
              <td>2024-02-28</td>
              <td>2024-02-28</td>
              <td>Admin</td>
            </tr>
          </tbody>
        </table>
  
        <h1>Escalation Matrix</h1>
        <h2>Operational Escalation Matrix</h2>
        <table>
          <thead>
            <tr>
              <th>Escalation Level</th>
              <th>Responsible</th>
            </tr>
          </thead>
          <tbody>`;
  projectDoc[0]?.project_operational_matrix.forEach((matrix) => {
    htmlContent += `
              <tr>
                <td>${matrix.level}</td>
                <td>${matrix.name}</td>
              </tr>`;
  });
  htmlContent += `
          </tbody>
        </table>
        <h2>Financial Escalation Matrix</h2>
        <table>
          <thead>
            <tr>
              <th>Escalation Level</th>
              <th>Responsible</th>
            </tr>
          </thead>
          <tbody>`;
  projectDoc[0]?.project_financial_matrix.forEach((matrix) => {
    htmlContent += `
              <tr>
                <td>${matrix.level}</td>
                <td>${matrix.name}</td>
              </tr>`;
  });
  htmlContent += `
          </tbody>
        </table>
        <h2>Technical Escalation Matrix</h2>
        <table>
          <thead>
            <tr>
              <th>Escalation Level</th>
              <th>Responsible</th>
            </tr>
          </thead>
          <tbody>`;
  projectDoc[0]?.project_technical_matrix.forEach((matrix) => {
    htmlContent += `
              <tr>
                <td>${matrix.level}</td>
                <td>${matrix.name}</td>
              </tr>`;
  });
  htmlContent += `
          </tbody>
        </table>
  
        <h1>Risk Profiling</h1>
        <table>
          <thead>
            <tr>
              <th>Risk Type</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Impact</th>
              <th>Remedial Steps</th>
              <th>Status</th>
              <th>Closure Date</th>
            </tr>
          </thead>
          <tbody>`;
  projectDoc[0]?.project_risks.forEach((risk) => {
    htmlContent += `
              <tr>
                <td>${risk.type}</td>
                <td>${risk.description}</td>
                <td>${risk.severity}</td>
                <td>${risk.impact}</td>
                <td>${risk.remedialSteps}</td>
                <td>${risk.status}</td>
                <td>${formatDate(risk.closureDate)}</td>
              </tr>`;
  });
  htmlContent += `
          </tbody>
        </table>
  
        <h1>Sprint wise detail</h1>
        <table>
          <thead>
            <tr>
              <th>Sprint</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>`;
  projectDoc[0]?.project_sprints.forEach((mySprint) => {
    htmlContent += `
              <tr>
                <td>${mySprint.sprint}</td>
                <td>${formatDate(mySprint.startDate)}</td>
                <td>${formatDate(mySprint.endDate)}</td>
                <td>${mySprint.status}</td>
                <td>${mySprint.comments}</td>
              </tr>`;
  });
  htmlContent += `
          </tbody>
        </table>
      </body>
    </html>`;

  return htmlContent;
};

const generateAuditHistoryHtml = (projectDoc) => {
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  let htmlContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project Details</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Audit History</h1>
        <table>
          <thead>
            <tr>
              <th>Date of Audit</th>
              <th>Reviewed By</th>
              <th>Status</th>
              <th>Comment/Queries</th>
              <th>Action Item</th>
            </tr>
          </thead>
          <tbody>`;
  projectDoc[0]?.project_audit_history.forEach((auditHistory) => {
    htmlContent += `
                    <tr>
                      <td>${formatDate(auditHistory.dateOfAudit)}</td>
                      <td>${auditHistory.reviewedBy}</td>
                      <td>${auditHistory.status}</td>
                      <td>${auditHistory.comment}</td>
                      <td>${auditHistory.actionItem}</td>
                    </tr>`;
  });
  htmlContent += `
          </tbody>
        </table>
      </body>
    </html>`;

  return htmlContent;
};

module.exports = { ProjectHtml, generateAuditHistoryHtml };
