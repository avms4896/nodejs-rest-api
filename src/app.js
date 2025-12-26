const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables FIRST
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Node.js REST API is running 🚀"
  });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Global error handler
const globalErrorHandler = require("./middleware/error.middleware");
app.use(globalErrorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
