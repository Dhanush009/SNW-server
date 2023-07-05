// getting-started.js
const mongoose = require('mongoose');
const DB_URL = `mongodb+srv://dhanushsram:admin@snw.s9ghy9t.mongodb.net/`

mongoose.connect(DB_URL)
.then(() => console.log(`DB connected`))
.catch( err => console.log(err))

