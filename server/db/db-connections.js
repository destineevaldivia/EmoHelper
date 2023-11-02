import pkg from "pg";
const { Pool } = pkg;
const db = new Pool({
  connectionString: process.env.DB_URL,
});
export default db;
