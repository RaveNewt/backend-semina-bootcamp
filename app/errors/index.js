const CustomAPIError = require('./custom-api')
const BadRequest = require('./bad-request')
const Unauthorized = require('./unauthorized')
const Unauthenticated = require('./unauthenticated')
const NotFound = require('./not-found')

module.exports = {
    CustomAPIError,
    BadRequest,
    Unauthorized,
    NotFound,
    Unauthenticated
};