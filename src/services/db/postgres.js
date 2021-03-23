const { Pool } = require('pg');

// const config = {
//   user: 'postgres',
//   host: 'localhost',
//   database: "coloreando-db",
//   password: '123'
// };
const config = {
  connectionString: "postgres://gztbxmbhoklgzs:b31abde23de4160f4260687807bb33bb08e7f2463f9f4aaecbbcbf0320a7946c@ec2-107-21-103-146.compute-1.amazonaws.com:5432/d24q25thjkldm5",
  ssl: {
    rejectUnauthorized: false
  }
}
const pool = new Pool(config);

module.exports.db = {
  query: (query, params) => pool.query(query, params),
}