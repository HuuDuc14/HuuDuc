import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import connectDatabase from './database/connect.js';
import routers from './router/index.js';
import { loadData } from './data/loadDataAddress.js';
 
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true} ))
app.use(cors());
app.use(express.json());
app.use(fileUpload())
const port = 5000;

connectDatabase()

// Lấy __dirname từ import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình để phục vụ tệp hình ảnh từ thư mục public/images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

routers(app)

// loadData()

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})