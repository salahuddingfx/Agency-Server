import mongoose from 'mongoose';

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide case study title'],
      trim: true,
      unique: true,
    },
    client: {
      type: String,
      required: [true, 'Please provide client name'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    problem: {
      type: String,
      required: [true, 'Please provide problem statement'],
      trim: true,
    },
    solution: {
      type: String,
      required: [true, 'Please provide solution details'],
      trim: true,
    },
    result: {
      type: String,
      required: [true, 'Please provide results achieved'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);
export default CaseStudy;
