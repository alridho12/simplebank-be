const pool = require("../config/db");

const create = (data) => {
  const { name, email, passwordHash, id} = data;
  return pool.query(
    `INSERT INTO user_bank(user_id,name,email,password) VALUES('${id}','${name}','${email}','${passwordHash}')`
  );
};

const updateUser = (data) => {
  const { id, name,photo_profile } = data;
  return pool.query(
    `UPDATE user_bank SET name='${name}',photo_profile='${photo_profile}'  WHERE user_id='${id}'`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM user_bank WHERE email = '${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};


const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT user_id FROM user_bank WHERE user_id='${id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};


const searchUser = (search, limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM user_bank WHERE name ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectUser = (id) => {
  return pool.query(`SELECT * FROM user_bank WHERE user_id='${id}'`);
};

module.exports = {
  findEmail,
  findId,
  create,
  selectUser,
  updateUser,
  searchUser,
};
