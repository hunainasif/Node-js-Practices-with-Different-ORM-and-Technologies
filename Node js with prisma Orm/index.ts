import express from "express";
const app = express();
import userRoute from "./routes/user.route";
import postRoute from "./routes/post.route";

app.use(express.json());

app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen(3001, () => {
  console.log(`Server is listening on PORT 3001`);
});
