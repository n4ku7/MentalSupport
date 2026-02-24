import Resource from "../models/Resource.js";

export const createResource = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const resource = await Resource.create({
      title,
      content,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate("createdBy", "name email");
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    resource.title = req.body.title || resource.title;
    resource.content = req.body.content || resource.content;
    resource.category = req.body.category || resource.category;

    const updated = await resource.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    await resource.deleteOne();

    res.json({ message: "Resource deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
