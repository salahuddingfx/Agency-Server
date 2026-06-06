import User from '../models/user.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getUsers = factory.getAll(User);
export const getUser = factory.getOne(User);
export const createUser = factory.createOne(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);
export const getMe = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};
