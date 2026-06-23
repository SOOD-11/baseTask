require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const itemsRouter = require('./routes/item.route.js');
const eventRouter = require('./routes/event.route.js');

app.use(cors());
app.use(express.json());
app.use('/api/items', itemsRouter);
app.use('/api/events',eventRouter);

app.listen(3000, () => console.log('Server running on port 3000'));