import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: "draft-6",
  legacyHeaders: false,
});

export { limiter };
