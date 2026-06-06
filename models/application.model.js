import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide applicant name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide applicant email'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    roleApplied: {
      type: String,
      required: [true, 'Please provide applied role title'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Screened', 'Interviewing', 'Offered', 'Rejected'],
      default: 'Pending',
    },
    fileUrl: {
      type: String,
      required: [true, 'Please provide resume file URL'],
      trim: true,
    },
    coverLetter: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;
