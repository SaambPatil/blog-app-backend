import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const blogs = [
  {
    id: uuidv4(),
    title: "Introduction to Graphs",
    description: "ucdsuvsdv vsbv",
    data: "cjdbjbc",
    category: "datastructures",
    tags: "datastructures,algorithms,graphs",
    author: "abhishek",
    createdOn: "07-10-2024",
  },
];

app.get("/blogs", (req, res) => {
  console.log("Received GET request");
  res.status(200).json(blogs);
});

app.post("/blogs", (req, res) => {
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
});

app.put("/blogs/:id", (req, res) => {
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
  res.status(200).json(updatedBlog);
});
app.patch("/blogs/:id", (req, res) => {
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
  res.status(200).json(updatedBlog);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
