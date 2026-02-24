import Appointment from "../models/Appointment.js";
import Therapist from "../models/Therapist.js";

export const bookAppointment = async (req, res) => {
  try {
    const { therapistId, date, timeSlot } = req.body;

    const existing = await Appointment.findOne({
      therapist: therapistId,
      date,
      timeSlot,
      status: { $ne: "cancelled" },
    });

    if (existing) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const therapist = await Therapist.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    const slotEntry = therapist.availableSlots.find(
      (slot) => slot.date === date,
    );

    if (!slotEntry || !slotEntry.timeSlots.includes(timeSlot)) {
      return res.status(400).json({ message: "Slot not available" });
    }

    slotEntry.timeSlots = slotEntry.timeSlots.filter(
      (slot) => slot !== timeSlot,
    );

    await therapist.save();

    const appointment = await Appointment.create({
      student: req.user._id,
      therapist: therapistId,
      date,
      timeSlot,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      student: req.user._id,
    }).populate("therapist", "name specialization");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("student", "name email")
      .populate("therapist", "name specialization");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
