import { createPool } from "mysql2/promise";
import {
  HOST_MYSQL,
  USER_MYSQL,
  PASSWORD_MYSQL,
  DATABASE_MYSQL,
  PORT_MYSQL,
} from "./config.js";

// create a connection pool to the database
export const pool = createPool({
  host: HOST_MYSQL,
  user: USER_MYSQL,
  password: PASSWORD_MYSQL,
  database: DATABASE_MYSQL,
  port: PORT_MYSQL,
});

// connect to the database and log the connection status
export const connectDB = async () => {
  try {
    await pool.query("select 1 + 1 as result");
    console.log("Connected to database: " + DATABASE_MYSQL);
  } catch (error) {
    console.log(error);
  }
};
