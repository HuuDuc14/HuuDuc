import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import Product from '../models/productModel.js';
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Lưu trữ lịch sử chat theo session ID
const sessions = {};

const chatbox = async (req, res) => {
    const { message, sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    // Khởi tạo session nếu chưa tồn tại
    if (!sessions[sessionId]) {
        sessions[sessionId] = [];
    }

    // Thêm tin nhắn người dùng vào lịch sử
    sessions[sessionId].push({ role: 'user', parts: [{ text: message }] });



    try {

        const products = await Product.find({}, 'title info finalPrice images');
        const productList = products.map(p => ({
            id: p._id.toString(),
            title: p.title,
            info: p.info,
            finalPrice: p.finalPrice,
            image: p.images[0] || '',
        }));

        // Tạo prompt với danh sách sản phẩm và hướng dẫn
        const prompt = `
Bạn là một nhân viên bán hàng thông minh, thân thiện, giao tiếp bằng tiếng Việt. Nhiệm vụ của bạn là:
- Hiểu câu hỏi hoặc yêu cầu của khách hàng.
- Đề xuất sản phẩm phù hợp từ danh sách sản phẩm dưới đây.
- Trả lời tự nhiên, cung cấp thông tin sản phẩm (tên, mô tả, giá, ID) và liên kết hình ảnh nếu có.
- Nếu khách hàng không hỏi về sản phẩm cụ thể, trả lời câu hỏi một cách hữu ích và cố gắng gợi ý sản phẩm liên quan.
- Không bịa đặt thông tin sản phẩm ngoài danh sách.
- Kết quả hiển thị dưới dạng HTML để dễ đọc.
- Nếu có <img>, hãy dùng thẻ <img /> dạng tự đóng.
- Ví dụ: <img src="..." /> (không dùng <img></img>).
- Link ảnh sản phẩm: http://localhost:5000/images/(ảnh đầu tiên trong mảng images)
- Nếu có "style", hãy viết style dưới dạng object JavaScript (JSX-style).
Ví dụ: style={{ width: "100px", height: "100px" }}

Danh sách sản phẩm:
${JSON.stringify(productList, null, 2)}

Lịch sử trò chuyện:
${JSON.stringify(sessions[sessionId], null, 2)}

Câu hỏi hiện tại của khách hàng: ${message}

Hãy trả lời bằng tiếng Việt, tự nhiên, và chuyên nghiệp.
`;

console.log(prompt);

        const result = await model.generateContent(prompt);
        const reply = result.response.text();
        // Thêm phản hồi AI vào lịch sử
        sessions[sessionId].push({ role: 'model', parts: [{ text: reply }] });
        res.json({ reply });
    } catch (error) {
        console.error("Lỗi gemini AI:", error.message);
        res.status(500).json({ error: "Lỗi khi kết nối với gemini AI." });
    }

}

export {
    chatbox
}