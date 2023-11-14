const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

import User from "../models/userModel";
