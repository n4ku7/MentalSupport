import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  timeSlots: [
    {
      type: String,
      required: true,
    },
  ],
});

const therapistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    availableSlots: [slotSchema],
  },
  { timestamps: true },
);

const Therapist = mongoose.model("Therapist", therapistSchema);

export default Therapist;
