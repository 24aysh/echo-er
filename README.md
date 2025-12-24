# MERN Chat Application

A real-time chat application built using the **MERN stack** (MongoDB, Express, React, Node.js) that supports instant messaging through **WebSockets** and traditional operations via **REST APIs**.

## Features

- OTP authentication and JWT authorization
- Real-time messaging using WebSockets
- User authentication and authorization
- One-to-one chat functionality
- Message persistence with MongoDB
- REST APIs for user, chat, and message management
- Responsive frontend built with React
- Secure backend using Node.js and Express

## Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- WebSockets (Socket.IO)


## How It Works

1. Users authenticate using REST APIs.
2. After login, a WebSocket connection is established.
3. Messages are exchanged in real time.
4. Messages are stored in MongoDB.
5. Chat history is fetched via REST APIs.

## Installation

### Prerequisites
- Node.js
- MongoDB



## Future Enhancements

- Group chats
- Typing indicators
- Read receipts
- File sharing
