module.exports = process.env.DATABASE_URL || {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'xbranding',
    define: {
        timestamps: true,
        underscored: true
    }
};