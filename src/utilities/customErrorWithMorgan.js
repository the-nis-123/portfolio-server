module.exports = () => JSON.stringify({
  method: ':method',
  url: ':url',
  http_version: ':http-version',
  response_time: ':response-time',
  status: ':status',
  content_length: ':res[content-length]',
  timestamp: ':date[iso]',
  error: ':error'
})