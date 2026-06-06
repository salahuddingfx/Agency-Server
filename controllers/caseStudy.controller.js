import CaseStudy from '../models/caseStudy.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getCaseStudies = factory.getAll(CaseStudy);
export const getCaseStudy = factory.getOne(CaseStudy);
export const createCaseStudy = factory.createOne(CaseStudy);
export const updateCaseStudy = factory.updateOne(CaseStudy);
export const deleteCaseStudy = factory.deleteOne(CaseStudy);
