module.exports = {
    host: process.env.DATABASE_HOST || 'ec2-54-90-13-87.compute-1.amazonaws.com',
    port: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USER || 'pgzyhiwrjfjbpd',
    password: process.env.DATABASE_PASSWORD || 'ea69ef26309a63424a3e6fc4114e6b6fe7844a14e99d8124e6c6cdbf53a104ec',
    database: process.env.DATABASE || 'd9tdeti221lb7q',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },    
    define: {
        timestamps: true,        
    }
};
