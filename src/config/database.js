module.exports = process.env.DATABASE_URL || {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    database: 'xbranding',
    define: {
        timestamps: true,
        underscored: true
    }
};