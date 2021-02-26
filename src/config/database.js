module.exports = process.env.DATABASE_URL || {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'admin',
    database: process.env.DATABASE || 'xbranding',
    dialect: 'postgres',
    /*dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },*/    
    define: {
        timestamps: true,        
    }
};
