import { MediaService } from "../services/media.service.js";

// Upload media
export const uploadMedia = async (req, res) => {

  try {

    console.log(req,"REQUEST")
    const media = await MediaService.createMedia(
      req.file,
      req.body
    );

    console.log(media,"MEDIA")


    res.json(media);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};


// Get all media
export const getMedia = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "",type } = req.query;

    const media = await MediaService.getMedia({
      page,
      limit,
      search,
      type,
      baseUrl: req.mediaUrl, 
    });

    res.json(media);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get media by ID
export const getMediaById = async (req, res) => {

  try {

    const media = await MediaService.getMediaById(
      req.params.id,
      req.mediaUrl
    );

    res.json(media);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};


// Update media
export const updateMedia = async (req, res) => {

  try {

    const media = await MediaService.updateMedia(
      req.params.id,
      req.body,
      req.file
    );

    res.json(media);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};


// Delete media
export const deleteMedia = async (req, res) => {

  try {

    const result = await MediaService.deleteMedia(req.params.id);

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};