import {
  connection
} from '../config'
import {
  logger,
  sqlUtil
} from '../util'

module.exports = class ModelAuthorClass {
  constructor() {
    logger.info("create author table")
    connection.execute(`CREATE TABLE IF NOT EXISTS Author(
      id INT(10) AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      gender BOOLEAN NOT NULL,
      age VARCHAR(255) NOT NULL,
      email VARCHAR(50) NOT NULL,
      intro VARCHAR(255),
      create_at TIMESTAMP
    )`)
  }

  createAuthor(name, gender, age, email, intro) {
    return connection.execute(`INSERT INTO Author (name, gender, age, email, intro, create_at) 
          values (?,?,?,?,?,?)`, [name, gender, age, email, intro || '', new Date()]).then(result => {
      return {
        id: result.insertId
      }
    })
  }

  retrieveAuthor(query) {
    return connection.execute(`SELECT * FROM Author ` + sqlUtil.whereQuery(query))
  }

  updateAuthor(id, query) {
    return connection.execute(`UPDATE Author SET ` + sqlUtil.updateQuery(query) + ' where id=?', [id])
  }

  deleteAuthor(query) {
    connection.execute(`DELETE from Author ` + sqlUtil.whereQuery(query))
    return { ok: true}
  }

  retrievePostList(id) {
    return connection.execute(`SELECT * FROM Author where author_id=?`, [id])
  }
}