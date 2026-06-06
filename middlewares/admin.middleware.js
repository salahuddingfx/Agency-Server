export const isAdminStaff = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  const staffRoles = ['Super Admin', 'Admin', 'Manager', 'Editor'];
  if (!staffRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access restricted to administrative staff portals.',
    });
  }

  next();
};
