import Testimonial from '../models/testimonial.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getTestimonials = factory.getAll(Testimonial);
export const getTestimonial = factory.getOne(Testimonial);
export const createTestimonial = factory.createOne(Testimonial);
export const updateTestimonial = factory.updateOne(Testimonial);
export const deleteTestimonial = factory.deleteOne(Testimonial);
