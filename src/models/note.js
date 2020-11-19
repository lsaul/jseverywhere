//require mongoose library
const mongoose = require('mongoose');

//Define the note's database schema
const noteSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      auto: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    //assigns created and updated files with a timestamp
    timestamps: true
  }
);

//Define the 'Note' model with the schema
const Note = mongoose.model('Note', noteSchema);

//export the module
module.exports = Note;
