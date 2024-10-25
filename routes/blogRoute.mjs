import express from "express";

const router = express.Router();

// import {
//   getBlog,
//   // getBlogByID,
//   postBlog,
//   // putBlog,
//   // patchBlog,
//   // deleteBlog,
// } from "../controllers/blogControllers.mjs";

// router.get("/blogs", getBlog);
// // router.get("/blogs/:id", getBlogByID);
// router.post("/blogs", postBlog);
// // router.put("/blogs/:id", putBlog);
// // router.patch("/blogs/:id", patchBlog);
// // router.delete("/blogs/:id", deleteBlog);

// export default router;

import {
  getBlog,
  postBlog,
  deleteAllBlogs,
  deleteBlogById,
  getBlogById,
} from "../controllers/blogControllers.mjs";
router.get("/blogs", getBlog);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", postBlog);
router.delete("/blogs", deleteAllBlogs);
router.delete("/blogs/:id", deleteBlogById);
export default router;
