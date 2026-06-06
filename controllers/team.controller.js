import Team from '../models/team.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getTeams = factory.getAll(Team);
export const getTeam = factory.getOne(Team);
export const createTeam = factory.createOne(Team);
export const updateTeam = factory.updateOne(Team);
export const deleteTeam = factory.deleteOne(Team);
