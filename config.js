require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 5000,
        ip: process.env.IP || 'localhost'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
    },
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'test',
    },
}
