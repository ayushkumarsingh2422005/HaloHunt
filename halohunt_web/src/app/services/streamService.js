const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error('Authentication token not found');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

// Stream API functions
export const streamService = {
  // Create a new stream
  createStream: async (streamData) => {
    return makeAuthenticatedRequest('/api/v1/streams', {
      method: 'POST',
      body: JSON.stringify({
        title: streamData.title,
        description: streamData.description,
        hashtags: streamData.hashtags,
        aboutThisStream: streamData.aboutThisStream,
        thumbnail: streamData.thumbnail,
        thumbnailKey: streamData.thumbnailKey,
        scheduledAt: streamData.scheduledAt ? new Date(streamData.scheduledAt).toISOString() : null,
        status: streamData.status,
        taggedProductId: streamData.taggedProductId || null
      })
    });
  },

  // Get user's streams
  getMyStreams: async () => {
    return makeAuthenticatedRequest('/api/v1/streams/my-streams');
  },

  // Get public streams
  getPublicStreams: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/api/v1/streams${queryParams ? `?${queryParams}` : ''}`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  },

  // Get single stream
  getStream: async (streamId) => {
    return makeAuthenticatedRequest(`/api/v1/streams/${streamId}`);
  },

  // Update stream
  updateStream: async (streamId, streamData) => {
    return makeAuthenticatedRequest(`/api/v1/streams/${streamId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: streamData.title,
        description: streamData.description,
        hashtags: streamData.hashtags,
        aboutThisStream: streamData.aboutThisStream,
        thumbnail: streamData.thumbnail,
        thumbnailKey: streamData.thumbnailKey,
        scheduledAt: streamData.scheduledAt ? new Date(streamData.scheduledAt).toISOString() : null,
        status: streamData.status,
        taggedProductId: streamData.taggedProductId && streamData.taggedProductId.trim() !== '' ? streamData.taggedProductId : null
      })
    });
  },

  // Delete stream
  deleteStream: async (streamId) => {
    return makeAuthenticatedRequest(`/api/v1/streams/${streamId}`, {
      method: 'DELETE'
    });
  },

  // Start stream
  startStream: async (streamId) => {
    return makeAuthenticatedRequest(`/api/v1/streams/${streamId}/start`, {
      method: 'PUT'
    });
  },

  // End stream
  endStream: async (streamId) => {
    return makeAuthenticatedRequest(`/api/v1/streams/${streamId}/end`, {
      method: 'PUT'
    });
  },

  // Like/Unlike stream
  toggleLike: async (streamId, action) => {
    return makeAuthenticatedRequest(`/api/v1/streams/${streamId}/like`, {
      method: 'PUT',
      body: JSON.stringify({ action })
    });
  },

  // Get stream statistics
  getStreamStats: async (streamId) => {
    return makeAuthenticatedRequest(`/api/v1/streams/${streamId}/stats`);
  },

  // Search streams
  searchStreams: async (query, params = {}) => {
    const searchParams = new URLSearchParams({
      q: query,
      ...params
    }).toString();

    const response = await fetch(`${API_BASE_URL}/api/v1/streams/search?${searchParams}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }
};
