const sql = require('mssql');

// Configuração da conexão com o SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Função para conectar ao banco de dados
async function connectDB() {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Encerra o processo em caso de falha na conexão
  }
}

// Objeto `db` com métodos para interagir com o banco de dados
const db = {
  // Conecta ao banco de dados
  connect: connectDB,

  // Métodos para "Stocks"
  async getStocks() {
    try {
      const result = await sql.query`SELECT * FROM Stocks`;
      return result.recordset;
    } catch (err) {
      console.error('Error fetching stocks:', err);
      throw err;
    }
  },

  async getStockBySymbol(symbol) {
    try {
      const result = await sql.query`
        SELECT * FROM Stocks 
        WHERE symbol = ${symbol}
      `;
      return result.recordset[0];
    } catch (err) {
      console.error('Error fetching stock:', err);
      throw err;
    }
  },

  // Métodos para "REITs"
  async getREITs() {
    try {
      const result = await sql.query`SELECT * FROM REITs`;
      return result.recordset;
    } catch (err) {
      console.error('Error fetching REITs:', err);
      throw err;
    }
  },

  async getREITBySymbol(symbol) {
    try {
      const result = await sql.query`
        SELECT * FROM REITs 
        WHERE symbol = ${symbol}
      `;
      return result.recordset[0];
    } catch (err) {
      console.error('Error fetching REIT:', err);
      throw err;
    }
  },

  // Métodos para "Users"
  async getUserByEmail(email) {
    try {
      const result = await sql.query`
        SELECT * FROM Users 
        WHERE email = ${email}
      `;
      return result.recordset[0];
    } catch (err) {
      console.error('Error fetching user:', err);
      throw err;
    }
  },
};

// Exporta tudo em um único objeto
module.exports = db;
