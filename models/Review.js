const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    gameTitle: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    platform: { type: String, trim: true, maxlength: 40 },
    rating: { type: Number, required: true, min: 1, max: 10 },
    content: { type: String, required: true, minlength: 10, maxlength: 5000 },
    pros: [{ type: String, trim: true, maxlength: 120 }],
    cons: [{ type: String, trim: true, maxlength: 120 }],
    status: { type: String, enum: ["draft", "published"], default: "published" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
