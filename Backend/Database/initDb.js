const db = require('./db');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
    try {
        console.log('Reading schema.sql configuration script...');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const sqlStatements = fs.readFileSync(schemaPath, 'utf8');

        // Split individual queries cleanly out of the multi-line schema text file
        const queries = sqlStatements
            .split(';')
            .map(q => q.trim())
            .filter(q => q.length > 0);

        console.log('Connecting to database instance and building tables...');
        for (let query of queries) {
            await db.query(query);
        }

        console.log('AssetFlow Database Tables Configured Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Data Architecture Booting Error:', error.message);
        process.exit(1);
    }
}

initializeDatabase();