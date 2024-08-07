import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyAdL71FIit-LxAv8CKvVAKYsNoqWfP_qRg";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();
    if (message) {
        displayMessage(message, 'user');
        inputField.value = '';
        callGeminiAPI(message);
    }
}

function displayMessage(message, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message ${sender}-message`;
    messageContainer.textContent = message;
    
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageContainer);
    messageContainer.scrollIntoView({ behavior: 'smooth' });
}

async function callGeminiAPI(message) {
    try {
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = await response.text();
        displayMessage(text, 'bot');
    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}
