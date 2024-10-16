exports.successResponse = (res, data, message = "Request was successful") => {
  res.status(200).json({
    success: true,
    message, // Sesuaikan message dengan input yang diberikan
    data,
  });
};
