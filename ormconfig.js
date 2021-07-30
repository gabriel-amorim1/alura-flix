module.exports = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'aluraflix',
    useUnifiedTopology: true,
    entities: [' src/modules/**/schemas/*.ts'],
};
