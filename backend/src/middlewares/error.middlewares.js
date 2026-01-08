export function errorHandler(err, req, res, next) {
  console.error(err)

  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    error: err.message || 'Internal server error'
  })
}