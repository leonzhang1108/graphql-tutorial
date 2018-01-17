import {
  connection
} from '../config'
import {
  logger,
  sqlUtil
} from '../util'

// Author宣告
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
    // 預設回傳 {insertId} 但是GraphQL只認id，所以要轉換在回傳
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
    return connection.execute(`DELETE from Post ` + sqlUtil.whereQuery(query))
  }

  retrievePostList(id) {
    return connection.execute(`SELECT * FROM Post where author_id=?`, [id])
  }
}