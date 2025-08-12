# Token Studio - MultiversX Token Creation Platform

A user-friendly, no-code web platform that allows anyone to create and manage MultiversX ESDT (fungible) and SFT (semi-fungible) tokens without writing a single line of code.

## 🎯 App Overview and Objectives

**App Name (Placeholder):** Token Studio / TokenForge / Creator's Launchpad

**Concept:** A user-friendly, no-code web platform that allows anyone to create and manage MultiversX ESDT (fungible) and SFT (semi-fungible) tokens without writing a single line of code.

**Primary Objectives:**

-   **Democratize Token Creation:** Make the MultiversX blockchain accessible to non-technical users like community managers, small business owners, artists, and enthusiasts.
-   **Drive Ecosystem Growth:** Increase the usage and adoption of the MultiversX network by lowering the barrier to entry for creating new projects.
-   **Provide an Exceptional User Experience:** Abstract away all blockchain complexity and jargon, creating an intuitive experience for managing digital assets.

## 👥 Target Audience

The platform is designed for a broad audience with a "build for anyone" philosophy. Key user profiles include:

-   **Community Managers:** Creating social tokens to reward engagement.
-   **Small Business Owners:** Creating loyalty points for customers.
-   **Event Organizers:** Creating SFTs as tickets or collectibles.
-   **Meme Coin Creators:** Launching fun, community-driven tokens.
-   **General Enthusiasts:** Experimenting with token creation for learning or personal projects.

## 🚀 Core Features & Functionality

### Phase 1: Minimum Viable Product (MVP)

-   **User Authentication:**
    -   Connect wallet functionality supporting **xPortal (QR Code)** and the **MultiversX DeFi Wallet (Browser Extension)**.
-   **Token Creation Wizard:**
    -   A multi-step, guided process to replace a complex single form.
    -   **Step 1 (Identity):** Define Token Name and Ticker.
    -   **Step 2 (Supply):** Choose between a fixed supply or a flexible (mintable) supply and set the initial amount.
    -   **Step 3 (Configuration):** Use simple toggles and questions to configure token properties (canFreeze, canBurn, canPause, etc.) without using technical terms.
    -   **Step 4 (Review & Launch):** A final summary in plain English before triggering the wallet transaction.
-   **User Dashboard:**
    -   **Empty State:** A welcoming screen that guides new users towards their first token creation with inspirational examples.
    -   **Populated State:** A card-based view of all tokens created by the user's connected wallet. Each card displays the token's friendly name, icon, and key info.
-   **Token Management Page:**
    -   A dedicated page for each created token.
    -   Provides simple, interactive modules to manage the token's properties (e.g., a "Create More Tokens" section for minting, an "Emergency Pause" switch for freezing).

## 🛠️ Technical Stack

-   **Frontend Framework:** React with modern tooling
-   **UI/CSS:** Tailwind CSS v4 with shadcn-style UI components
-   **Blockchain Interaction:** Official MultiversX JS SDKs (sdk-core, sdk-dapp)
-   **Backend / Database:** Supabase (Postgres database for off-chain metadata)
-   **Hosting:** Vercel or Netlify (seamless integration with React, continuous deployment)

## 🏗️ Data Model & Architecture

This is a hybrid architecture balancing on-chain and off-chain data.

-   **On-Chain Data (Source of Truth):**
    -   Token properties (ticker, decimals, canMint, etc.)
    -   Live circulating supply
    -   Current token owner/manager address
    -   _Fetched in real-time via MultiversX APIs._
-   **Off-Chain Database (Supabase):**
    -   Users table (optional, links a wallet address to profile info).
    -   Tokens table:
        -   token_identifier (e.g., "MYTOKEN-123456")
        -   creator_wallet_address
        -   friendly_name (e.g., "My Community's Reward Point")
        -   project_description
        -   logo_url (can use Supabase Storage for uploads)
    -   KeyTransactions table (optional, for history):
        -   token_identifier
        -   tx_hash
        -   type ("Creation", "Major Mint", "Ownership Transfer")
        -   timestamp

**Data Sync Strategy:** "Refresh on Visit." When a user views their dashboard or a token page, the app will:

1. Instantly display the cached data from Supabase.
2. Simultaneously, make background API calls to the MultiversX network to fetch live data.
3. Update the UI and the Supabase cache with any new information.

## 🎨 User Interface & Design Principles

-   **Core Principle:** Clarity and Accessibility.
-   **Tone:** Friendly, encouraging, and empowering.
-   **Visual Style:** Clean, modern, and uncluttered. Lots of white space, clear typography, and intuitive icons.
-   **Flow:** Prioritize guided wizards and step-by-step processes over dense forms and dashboards.
-   **Responsiveness:** Mobile-first design to ensure a seamless experience on all devices, especially within the xPortal dApp browser.

## 💰 Business Model

-   **Community-First Approach:** The platform will be positioned as a valuable tool for the community.
-   **Sustainability:** A small, transparent **service fee** (denominated in EGLD) will be programmatically added to key transactions, such as the initial token creation. This fee must be clearly communicated to the user before they sign the transaction.

## ⚠️ Potential Challenges & Solutions

-   **Challenge:** Keeping the UI simple while still offering all of the powerful ESDT features.
    -   **Solution:** Stick rigorously to the "wizard" model. Use progressive disclosure—hide advanced options behind an "Advanced" toggle if necessary.
-   **Challenge:** Accurately calculating network transaction fees for the user.
    -   **Solution:** Use the MultiversX SDKs to simulate transactions and provide a reliable gas fee estimate to the user before they sign.
-   **Challenge:** A user loses access to their wallet.
    -   **Solution:** This is a user-centric issue, but the platform should include clear educational messages: "We never have access to your wallet or funds. Store your recovery phrase safely!"

## 🔮 Future Expansion Possibilities (Post-MVP)

-   **Airdrop Tool:** A utility to help token creators distribute their tokens to a list of addresses.
-   **Simple Analytics:** A dashboard showing basic analytics for a created token (e.g., number of holders over time).
-   **NFTs:** Expand the creation wizard to support Non-Fungible Tokens.
-   **Liquidity Pool Helper:** A guide or integrated tool that helps users create a liquidity pool on a decentralized exchange like xExchange.

## 🚀 Getting Started

1. Install dependencies:
    ```bash
    npm install
    ```
2. Run in development:
    ```bash
    npm run dev
    ```
3. Build for production:
    ```bash
    npm run build
    ```
4. Preview the production build:
    ```bash
    npm run preview
    ```

## 📁 Project Structure

-   `src/main.tsx`: Initializes MultiversX dApp config and mounts the app
-   `src/App.tsx`: Router with main application routes
-   `src/pages/`: Application pages (Home, Dashboard, Token Management)
-   `src/components/`: Reusable UI components
-   `src/components/ui/*`: Button, Card, Table UI primitives
-   `src/index.css`: Tailwind v4 theme tokens and base styles

## 📝 License

MIT
