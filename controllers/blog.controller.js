import Blog from '../models/blog.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getBlogs = factory.getAll(Blog);
export const getBlog = factory.getOne(Blog);
export const createBlog = factory.createOne(Blog);
export const updateBlog = factory.updateOne(Blog);
export const deleteBlog = factory.deleteOne(Blog);
