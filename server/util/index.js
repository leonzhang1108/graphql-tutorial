import Winston from 'winston'

const logger = new(Winston.Logger)({
  transports: [
    new(Winston.transports.Console)()
  ]
})

const sqlUtil = {
  updateQuery: query => {
    "use strict"
    let updateString = ''
    for (let prop in query) {
      updateString = updateString + "," + prop + "=" + query[prop]
    }
    return updateString
  },
  whereQuery: query => {
    let whereString = ''
    if (Object.keys(query).length > 0) {
      for (let prop in query) {
        whereString = whereString.length > 0 ? whereString + " and " : ""
        whereString = whereString + prop + "=" + query[prop]
      }
      whereString = " where " + whereString
    }
    return whereString
  }
}

module.exports = {
  logger,
  sqlUtil
}