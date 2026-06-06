import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide technology name'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide category (e.g., Frontend, Backend)'],
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    iconSvg: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Technology = mongoose.model('Technology', technologySchema);
export default Technology;
