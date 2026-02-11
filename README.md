# Blockchain Visualizer

An interactive web application that visualizes how blockchain works. Users can see blocks, mine new blocks with proof-of-work, and watch validation happen in real-time.

## Features

- **Chain Display** - Each block shows index, timestamp, data, previous hash, nonce, and hash with visual linking between blocks
- **Mining** - Enter transaction data and mine blocks with SHA-256 proof-of-work, with visual feedback and timing
- **Validation** - Real-time chain validity indicator that updates when blocks are added or tampered with
- **Difficulty Selector** - Choose difficulty 1-4 (number of leading zeros required in hash)
- **Tampering Demo** - Edit any block's data to see the chain become invalid with visual indicators
- **Auto-Mine** - Automatically mine 3 sample transaction blocks at once
- **Transaction Ledger** - View all block data in chronological order

## Tech Stack

- **Next.js 16** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **crypto-js** for SHA-256 hashing
- **Lucide React** for icons

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Mining**: Enter data and click "Mine Block". The system iterates through nonce values until it finds a hash that starts with the required number of zeros (determined by difficulty).
2. **Linking**: Each block stores the hash of the previous block, creating an immutable chain.
3. **Validation**: The app continuously checks that each block's hash is correct and that blocks are properly linked.
4. **Tampering**: Editing a block's data changes its hash, breaking the link to the next block, which is detected by validation.
