import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import Product from '../models/productModel.js';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chatbox = async (req, res) => {
    const { message } = req.body;

    try {
        const products = await Product.find({}, 'title info finalPrice _id images');

        // Chuyển danh sách sản phẩm thành JSON rõ ràng
        const productData = products.map(p => ({
            _id: p._id,
            name: p.title,
            description: p.info,
            price: p.finalPrice,
            image: p.images?.[0] || '',
        }));

        const prompt = `
            Bạn là một nhân viên bán hàng công nghệ chuyên nghiệp.
            Dưới đây là danh sách sản phẩm hiện có (dưới dạng JSON):
            ${JSON.stringify(productData, null, 2)}
            Khách hàng vừa hỏi: "${message}"

            - Nếu câu hỏi KHÔNG liên quan đến sản phẩm, hãy trả lời một cách thân thiện và tự nhiên.
            - Nếu câu hỏi CÓ liên quan đến sản phẩm, hãy trả lời một cách tự nhiên và thân thiện, đồng thời cung cấp thông tin về sản phẩm liên quan.

            **Yêu cầu khi trả lời:**
            - Kết quả hiển thị dưới dạng HTML để dễ đọc.
            - Mệnh giá tiền là USD và viết theo định dạng tiền tệ USD cho khách hàng dễ đọc, bỏ đi .00 phía sau mệnh giá.
            - Nếu có <img>, hãy dùng thẻ <img /> dạng tự đóng.
            Ví dụ: <img src="..." /> (không dùng <img></img>).
            - Nếu có "style", hãy viết style dưới dạng object JavaScript (JSX-style).
            Ví dụ: style={{ width: "100px", height: "100px" }}
            - Nếu có thẻ <a></a>. Hãy in đậm nó lên.
            - Link sản phẩm: http://localhost:3000/product-details/_id
            - Link ảnh sản phẩm: http://localhost:5000/images/(ảnh đầu tiên trong mảng images)
            - Không cần giải thích gì thêm, chỉ trả lời đúng và ngắn gọn theo yêu cầu khách.
            Lưu ý: bạn chỉ cần trả lời nội dung HTML phù hợp trả về luôn thẻ <div>...</div> không cần đánh giấu chú thích đây là đoạn html, không cần chào hỏi lại.
            `;
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        })
        
        res.json({ reply: response.text });
    } catch (error) {
        console.error("Lỗi gemini AI:", error.message);
        res.status(500).json({ error: "Lỗi khi kết nối với gemini AI." });
    }

}

export {
    chatbox
}