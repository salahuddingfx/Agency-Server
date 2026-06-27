import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide team member name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide role/designation'],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, 'Please provide experience description (e.g., 9 Years)'],
      trim: true,
    },
    skills: {
      type: String,
      required: [true, 'Please provide skills formatted as text (e.g., React:98,Cloud:92)'],
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model('Team', teamSchema);
export default Team;
