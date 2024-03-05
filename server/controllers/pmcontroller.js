const Resource = require('../models/resourcemodel');
const ProjectUpdates = require('../models/projectupdates');
const Momsclient = require('../models/momsclientmodel');
const pahse = require('../models/phasemodel');

// Resource Management

const addResource = async (req, res) => {
  try {
    const { name, role, startDate, endDate, comment } = req.body;

    const resourceDoc = await Resource.create({
      name,
      role,
      startDate,
      endDate,
      comment,
    });

    return res.status(200).json(resourceDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({});
    return res.status(200).json(resources);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const editResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, startDate, endDate, comment } = req.body;

    const resourceDoc = await Resource.findByIdAndUpdate(
      id,
      {
        name,
        role,
        startDate,
        endDate,
        comment,
      },
      { new: true }
    );

    if (!resourceDoc) {
      return res.status(404).json({ message: 'No resource found with this id' });
    }

    return res.status(200).json(resourceDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resourceDoc = await Resource.findByIdAndDelete(id);
    return res.status(200).json(resourceDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred ${error}` });
  }
};

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
      return res.status(404).json({ message: 'No project update found with this id' });
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addMomsclient = async (req, res) => {
  try {
    const newMomsclient = new Momsclient(req.body);
    await newMomsclient.save();
    res.json({ message: 'Momsclient added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMomsclient = async (req, res) => {
  try {
    const { id } = req.params;
    await Momsclient.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Momsclient updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteMomsclient = async (req, res) => {
  try {
    const { id } = req.params;
    await Momsclient.findByIdAndDelete(id);
    res.json({ message: 'Momsclient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMomsclient = async (req, res) => {
  try {
    const { id } = req.params;
    const momsclient = await Momsclient.findById(id);
    res.json(momsclient);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//phase management

const getAllPhases = async (req, res) => {
  try {
    const phases = await Phase.find();
    res.json(phases);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addNewPhase = async (req, res) => {
  const { name, approvedTeam } = req.body;

  try {
    const newPhase = new Phase({ name, approvedTeam, resources: [] });
    await newPhase.save();
    res.json({ success: true, message: 'Phase added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addRowToPhase = async (req, res) => {
  const { id } = req.params;
  const { numberOfResources, role, availabilityPercentage, duration } = req.body;

  try {
    const phase = await Phase.findById(id);
    if (!phase) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    const newRow = {
      numberOfResources,
      role,
      availabilityPercentage,
      duration,
    };

    phase.resources.push(newRow);
    phase.updatedAt = Date.now();
    await phase.save();

    res.json({ success: true, message: 'Row added to the phase successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPhaseById = async (req, res) => {
  const { id } = req.params;

  try {
    const phase = await Phase.findById(id);
    if (!phase) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    res.json(phase);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update phase by ID
const updatePhaseById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const phase = await Phase.findById(id);
    if (!phase) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    phase.name = name;
    phase.updatedAt = Date.now();
    await phase.save();

    res.json({ success: true, message: 'Phase updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete phase by ID
const deletePhaseById = async (req, res) => {
  const { id } = req.params;

  try {
    const phase = await Phase.findById(id);
    if (!phase) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    await phase.remove();

    res.json({ success: true, message: 'Phase deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addResource,
  getResources,
  editResource,
  deleteResource,
  addProjectUpdate,
  getProjectUpdates,
  editProjectUpdate,
  deleteProjectUpdate,
  getMomsclients,
  addMomsclient,
  updateMomsclient,
  deleteMomsclient,
  getMomsclient,

  //phase management
  getAllPhases,
  addNewPhase,
  addRowToPhase,
  getPhaseById,
  updatePhaseById,
  deletePhaseById,

};

