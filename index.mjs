import express from "express";

const app = express();
app.use(express.json());

const blogs = [
  {
    id: 1,
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
  res.status(200).json(blogs);
});

app.post("/blogs", (req, res) => {
  const { title, description, data, category, tags, author } = req.body;

  const newBlog = {
    id: blogs.length + 1,
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
  const id = parseInt(req.params.id); 
  const { title, description, data, category, tags, author } = req.body;

  const index = blogs.findIndex((x) => x.id == id); 

  if (index === -1) {
    res.status(404).json({ error: "Blog not found" });
  } else {
    const updatedBlog = {
      id: blogs[index].id,
      title: title || blogs[index].title,
      description: description || blogs[index].description,
      data: data || blogs[index].data,
      category: category || blogs[index].category,
      tags: tags || blogs[index].tags,
      author: author || blogs[index].author,
      createdOn: blogs[index].createdOn,
    };
    blogs[index] = updatedBlog;
    res.status(200).json(updatedBlog);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
