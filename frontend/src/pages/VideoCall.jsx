import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const JOIN_VIDEO_URL = import.meta.env.VITE_JOIN_VIDEO_URL;
const ZEGO_APP_ID = Number(import.meta.env.VITE_ZEGO_APP_ID || 941745382);
const ZEGO_SERVER_SECRET =
  import.meta.env.VITE_ZEGO_SERVER_SECRET || "fb27b54804c441a3aa0be16a65a34644";

export function VideoCall() {
  const { roomID } = useParams();
  const decodedRoomID = decodeURIComponent(roomID || "");
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const username = sessionStorage.getItem("username") || "Guest";
  const token = sessionStorage.getItem("token");
  const shareUrl = `${window.location.origin}/video/${encodeURIComponent(decodedRoomID)}`;

  useEffect(() => {
    if (!decodedRoomID) {
      setError("Invalid video room.");
      return;
    }

    let cancelled = false;

    async function startCall() {
      if (token) {
        const params = new URLSearchParams({
          roomId: decodedRoomID,
          username,
          token,
        });
        const response = await fetch(`${JOIN_VIDEO_URL}?${params.toString()}`);
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          if (!cancelled) {
            setError(data.error || "Unable to join this video room.");
          }
          return;
        }
      }

      if (cancelled || !containerRef.current) return;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        ZEGO_APP_ID,
        ZEGO_SERVER_SECRET,
        decodedRoomID,
        Date.now().toString(),
        username
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        sharedLinks: [
          {
            name: "Share Link",
            url: shareUrl,
          },
        ],
      });
    }

    startCall().catch(() => {
      if (!cancelled) setError("Failed to start video call.");
    });

    return () => {
      cancelled = true;
    };
  }, [decodedRoomID]);

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-950 text-white gap-4">
        <p className="text-xl">{error}</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-green-400 px-6 py-3 rounded-xl text-lg cursor-pointer"
        >
          Back to chat
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-blue-950">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-700 text-white">
        <span className="text-lg truncate">Video call — {decodedRoomID}</span>
        <div className="flex gap-2">
          <button
            onClick={copyLink}
            className="bg-green-400 px-4 py-2 rounded-lg cursor-pointer text-sm"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-500 px-4 py-2 rounded-lg cursor-pointer text-sm"
          >
            Back to chat
          </button>
        </div>
      </div>
      <div ref={containerRef} className="flex-grow w-full" />
    </div>
  );
}
