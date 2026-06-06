import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide client portal contact name'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide company/contact email'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    activeProject: {
      type: String,
      default: '',
    },
    invoicesCount: {
      type: Number,
      default: 0,
    },
    supportStatus: {
      type: String,
      default: 'No Open Tickets',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model('Client', clientSchema);
export default Client;
