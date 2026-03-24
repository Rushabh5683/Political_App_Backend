import { WorksDoneService } from "../services/workdone.service.js";
import Media from "../models/media.model.js";

// Create
export const createWork = async (req, res) => {
  console.log("BODY",req.body)
  console.log("FILE",req.file)
  try {
    let mediaId = null;

    // 🔥 if image uploaded
    if (req.file) {
      const media = await Media.create({
        image: req.file.filename,
        type: "WORK", // ✅ IMPORTANT
        sequence: 0,
      });

      mediaId = media.id;
    }

    const payload = {
      ...req.body,
      media_id: mediaId,
    };

    const work = await WorksDoneService.createWork(payload);

    res.json(work);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all
export const getWorks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const data = await WorksDoneService.getWorks({
      page,
      limit,
      search,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get by ID
export const getWorkById = async (req, res) => {

  try {

    const work = await WorksDoneService.getWorkById(req.params.id);

    res.json(work);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

// Update
export const updateWork = async (req, res) => {
  try {
    const { id } = req.params;

    let mediaId = req.body.media_id;

    // 🔥 if new image uploaded
    if (req.file) {
      const media = await Media.create({
        image: req.file.filename,
        type: "WORK",
        sequence: 0,
      });

      mediaId = media.id;
    }

    const payload = {
      ...req.body,
      media_id: mediaId,
    };

    const work = await WorksDoneService.updateWork(id, payload);

    res.json(work);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
export const deleteWork = async (req, res) => {

  try {

    const result = await WorksDoneService.deleteWork(req.params.id);

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};