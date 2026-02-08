const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const updateSchema = Joi.object({
  username: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(72)
}).min(1);

exports.getProfile = async (req, res) => {
  res.json({ user: req.user });
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { error, value } = updateSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: error.details.map(d => d.message).join(", ") });

    const updates = { ...value };

    if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);

    if (updates.email) {
      const exists = await User.findOne({ email: updates.email, _id: { $ne: req.user._id } });
      if (exists) return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
