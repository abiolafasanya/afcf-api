export default () => ({
    port: +process.env.PORT || 8200,
    dbType: process.env.DB_TYPE,
    dbHost: process.env.DB_HOST,
    dbPort: +process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    afmMailBaseUrl: process.env.AFM_MAIL_BASE_URL,
    redisHost: process.env.REDIS_HOST,
    redisPort: +process.env.REDIS_PORT,
 
});