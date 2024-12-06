const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/location', (req, res) => {
    res.json({ message: "success", data: "your data here" });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});