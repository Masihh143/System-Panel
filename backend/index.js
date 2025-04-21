const express = require("express");
const cors = require("cors");
const systemRoutes = require("./routes/system");

const app = express();
const PORT = 5000;

app.use(cors());
app.use("/api/system", systemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
