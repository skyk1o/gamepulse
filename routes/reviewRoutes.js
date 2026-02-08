const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/reviewController");

router.post("/", auth, ctrl.createReview);
router.get("/", auth, ctrl.getMyReviews);
router.get("/:id", auth, ctrl.getReviewById);
router.put("/:id", auth, ctrl.updateReview);
router.delete("/:id", auth, ctrl.deleteReview);

module.exports = router;
