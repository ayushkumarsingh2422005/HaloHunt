"use client";
import { useEffect, useRef, useState } from "react";
import { generateToken04 } from "../../utils/zegoServerAssistant";

export default function ViewerPage() {
  const zgRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableStreams, setAvailableStreams] = useState<string[]>([]);
  const [currentStreamID, setCurrentStreamID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const start = async () => {
    try {
      // Dynamically import ZegoExpressEngine only on client side
      const { ZegoExpressEngine } = await import("zego-express-engine-webrtc");

      const server = "wss://webliveroom453556669-api.coolzcloud.com/ws";
      const appID = 453556669;
      const secret = "266a1b3ba729a0580a2119f2964fd4fe";
      const roomID = "123";
      const token = generateToken04(appID, "viewer", secret, 3600, "");
      const userID = "viewer";
      const userName = "Viewer";
      
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
          // New stream added, add to available streams list
          const newStreams = streamList.map((stream: any) => stream.streamID);
          setAvailableStreams(prev => [...prev, ...newStreams]);
          console.log("Available streams:", [...availableStreams, ...newStreams]);
        } else if (updateType === 'DELETE') {
          // Stream deleted, remove from available streams list
          const removedStreams = streamList.map((stream: any) => stream.streamID);
          setAvailableStreams(prev => prev.filter(id => !removedStreams.includes(id)));
          
          // If current stream is deleted, stop playing
          if (removedStreams.includes(currentStreamID)) {
            await stopPlayingStream(currentStreamID);
            setCurrentStreamID("");
          }
        }
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

  const playStream = async (streamID: string) => {
    if (!zgRef.current || !isConnected) {
      console.error("Zego not initialized or not connected");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Starting to play stream:", streamID);
      
      const remoteStream = await zgRef.current.startPlayingStream(streamID);
      console.log("Remote stream created:", remoteStream);
      
      const remoteView = zgRef.current.createRemoteStreamView(remoteStream);
      console.log("Remote view created:", remoteView);
      
      // Clear the video element first
      const videoElement = document.querySelector("#main-video");
      if (videoElement) {
        videoElement.innerHTML = "";
      }
      
      remoteView.play("main-video", { enableAutoplayDialog: true });
      setCurrentStreamID(streamID);
      console.log("Successfully started playing stream:", streamID);

    } catch (error) {
      console.error("Error playing stream:", error);
    } finally {
      setIsLoading(false);
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
      
      // Clear the video element
      const videoElement = document.querySelector("#main-video");
      if (videoElement) {
        videoElement.innerHTML = "";
      }
      
      setCurrentStreamID("");
    } catch (error) {
      console.error("Error stopping stream:", error);
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
          👁️ Live Stream Viewer
        </h1>
        <p className="text-gray-600 text-center">Watch live streams from hosts</p>
      </div>
      
      {/* Status indicators */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className={`px-3 py-1 rounded ${isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
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

      {/* Available Streams */}
      {availableStreams.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-secondary mb-3">📺 Available Streams</h3>
          <div className="flex flex-wrap gap-2">
            {availableStreams.map((streamID) => (
              <button
                key={streamID}
                onClick={() => playStream(streamID)}
                disabled={isLoading || (currentStreamID === streamID && isPlaying)}
                className={`px-3 py-1 rounded text-sm ${
                  currentStreamID === streamID && isPlaying
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400'
                }`}
              >
                {isLoading && currentStreamID === streamID ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin inline mr-1"></div>
                ) : null}
                {streamID.substring(0, 12)}...
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Video Display */}
      <div className="w-full max-w-4xl mb-8">
        <h4 className="text-lg font-semibold text-secondary mb-2">🎬 Live Stream</h4>
        <div
          id="main-video"
          className="w-full relative rounded-lg overflow-hidden bg-gray-200"
          style={{ aspectRatio: "16/9" }}
        >
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📺</div>
                <p>No stream playing</p>
                {availableStreams.length > 0 && (
                  <p className="text-sm mt-1">Click on an available stream above to start watching</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control buttons */}
      {currentStreamID && (
        <div className="mb-8">
          <button
            onClick={() => stopPlayingStream(currentStreamID)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Stop Playing
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8">
        <a 
          href="/host" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🎥 Go to Host Page
        </a>
      </div>
    </div>
  );
} 