import { useContext, useEffect, useState } from "react";
import commonContext from "../../contexts/common/commonContext";
import ButtonChatBox from "./ButtonChatBox";
import { MdOutlineCancel } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import axios from "axios";

const ChatBox = () => {
    const { toggleChatBox, isChatBoxOpen } = useContext(commonContext);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: 'Chào bạn! Tôi có thể giúp gì cho bạn', isHtml: true
        }
    ]);
    const [input, setInput] = useState("");
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        const newSessionId = generateUUID();
        setSessionId(newSessionId);
      }, []);

    const handleSend = async () => {
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        setInput("");

        const response = await axios.post("http://localhost:5000/chatbox", {
            message: input, sessionId
        });

        const botMessage = { sender: "bot", text: response.data.reply, isHtml: true };
        setMessages((prev) => [...prev, botMessage]);
        
    };

    function generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    return (
        <>
            <ButtonChatBox />
            {isChatBoxOpen && (
                <div className="chatbox">
                    <div className="chatbox_header">
                        <div className="left">
                            <img src="/images/chatbot.jpg" alt="" />
                            <h6>Chat Bot</h6>
                        </div>
                        <div className="right">
                            <button className="btn_close" onClick={() => toggleChatBox(false)}>
                                <MdOutlineCancel />
                            </button>
                        </div>
                    </div>
                    <div className="chatbox_body">
                        {/* Hiển thị tin nhắn */}
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender === "user" ? "user" : "bot"}`}
                            >
                                {message.isHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                                ) : (
                                    message.text
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="chatbox_footer">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button onClick={handleSend}>
                            <FiSend />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBox;