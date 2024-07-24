import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';

require('dotenv').config();

let app = express();
// app.use(cors({ origin: true }));
// config app
const corsOptions = {
    origin: 'http://localhost:3000', // Chỉ cho phép nguồn này
    credentials: true, // Cho phép gửi thông tin chứng thực
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("backend Nodejs is runing on the port: " + port)
}
)