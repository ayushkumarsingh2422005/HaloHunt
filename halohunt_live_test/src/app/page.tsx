export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center py-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">
          🎥 Live Streaming Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Powered by Zego RTC - Real-time audio and video streaming
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Host Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="text-4xl mb-4">🎥</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Host Stream</h2>
            <p className="text-gray-600 mb-6">
              Start broadcasting your live stream. Share your camera and microphone with viewers.
            </p>
            <a 
              href="/host" 
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Start Broadcasting
            </a>
          </div>

          {/* Viewer Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="text-4xl mb-4">👁️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Watch Streams</h2>
            <p className="text-gray-600 mb-6">
              Join as a viewer and watch live streams from hosts in real-time.
            </p>
            <a 
              href="/viewer" 
              className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Start Watching
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Real-time</h3>
            <p className="text-sm text-gray-600">Ultra-low latency streaming</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2">Secure</h3>
            <p className="text-sm text-gray-600">Encrypted connections</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Cross-platform</h3>
            <p className="text-sm text-gray-600">Works on all devices</p>
          </div>
        </div>
      </div>
    </div>
  );
}
