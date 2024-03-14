const Resource = require("../models/resourcemodel");
const ProjectUpdates = require("../models/projectupdates");
const Momsclient = require("../models/momsclientmodel");
const Phase = require("../models/phasemodel");

// Resource Management

// const addResource = async (req, res) => {
//   try {
//     const { name, role, startDate, endDate, comment } = req.body;

//     const resourceDoc = await Resource.create({
//       name,
//       role,
//       startDate,
//       endDate,
//       comment,
//     });

//     return res.status(200).json(resourceDoc);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: `Error occurred ${error}` });
//   }
// };

// const getResources = async (req, res) => {
//   try {
//     const resources = await Resource.find({});
//     return res.status(200).json(resources);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: `Error occurred ${error}` });
//   }
// };

// const editResource = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, role, startDate, endDate, comment } = req.body;

//     const resourceDoc = await Resource.findByIdAndUpdate(
//       id,
//       {
//         name,
//         role,
//         startDate,
//         endDate,
//         comment,
//       },
//       { new: true }
//     );

//     if (!resourceDoc) {
//       return res.status(404).json({ message: 'No resource found with this id' });
//     }

//     return res.status(200).json(resourceDoc);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: `Error occurred ${error}` });
//   }
// };

// const deleteResource = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const resourceDoc = await Resource.findByIdAndDelete(id);
//     return res.status(200).json(resourceDoc);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: `Error occurred ${error}` });
//   }
// };

// Project Updates

const addProjectUpdate = async (req, res) => {
  try {
    const { date, generalUpdates } = req.body;

    const projectUpdateDoc = await ProjectUpdates.create({
      date,
      generalUpdates,
    });

    return res.status(200).json(projectUpdateDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const getProjectUpdates = async (req, res) => {
  try {
    const projectUpdates = await ProjectUpdates.find({});
    return res.status(200).json(projectUpdates);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const editProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, generalUpdates } = req.body;

    const projectUpdateDoc = await ProjectUpdates.findByIdAndUpdate(
      id,
      {
        date,
        generalUpdates,
      },
      { new: true }
    );

    if (!projectUpdateDoc) {
      return res
        .status(404)
        .json({ message: "No project update found with this id" });
    }

    return res.status(200).json(projectUpdateDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const deleteProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const projectUpdateDoc = await ProjectUpdates.findByIdAndDelete(id);
    return res.status(200).json(projectUpdateDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

// MOMs Client

const getMomsclients = async (req, res) => {
  try {
    const momsclients = await Momsclient.find();
    res.json(momsclients);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addMomsclient = async (req, res) => {
  try {
    const newMomsclient = new Momsclient(req.body);
    await newMomsclient.save();
    res.json({ message: "Momsclient added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMomsclient = async (req, res) => {
  try {
    const { id } = req.params;
    await Momsclient.findByIdAndUpdate(id, req.body);
    res.json({ message: "Momsclient updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMomsclient = async (req, res) => {
  try {
    const { id } = req.params;
    await Momsclient.findByIdAndDelete(id);
    res.json({ message: "Momsclient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMomsclient = async (req, res) => {
  try {
    const { id } = req.params;
    const momsclient = await Momsclient.findById(id);
    res.json(momsclient);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//phase management
const addPhase = async (req, res) => {
  try {
    const {
      phaseNumber,
      numberOfResources,
      role,
      availabilityPercentage,
      duration,
    } = req.body;

    const phaseDoc = await Phase.create({
      phaseNumber,
      numberOfResources,
      role,
      availabilityPercentage,
      duration,
    });

    return res.status(200).json(phaseDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const getPhases = async (req, res) => {
  try {
    const phases = await Phase.find({});
    return res.status(200).json(phases);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const getPhasesByPhaseNumber = async (req, res) => {
  try {
    const { phaseNumber } = req.params;
    const phases = await Phase.find({ phaseNumber });

    if (!phases || phases.length === 0) {
      return res
        .status(404)
        .json({ message: `No phases found with phase number ${phaseNumber}` });
    }

    return res.status(200).json(phases);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const editPhase = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      phaseNumber,
      numberOfResources,
      role,
      availabilityPercentage,
      duration,
    } = req.body;

    const phaseDoc = await Phase.findByIdAndUpdate(
      id,
      {
        phaseNumber,
        numberOfResources,
        role,
        availabilityPercentage,
        duration,
      },
      { new: true }
    );

    if (!phaseDoc) {
      return res.status(404).json({ message: "No phase found with this id" });
    }

    return res.status(200).json(phaseDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const deletePhase = async (req, res) => {
  try {
    const { id } = req.params;
    const phaseDoc = await Phase.findByIdAndDelete(id);
    return res.status(200).json(phaseDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

module.exports = {
  // addResource,
  // getResources,
  // editResource,
  // deleteResource,
  addProjectUpdate,
  getProjectUpdates,
  editProjectUpdate,
  deleteProjectUpdate,
  getMomsclients,
  addMomsclient,
  updateMomsclient,
  deleteMomsclient,
  getMomsclient,
  addPhase,
  getPhases,
  getPhasesByPhaseNumber,
  editPhase,
  deletePhase,
};
