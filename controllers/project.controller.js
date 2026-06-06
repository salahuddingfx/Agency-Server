import Project from '../models/project.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getProjects = factory.getAll(Project, 'client');
export const getProject = factory.getOne(Project, 'client');
export const createProject = factory.createOne(Project);
export const updateProject = factory.updateOne(Project);
export const deleteProject = factory.deleteOne(Project);
