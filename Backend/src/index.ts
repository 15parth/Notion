import express from "express";



const app = express();

app.get("/", (req, res) => {
  res.send('This is the response');
});

const startServer = async () => {
  try {
    app.listen(4000, () => {
      console.log(`🚀 Server is running on http://localhost:4000`);
    });
  } catch (err) {
    console.error('❌ Error:', err);
  }
};

startServer();
