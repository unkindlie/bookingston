export default () => ({
    database: {
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        port: parseInt(process.env.PG_PORT) || 5432,
        name: process.env.PG_DATABASE_NAME,
    },
});
