# Forex Trading Platform

## 🚀 Live Demo

[Live Demo Link](case-study-rho.vercel.app) 

## 📝 Description

A real-time forex trading platform built with Vue 3, TypeScript, and PrimeVue. Track live forex pairs, manage your portfolio, and simulate trading activities with real-time market data from Finnhub API.

## ✨ Features

- Real-time forex pair tracking with WebSocket connection
- Portfolio management with buy capabilities
- Multi-pair selection and bulk operations
- Responsive design optimized for all devices
- Type-safe implementation with TypeScript
- State persistence and error handling

## 🛠 Tech Stack

- Vue 3 (Composition API)
- TypeScript
- PrimeVue
- Tailwind CSS
- Pinia
- Vue Router
- Vite
- pnpm

## 📦 Installation

1. Clone the repository:

```bash
git clone git@github.com:omerbugraoz/case-study.git
cd case-study
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```bash
VITE_FINNHUB_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
pnpm dev
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── layout/          # Layout components
├── composables/         # Composition functions
├── stores/              # Pinia stores
├── types/              # TypeScript interfaces
├── services/           # API services
├── utils/              # Utility functions
└── views/              # Page components
```

## 🔑 Key Implementation Details

### State Management

- Utilized Pinia for centralized state management
- Implemented persistent storage for user portfolio
- Type-safe store actions and state

### Real-time Data Handling

- WebSocket connection with automatic reconnection
- Rate limiting implementation
- Efficient data updates with Vue 3 reactivity system

### Performance Optimizations

- Memoization for expensive calculations
- Virtual scrolling for large datasets
- Debounced WebSocket updates

### Error Handling

- Comprehensive error boundaries
- User-friendly error messages
- Automatic retry mechanism for failed connections
- Logging system for debugging

### Important decisions and their reasons

┌─────────────────┐    postTick()    ┌─────────────────┐
│   ForexWorker   │ ───────────────→ │   Main Thread   │
│  (Background)   │                  │   (UI Thread)   │
└─────────────────┘                  └─────────────────┘

- Web Worker Architecture: WebSocket connections and data processing are handled in a separate thread to prevent blocking the main UI thread. This ensures smooth user experience even with high-frequency data updates.

- Rate Limiting: Implemented a buffer system that collects ticks for 1 second before sending them in batches. This prevents overwhelming both the client and server:
  - Reduces unnecessary UI updates
  - Respects API rate limits
  - Only sends latest price per symbol
  - Optimizes network usage

- Error Handling:
  - Automatic reconnection with exponential backoff
  - Distinguishes between manual disconnects and errors
  - Proper cleanup of resources on disconnect
  - Comprehensive error reporting to UI

- Efficient Memory Management:
  - Uses Set for event listeners to prevent duplicates
  - Cleans up buffer periodically
  - Proper nulling of WebSocket references
  - Cleanup of intervals on disconnect

- Type-Safe Communication:
  - Strictly typed messages between Worker and UI
  - Clear interfaces for all data structures
  - Runtime validation of incoming data
  - Type-safe event handling

---

# Forex Tracker Case Study

## Overview

In this case study, you are expected to develop a web application that displays and manages real-time forex data using the Finnhub API. The provided `websocket-service.ts` file contains the functionality to connect to the Finnhub WebSocket API and receive forex data.

## Getting Started

### Finnhub API Setup

1. Visit [Finnhub.io](https://finnhub.io/) and create a free account
2. After registration, get your API key from the dashboard
3. Add your API key to the `API_KEY` constant in `websocket-service.ts`

Note: The free tier of Finnhub API has certain rate limits, please refer to their documentation for details.

## Requirements

### 1. Forex Pairs Tracker Page

- Create a table displaying real-time forex pair data using the provided service file
- The table should include the following columns:
  - Pair (e.g., EUR/USD)
  - Price (5 decimals)
  - Change (as %, 3 decimals)
  - Volume
  - Last Update (hour:minute:second)
- Price changes should be indicated with different colors:
  - Increase: Green
  - Decrease: Red
- The table should support multiple selection

### 2. My Assets Page

- Create a portfolio page where users can track their selected forex pairs and amounts
- The table should include the following columns:
  - Pair
  - Price (purchase price)
  - Volume (amount)
  - Total Value (price \* volume)
- Each row should have a delete button
- Add functionality to export data in CSV format

### 3. Navigation & Layout

- Create a fixed sidebar menu on the left
- Menu should contain links for two pages:
  - Tracker
  - My Assets
- Implement routing for page transitions

### 4. Import/Buy Functionality

- Add a "Buy" button to import selected pairs from Forex Pairs Tracker to My Assets
- During the Buy process:
  - Volume (amount) should be definable for each pair
  - Current price should be used
  - When buying the same pair again, volume values should be summed

## Technical Requirements

- Use Vue 3 Composition API
- Ensure type safety with TypeScript
- Use PrimeVue component library
- Use pinia store for state management
- Apply responsive design principles

## Bonus Points

- Write unit tests
- Implement error handling

## Evaluation Criteria

- Clean code and best practices
- Component architecture
- TypeScript usage
- State management
- UI/UX design
- Performance optimizations
- Error handling
- Code organization and structure

## Submission

- Share your work in a GitHub repository
- In the README file, explain:
  - Setup steps
  - Technologies used
  - Project structure
  - Important decisions and their reasons
- Share a working demo link

### Bonus Points

- Implement rate limiting
- Add data validation
- Implement data persistence
- Add performance optimizations
- Include monitoring and metrics

Good luck! 🚀
