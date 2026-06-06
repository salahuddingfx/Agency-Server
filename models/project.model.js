import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide project title'],
      trim: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    status: {
      type: String,
      enum: ['Planning', 'In Progress', 'Review', 'Completed'],
      default: 'Planning',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    milestones: [
      {
        title: { type: String, required: true },
        date: { type: String, required: true },
        status: { type: String, enum: ['upcoming', 'current', 'completed'], default: 'upcoming' },
      },
    ],
    files: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: String },
        category: { type: String },
        date: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
