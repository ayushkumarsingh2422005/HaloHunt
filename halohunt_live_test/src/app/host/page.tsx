"use client";
import { useEffect, useRef, useState } from "react";
import { generateToken04 } from "../../utils/zegoServerAssistant";

export default function HostPage() {
  const zgRef = useRef<any>(null);
  const localStreamRef = useRef<any>(null);
  const currentStreamIDRef = useRef<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStreamID, setCurrentStreamID] = useState("");
  const [isPublishingLoading, setIsPublishingLoading] = useState(false);

  const start = async () => {
    try {
      // Dynamically import ZegoExpressEngine only on client side
      const { ZegoExpressEngine } = await import("zego-express-engine-webrtc");

      const server = "wss://webliveroom453556669-api.coolzcloud.com/ws";
      const appID = 453556669;
      const secret = "266a1b3ba729a0580a2119f2964fd4fe";
      const roomID = "123";
      const token = generateToken04(appID, "demo", secret, 3600, "");
      const userID = "demo";
      const userName = "Demo User";
      
      const zg = new ZegoExpressEngine(appID, server);
      zgRef.current = zg;

      // Check system requirements
      const systemCheck = await zg.checkSystemRequirements();
      console.log("System requirements check:", systemCheck);

      if (!systemCheck.webRTC) {
        console.error("WebRTC is not supported in this browser");
        return;
      }

      // Login to room
      const loginResult = await zg.loginRoom(roomID, token, { userID: userID, userName: userName }, { userUpdate: true });
      console.log("Login result:", loginResult);

      // Set up event listeners
      zg.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
        console.log(`Room state update: ${state}`);
        if (state === 'CONNECTED') {
          setIsConnected(true);
          console.log("Connected to room");
        } else if (state === 'DISCONNECTED') {
          setIsConnected(false);
          console.log("Disconnected from room");
        }
      });

      zg.on('roomUserUpdate', (roomID, updateType, userList) => {
        console.warn(
          `roomUserUpdate: room ${roomID}, user ${updateType === 'ADD' ? 'added' : 'left'} `,
          JSON.stringify(userList),
        );
      });

      zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
        console.log(`Stream update: ${updateType}`, streamList);
        if (updateType === 'ADD') {
          // New stream added, start playing the stream
          for (const stream of streamList) {
            await playRemoteStream(stream.streamID);
          }
        } else if (updateType === 'DELETE') {
          // Stream deleted, stop playing the stream
          for (const stream of streamList) {
            await stopPlayingStream(stream.streamID);
          }
        }
      });

      // Publisher event listeners
      zg.on('publisherStateUpdate', (result) => {
        console.log("Publisher state update:", result);
        if (result.state === 'PUBLISHING') {
          setIsPublishing(true);
        } else if (result.state === 'NO_PUBLISH') {
          setIsPublishing(false);
        }
      });

      zg.on('publishQualityUpdate', (streamID, stats) => {
        console.log("Publish quality update:", streamID, stats);
      });

      // Player event listeners
      zg.on('playerStateUpdate', (result) => {
        console.log("Player state update:", result);
        if (result.state === 'PLAYING') {
          setIsPlaying(true);
        } else if (result.state === 'NO_PLAY') {
          setIsPlaying(false);
        }
      });

      zg.on('playQualityUpdate', (streamID, stats) => {
        console.log("Play quality update:", streamID, stats);
      });

    } catch (error) {
      console.error("Error starting Zego:", error);
    }
  };

  const publishStream = async () => {
    if (!zgRef.current || !isConnected) {
      console.error("Zego not initialized or not connected");
      return;
    }

    setIsPublishingLoading(true);
    try {
      console.log("Starting stream creation...");
      
      // Create local stream
      const localStream = await zgRef.current.createZegoStream();
      localStreamRef.current = localStream;
      console.log("Local stream created:", localStream);

      // Get the video element
      const localVideoElement = document.querySelector("#local-video");
      if (!localVideoElement) {
        throw new Error("Local video element not found");
      }

      // Play preview of the stream
      localStream.playVideo(localVideoElement);
      console.log("Local video preview started");

      // Generate unique stream ID
      const streamID = `stream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      currentStreamIDRef.current = streamID;
      setCurrentStreamID(streamID);
      
      // Start publishing
      console.log("Starting to publish stream with ID:", streamID);
      await zgRef.current.startPublishingStream(streamID, localStream);
      console.log("Successfully started publishing stream:", streamID);

    } catch (error) {
      console.error("Error publishing stream:", error);
      // Clean up on error
      if (localStreamRef.current) {
        try {
          await zgRef.current.destroyStream(localStreamRef.current);
          localStreamRef.current = null;
        } catch (cleanupError) {
          console.error("Error cleaning up stream:", cleanupError);
        }
      }
    } finally {
      setIsPublishingLoading(false);
    }
  };

  const playRemoteStream = async (streamID: string) => {
    if (!zgRef.current) {
      console.error("Zego not initialized");
      return;
    }

    try {
      console.log("Starting to play remote stream:", streamID);
      
      const remoteStream = await zgRef.current.startPlayingStream(streamID);
      console.log("Remote stream created:", remoteStream);
      
      const remoteView = zgRef.current.createRemoteStreamView(remoteStream);
      console.log("Remote view created:", remoteView);
      
      // Clear the remote video element first
      const remoteVideoElement = document.querySelector("#remote-video");
      if (remoteVideoElement) {
        remoteVideoElement.innerHTML = "";
      }
      
      remoteView.play("remote-video", { enableAutoplayDialog: true });
      console.log("Successfully started playing remote stream:", streamID);
    } catch (error) {
      console.error("Error playing remote stream:", error);
    }
  };

  const stopPlayingStream = async (streamID: string) => {
    if (!zgRef.current) {
      console.error("Zego not initialized");
      return;
    }

    try {
      await zgRef.current.stopPlayingStream(streamID);
      console.log("Stopped playing stream:", streamID);
    } catch (error) {
      console.error("Error stopping stream:", error);
    }
  };

  const stopPublishing = async () => {
    if (!zgRef.current || !localStreamRef.current) {
      console.error("Zego not initialized or no local stream");
      return;
    }

    try {
      const streamID = currentStreamIDRef.current;
      console.log("Stopping publishing stream:", streamID);
      
      // Stop publishing
      await zgRef.current.stopPublishingStream(streamID);
      console.log("Stopped publishing stream:", streamID);
      
      // Destroy local stream
      await zgRef.current.destroyStream(localStreamRef.current);
      localStreamRef.current = null;
      currentStreamIDRef.current = "";
      setCurrentStreamID("");
      
      // Clear the video element
      const localVideoElement = document.querySelector("#local-video");
      if (localVideoElement) {
        localVideoElement.innerHTML = "";
      }
      
      console.log("Successfully stopped publishing and cleaned up");
    } catch (error) {
      console.error("Error stopping publishing:", error);
    }
  };

  const disconnect = async () => {
    if (!zgRef.current) {
      console.error("Zego not initialized");
      return;
    }

    try {
      await zgRef.current.logoutRoom("123");
      console.log("Logged out from room");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    // Only run on client side
    start();

    // Cleanup on unmount
    return () => {
      if (zgRef.current) {
        disconnect();
      }
    };
  }, []);

  return (
    <div className="bg-background min-h-screen flex flex-col items-center py-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-primary mb-2">
          🎥 Live Stream Host
        </h1>
        <p className="text-gray-600 text-center">Broadcast your stream to viewers</p>
      </div>
      
      {/* Status indicators */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className={`px-3 py-1 rounded ${isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
        <div className={`px-3 py-1 rounded ${isPublishing ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}>
          {isPublishing ? 'Publishing' : 'Not Publishing'}
        </div>
        <div className={`px-3 py-1 rounded ${isPlaying ? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'}`}>
          {isPlaying ? 'Playing' : 'Not Playing'}
        </div>
        {currentStreamID && (
          <div className="px-3 py-1 rounded bg-yellow-500 text-white text-sm">
            Stream: {currentStreamID.substring(0, 15)}...
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={publishStream}
          disabled={!isConnected || isPublishing || isPublishingLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 flex items-center gap-2"
        >
          {isPublishingLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Starting...
            </>
          ) : (
            'Start Publishing'
          )}
        </button>
        <button
          onClick={stopPublishing}
          disabled={!isPublishing}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
        >
          Stop Publishing
        </button>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-secondary mb-2">📹 Your Stream (Local Preview)</h4>
          <div
            id="local-video"
            className="w-full relative rounded-lg overflow-hidden bg-gray-200"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Video will be injected here */}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-secondary mb-2">👥 Other Streams (Remote)</h4>
          <div
            id="remote-video"
            className="w-full relative rounded-lg overflow-hidden bg-gray-200"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Video will be injected here */}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <a 
          href="/viewer" 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          👁️ Go to Viewer Page
        </a>
      </div>
    </div>
  );
} 