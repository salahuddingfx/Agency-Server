import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    contactName: {
      type: String,
      required: [true, 'Please provide contact name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      trim: true,
      lowercase: true,
    },
    value: {
      type: String,
      required: [true, 'Please provide pipeline value'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Proposal', 'Won', 'Lost'],
      default: 'New',
    },
    assignee: {
      type: String,
      default: 'Unassigned',
    },
    notes: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
