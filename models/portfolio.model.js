import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide portfolio title'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      trim: true,
    },
    client: {
      type: String,
      required: [true, 'Please provide client name'],
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    imageColor: {
      type: String,
      default: 'from-blue-600 to-cyan-500',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
