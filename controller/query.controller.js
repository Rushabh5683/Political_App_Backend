import { QueryService } from "../services/query.service.js";

// Create Query
export const createQuery = async (req, res) => {

  try {

    const query = await QueryService.createQuery({
      title: req.body.title,
      description: req.body.description,
      attachment: req.file
        ? `${req.mediaUrl}/uploads/${req.file.filename}`
        : null,
      userId: req.user.id
    });

    res.json(query);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};

// Get All Queries
export const getQueries = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status } = req.query;

    const result = await QueryService.getQueries({
      page,
      limit,
      search,
      status,
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Query By ID
export const getQueryById = async (req, res) => {

  try {

    const query = await QueryService.getQueryById(req.params.id);

    res.json(query);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

export const getMyQueries = async (req, res) => {
  try {
    const queries = await QueryService.getQueriesByUserId(req.user.id);

    res.json(queries);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Query
export const updateQuery = async (req, res) => {

  try {

    const query = await QueryService.updateQuery(
      req.params.id,
      req.body,
      req.user
    );

    res.json(query);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};

// Delete Query
export const deleteQuery = async (req, res) => {

  try {

    const result = await QueryService.deleteQuery(
      req.params.id,
      req.user
    );

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};