# WebSockets: how real-time apps talk

WebSockets are a way for a browser and a server to keep a single connection open and send messages in both directions at any time. Unlike normal HTTP requests, which follow a request/response pattern, WebSockets let the server push updates instantly without waiting for the client to ask again.

This makes them a natural fit for:

- chat apps
- live notifications
- dashboards
- collaborative tools
- multiplayer or presence-style features

## Why WebSockets are useful

In a normal HTTP flow, the client asks for data, the server responds, and the connection closes. If something changes on the server, the client must ask again.

With WebSockets:

- the connection stays open
- messages can flow in both directions
- updates arrive as soon as they happen

That means less polling and a more responsive user experience.

## WebSocket basics

The browser begins with an HTTP request called the **upgrade** handshake. If the server agrees, the connection switches from HTTP to a WebSocket channel.

After that, both sides can send messages whenever they want. The messages are often structured as events, for example:

- `join`
- `message`
- `typing`
- `presence`

Raw WebSockets are very small and flexible. Libraries like Socket.IO add convenient features such as:

- event names
- automatic reconnects
- room support
- fallback handling

## Rooms and private delivery

A common chat pattern is to place users into rooms. A room is just a logical grouping that lets the server broadcast messages to the right people.

For private chat:

- both users share the same room key
- the sender emits a message event
- the server forwards it to the target room
- the recipient receives it instantly

This keeps message routing simple and avoids sending the message to unrelated users.

## Real-time delivery vs persistence

WebSockets are good at moving messages live, but they are not a database. In most apps, you still persist messages elsewhere so that:

- conversations reload after refresh
- users can see old history
- message state can be synced across devices

That usually means using WebSockets for live transport and REST or database writes for storage.

## Common pieces in a WebSocket app

| Term | Meaning |
|---|---|
| Handshake | HTTP upgrade into a WebSocket connection |
| Event | Named message sent over the socket |
| Room | Logical channel for a subset of users |
| Broadcast | Sending to many clients at once |
| Reconnect | Re-establishing the socket after a drop |
| Persistence | Saving the data outside the live socket |

## Project usage

This repo uses Socket.IO for private chat delivery and REST for persistence.

- `backend/src/index.js` creates the Socket.IO server.
- `backend/src/chat-sockets/chatController.js` handles chat history storage and retrieval.
- `frontend/src/pages/Home.jsx` connects with `socket.io-client`, registers the username, joins a private room, and sends messages.
- The app uses `GET /chat/receive` to load history and `POST /chat/update` to save sender and receiver copies.
- Message rooms are built from a sorted pair of usernames joined with `#`.
