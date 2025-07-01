// models/MemoryNode.js
const mongoose = require('mongoose');

const memoryNodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  topic: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  embedding: {
    type: [Number], // Array of floats (for vector search)
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MemoryNode', memoryNodeSchema);
