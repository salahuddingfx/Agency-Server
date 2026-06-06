const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource Not Found - ${req.method} ${req.originalUrl}`,
  });
};

export default notFound;
