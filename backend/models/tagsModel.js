const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    value: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tags', tagsSchema);
