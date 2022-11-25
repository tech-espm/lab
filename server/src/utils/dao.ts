import { createPool } from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();
const DAO = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: "", //process.env.MYSQL_PWD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
  multipleStatements: true,
}).promise();

export { DAO };
