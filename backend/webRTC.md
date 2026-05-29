# WebRTC: how browser video calls work

WebRTC is the browser technology that makes real-time audio and video possible without routing the media through a normal backend server. It is designed for low-latency communication between peers, which is why it is used for video calls, voice calls, and other live media experiences.

At a high level, WebRTC gives you three things:

1. Media capture and playback through the browser.
2. A peer-to-peer connection for sending audio/video/data.
3. A negotiation flow so both sides can agree on how the connection should work.

## The basic WebRTC flow

### 1. Capture media

The call usually starts with `getUserMedia()`, which asks the browser for access to the camera and microphone. The browser returns media tracks that can be attached to the local preview and sent to the other peer.

### 2. Create a peer connection

`RTCPeerConnection` is the core WebRTC object. It manages the connection, tracks, codecs, and network negotiation.

### 3. Exchange session details

Before two peers can talk, they must exchange connection details:

- **SDP**: session description protocol, the offer/answer format that describes media and connection capabilities.
- **ICE candidates**: possible network paths the peers can try.

### 4. Use signaling

WebRTC does not define how offer/answer data should travel between peers. That missing piece is called **signaling**. Any transport can be used for signaling:

- HTTP
- WebSockets
- REST polling
- a custom server

The signaling channel only helps peers find each other. The actual audio/video traffic then flows over the WebRTC connection.

## Why STUN and TURN matter

Most devices are behind NAT or firewalls, so direct peer-to-peer connectivity is not always obvious.

- **STUN** helps a peer discover its public-facing network address.
- **TURN** relays traffic when a direct connection cannot be established.

In practice, STUN is used for discovery and TURN is the fallback for difficult network situations.

## Why WebRTC is different from a normal video API

WebRTC is not a full product by itself. It is a communication layer. You still need:

- UI for call controls
- signaling for setup
- server-side authentication if needed
- a strategy for multi-user calls if the app grows beyond 1:1

For one-to-one calls, a direct peer connection is often enough. For larger rooms, applications typically use an SFU so the backend can forward streams efficiently instead of every client connecting to every other client.

## Common pieces you will see in a WebRTC app

| Term | Meaning |
|---|---|
| `getUserMedia()` | Gets camera/microphone access |
| `RTCPeerConnection` | Manages the call connection |
| SDP offer/answer | Negotiation payload between peers |
| ICE candidate | Network path discovery data |
| STUN | Helps discover public network address |
| TURN | Relays traffic when direct routing fails |
| Signaling | Moves SDP/ICE between peers |

## Project usage

This repo uses `ZegoUIKitPrebuilt` for the actual call experience, so the frontend handles the media session while the backend only validates access.

- `frontend/src/pages/Home.jsx` creates the call link from the selected chat partner.
- `frontend/src/pages/VideoCall.jsx` reads the room ID from the route and joins the call.
- `backend/src/video/routes/video-routes.js` exposes `GET /video/join`.
- `backend/src/video/videoControl.js` validates `roomId` and `username` and returns them to the client.
- The UI uses `VITE_JOIN_VIDEO_URL`, `VITE_ZEGO_APP_ID`, and `VITE_ZEGO_SERVER_SECRET`.
