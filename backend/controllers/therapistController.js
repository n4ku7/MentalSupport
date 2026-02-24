import Therapist from "../models/Therapist.js";

export const createTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.create(req.body);
    res.status(201).json(therapist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
