require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const itemsRouter = require('./routes/item.route.js');
const eventRouter = require('./routes/event.route.js');
const userRoute = require('./routes/user.route.js');
const bookingRouter = require('./routes/booking.route.js');

app.use(cors({
origin: "http://localhost:5173",
credentials: true

}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/items', itemsRouter);
app.use('/api/events',eventRouter);
app.use('/api/user',userRoute);
app.use('/api/booking',bookingRouter);

app.listen(3000, () => console.log('Server running on port 3000'));