const router = require("express").Router();
const authRoutes = require("./user.routes");
const topicRoutes = require("./topic.routes");
const cardRoutes = require("./card.routes");
//   const progressRoutes = require("./progress.routes");

const formatResponse = require("../utils/formatResponse");

router
  .use("/auth", authRoutes)
  .use("/topics", topicRoutes)
  .use("/cards", cardRoutes) //карточки по теме
  //.use("/progress", progressRoutes);

router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
