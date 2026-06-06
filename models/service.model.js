import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide service title'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      trim: true,
    },
    metric: {
      type: String,
      required: [true, 'Please provide key metric (e.g., 99.9% Uptime SLA)'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    shortDesc: {
      type: String,
      required: [true, 'Please provide short description'],
      trim: true,
    },
    longDesc: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
