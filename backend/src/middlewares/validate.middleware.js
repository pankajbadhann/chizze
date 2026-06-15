module.exports = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors:
        err.issues?.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })) || [],
    });
  }
};