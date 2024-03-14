const Resource = require('../models/resourcemodel');


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


    module.exports = {
        addResource,
        getResources,
        editResource,
        deleteResource
    }
    