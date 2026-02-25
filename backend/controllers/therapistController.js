import Therapist from "../models/Therapist.js";
import Appointment from "../models/Appointment.js";

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

export const getMyTherapistProfile = async (req, res) => {
  try {
    let therapist = await Therapist.findOne({ user: req.user._id });

    if (!therapist) {
      therapist = await Therapist.create({
        user: req.user._id,
        name: req.user.name,
        specialization: "General Counseling",
        bio: "",
        availableSlots: [],
      });
    }

    res.json(therapist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMyAvailability = async (req, res) => {
  try {
    const { date, timeSlots } = req.body;

    if (!date || !Array.isArray(timeSlots) || timeSlots.length === 0) {
      return res.status(400).json({ message: "Date and time slots are required" });
    }

    let therapist = await Therapist.findOne({ user: req.user._id });

    if (!therapist) {
      therapist = await Therapist.create({
        user: req.user._id,
        name: req.user.name,
        specialization: "General Counseling",
        bio: "",
        availableSlots: [],
      });
    }

    const normalizedSlots = [...new Set(timeSlots.map((slot) => String(slot).trim()).filter(Boolean))];

    if (normalizedSlots.length === 0) {
      return res.status(400).json({ message: "At least one valid time slot is required" });
    }

    const existingAppointments = await Appointment.find({
      therapist: therapist._id,
      date,
      status: { $ne: "cancelled" },
    }).select("timeSlot");

    const bookedSet = new Set(existingAppointments.map((item) => item.timeSlot));
    const slotsToAdd = normalizedSlots.filter((slot) => !bookedSet.has(slot));

    if (slotsToAdd.length === 0) {
      return res.status(400).json({ message: "All provided slots are already booked" });
    }

    const dateEntry = therapist.availableSlots.find((slot) => slot.date === date);

    if (dateEntry) {
      const merged = [...new Set([...dateEntry.timeSlots, ...slotsToAdd])];
      dateEntry.timeSlots = merged;
    } else {
      therapist.availableSlots.push({ date, timeSlots: slotsToAdd });
    }

    therapist.availableSlots = therapist.availableSlots
      .map((slot) => ({
        date: slot.date,
        timeSlots: slot.timeSlots,
      }))
      .filter((slot) => slot.timeSlots.length > 0);

    await therapist.save();

    res.status(201).json(therapist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
