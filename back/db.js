// back/db.js
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",               // tu usuario MySQL
  password: "Emanuel0515",   // <- asegúrate que esta sea tu contraseña real
  database: "perfumeria_db", // <- la base de datos correcta
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
