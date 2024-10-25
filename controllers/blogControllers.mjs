import Blogs from "../models/data.mjs";

export const postBlog = async (req, res) => {
  try {
    console.log("Received POST request");
    const { title, description, data, category, tags, author } = req.body;

    if (!title || !description || !data || !category || !tags || !author) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newBlog = await Blogs.create({
      title,
      description,
      data,
      category,
      tags,
      author,
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error in POST /blogs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBlog = async (req, res) => {
  try {
    console.log("Received GET request for Blogs");

    const allBlogs = await Blogs.find({});
    res.status(200).json(allBlogs);
  } catch (error) {
    console.error("Error in GET /blogs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Received GET request for blog with ID: ${id}`);

    const blog = await Blogs.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error retrieving blog by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAllBlogs = async (req, res) => {
  try {
    console.log("Received DELETE request to delete all blogs");
    await Blogs.deleteMany({});
  } catch (error) {
    console.error("Error in GET /blogs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Received DELETE request for blog with ID: ${id}`);

    const deletedBlog = await Blogs.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully", deletedBlog });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
