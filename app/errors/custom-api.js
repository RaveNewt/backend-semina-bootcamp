class CustomAPIError extends APIError {
  constructor(message) {
    super(message);
  }
}
module.exports = CustomAPIError;