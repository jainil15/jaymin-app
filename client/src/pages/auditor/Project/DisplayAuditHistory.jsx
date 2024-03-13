// // DisplayAuditHistory.js
// import React from "react";
// import EditAuditHistory from "./EditAuditHistory";

// const DisplayAuditHistory = ({ project, handleDelete, formatDate, setFetch, updateProjectData }) => {
//   return (
//     <tbody>
//       {project?.project_audit_history?.length > 0 &&
//         project?.project_audit_history?.map((auditHistory) => (
//           <tr
//             className="bg-white border-b hover:bg-gray-50"
//             key={auditHistory._id}
//           >
//             <th className="px-6 py-4">{formatDate(auditHistory.dateOfAudit)}</th>
//             <th className="px-6 py-4">{auditHistory.reviewedBy}</th>
//             <th className="px-6 py-4">{auditHistory.status}</th>
//             <th className="px-6 py-4">{auditHistory.comment}</th>
//             <th className="px-6 py-4">{auditHistory.actionItem}</th>

//             <td className="px-6 py-4 text-right flex gap-2">
//               <EditAuditHistory
//                 auditHistory={auditHistory}
//                 setFetch={setFetch} // Pass setFetch to EditAuditHistory
//                 project={project}
//                 updateProjectData={updateProjectData}
//               />
//               <button
//                 className="text-red-600"
//                 onClick={() => handleDelete(auditHistory._id)}
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//     </tbody>
//   );
// };

// export default DisplayAuditHistory;
