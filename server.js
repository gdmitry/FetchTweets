const express = require('express');
const app = express();

app.get('/api/v1/token', (req, res) => {
    const token = '6231690144.0cc2f98.c8b47b1592c5442f9aa48ab093f240ca';
    res.status(200)
        .json({ token });
});
app.use(express.static('app'));

app.listen(3000, () => console.log('Listening on port 3000...'))