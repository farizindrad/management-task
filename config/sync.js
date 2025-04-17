const sequelize = require('./database');
const { Sequelize } = require('sequelize');
const Task = require("../models/Task");

async function initDatabase() {
  try {
    const dbName = process.env.DB_NAME;
    const dbHost = process.env.DB_HOST;

    const tempSequelize = new Sequelize({
      dialect: 'mysql', 
      host: dbHost,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      logging: false,
    });

    await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database ${dbName} berhasil dibuat atau sudah ada`);

    await sequelize.authenticate();

    await sequelize.sync({ alter: true });
    console.log('Tabel berhasil dibuat atau disinkronkan');
  } catch (error) {
    console.error('Error membuat database atau tabel:', error);
  }
}

initDatabase();
