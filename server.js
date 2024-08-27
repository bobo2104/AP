const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// SQL Server configuration
const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server',
    database: 'your_database',
    options: {
        encrypt: true, // Use this if you're on Azure or want to encrypt data
        enableArithAbort: true
    }
};

// Connect to SQL Server
async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

connectToDatabase();

// API endpoint to get total market data
app.get('/api/total-market', async (req, res) => {
    try {
        const result = await sql.query(`SELECT YEAR(Date) as Year, Segment, SUM(Sales) as TotalSales 
                                        FROM YourTable
                                        WHERE Segment IN ('A SEGMENT', 'B SEGMENT', ... /* list all segments */)
                                        GROUP BY YEAR(Date), Segment
                                        ORDER BY Year DESC`);
        res.json(result.recordset);
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Error querying database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
