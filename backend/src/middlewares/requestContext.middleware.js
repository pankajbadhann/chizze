const requestContext = (req, res, next) => {
  req.context = {
    userId: req.user?.id || null,
  };

  next();
};

module.exports = requestContext;