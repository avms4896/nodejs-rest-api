dotenv.config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const apiLimiter = require("./middleware/rateLimit.middleware");
const globalErrorHandler = require("./middleware/error.middleware");
const AppError = require("./utils/AppError");

connectDB();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
app.use("/api", apiLimiter);

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Handle unknown routes
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

// Global error handler
app.use(globalErrorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
