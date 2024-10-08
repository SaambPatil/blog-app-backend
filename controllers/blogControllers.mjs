import blogs from "../models/data.mjs";
import { v4 as uuidv4 } from "uuid";


export const getBlog = (req, res) => {
  console.log("Received GET request");

  const { category, author } = req.query;

  console.log("Category received:", category);
  console.log("Author received:", author);

  if (category && author) {
    const filteredBlogs = blogs.filter(
      (blog) => blog.category == category && blog.author == author
    );
    return res.status(200).json(filteredBlogs);
  }

  if (category) {
    const filteredBlogs = blogs.filter((blog) => blog.category == category);
    return res.status(200).json(filteredBlogs);
  }

  if (author) {
    const filteredBlogs = blogs.filter((blog) => blog.author == author);
    return res.status(200).json(filteredBlogs);
  }

  res.status(200).json(blogs);
};

export const getBlogByID = (req, res) => {
  console.log("Received GET request by ID");

  const { id } = req.params;
  const blog = blogs.find((b) => b.id == id);

  if (blog) {
    return res.status(200).json(blog);
  }

  res.status(404).json({ error: "Blog not found" });
};

// app.get("/blogs", (req, res) => {
//   console.log("Received GET FILTER");

//   const { category } = req.query;
//    console.log("Category received:", category);
//   // if (category) {
//   //   const filteredBlogs = [];
//   //   for (let i = 0; i < blogs.length; i++) {
//   //     if (blogs[i].category == category) {
//   //       filteredBlogs.push(blogs[i]);
//   //     }
//   //   }
//   // }

//   // if (category) {
//   //   const filteredBlogs = [];

//   //   blogs.forEach((blog) => {
//   //     if (blog.category == category) {
//   //       filteredBlogs.push(blog);
//   //     }
//   //   });
//   // }

//   if (category) {
//     const filteredBlogs = blogs.filter((blog) => blog.category == category);
//     return res.status(200).json(filteredBlogs);
//   }

//   console.log("Found");
//   res.status(200).json({ error: "Invalid category" });
// });

export const postBlog = (req, res) => {
  console.log("Received POST request");

  const { title, description, data, category, tags, author } = req.body;

  const newBlog = {
    id: uuidv4(),
    title,
    description,
    data,
    category,
    tags,
    author,
    createdOn: new Date().toISOString().split("T")[0],
  };

  blogs.push(newBlog);
  res.status(201).json(newBlog);
};

export const putBlog = (req, res) => {
  console.log("Received PUT request");

  const id = req.params.id;

  const index = blogs.findIndex((x) => x.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Blog not found" });
  }

  const { title, description, data, category, tags, author } = req.body;

  if (!title || !description || !data || !category || !tags || !author) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const updatedBlog = {
    id,
    title,
    description,
    data,
    category,
    tags,
    author,
    createdOn: blogs[index].createdOn,
  };
  blogs[index] = updatedBlog;
  res.status(201).json(updatedBlog);
};

export const patchBlog = (req, res) => {
  console.log("Received PATCH request");
  const id = req.params.id;

  const index = blogs.findIndex((x) => x.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Blog not found" });
  }

  const updatedBlog = {
    id: blogs[index].id,
    title: req.body.title || blogs[index].title,
    description: req.body.description || blogs[index].description,
    data: req.body.data || blogs[index].data,
    category: req.body.category || blogs[index].category,
    tags: req.body.tags || blogs[index].tags,
    author: req.body.author || blogs[index].author,
    createdOn: blogs[index].createdOn,
  };
  blogs[index] = updatedBlog;
  res.status(201).json(updatedBlog);
};

export const deleteBlog = (req, res) => {
  console.log("Received DELETE request");
  const id = req.params.id;

  const index = blogs.findIndex((x) => x.id == id);

  if (index == -1) {
    console.log("INFINITE");
    return res.status(404).json({ error: "Blog Not Found" });
  }

  const deletedBlog = blogs[index];

  blogs.splice(index, 1);

  res.status(200).json({ message: "Deleted blog:", deletedBlog });

};
