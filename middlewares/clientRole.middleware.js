import Client from '../models/client.model.js';

const restrictedRoles = ['client', 'premium'];

export const restrictToOwn = async (req, res, next) => {
  try {
    if (restrictedRoles.includes(req.user.role)) {
      const client = await Client.findOne({ userId: req.user._id });
      if (!client) {
        return res.status(403).json({ success: false, message: 'No client profile bound to your account.' });
      }
      req.query.client = client._id.toString();
      if (req.body && req.method === 'POST') {
        req.body.client = client._id.toString();
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeClient = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Client role '${req.user?.role || 'Guest'}' is not authorized for this action`,
      });
    }
    next();
  };
};