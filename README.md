# Brand Reputation Monitor

## Overview
A web app that tracks brand mentions from multiple sources (Reddit, Twitter, News) with real-time updates and sentiment analysis.

## Features
- Live brand mention feed with sentiment tags
- Spike detection on mention volume
- Search and filter mentions
- Real-time updates using WebSocket (Socket.io)
- Responsive dashboard with charts and summaries

## Technology
- Backend: Node.js, Express, MongoDB, Socket.io
- Frontend: React, Material-UI, Axios
- Deployment: Backend on Render, Frontend on Vercel

## Setup Instructions
1. Clone the repo
2. Install dependencies:
   - `npm install` in both backend and frontend folders
3. Configure `.env` files with MongoDB URI and API keys
4. Run backend and frontend locally using `npm start`

## Live Demo
[Frontend](https://brand-reputation-monitor.vercel.app) | [Backend API](https://brand-reputation-monitor-1.onrender.com)

## Challenges
Managed API rate-limiting, CORS issues, and deployment environment differences with proper configurations.

## License
MIT License
