# MultiversX Dashboard (React + TypeScript + Vite)

A minimal MultiversX starter showcasing wallet connect, a simple dashboard, and a recent transactions table using shadcn-style UI components and Tailwind CSS v4.

## Features

-   Connect wallet via MultiversX providers (extension, WalletConnect, Ledger, etc.)
-   Dashboard with cards for Address, Balance (formatted), and Nonce
-   Recent Transactions table (last 5) pulled from the MultiversX API
-   Clean, modern UI components (Button, Card, Table) in the `src/components/ui` folder
-   React Router for navigation (Home, Dashboard)

## Tech Stack

-   React 19, TypeScript, Vite 7
-   Tailwind CSS v4
-   shadcn-style primitives (no generator) for Button, Card, Table
-   MultiversX SDKs: `@multiversx/sdk-dapp`, `@multiversx/sdk-dapp-ui`, `@multiversx/sdk-dapp-utils`

## Getting Started

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

## Project Structure

-   `src/main.tsx`: Initializes MultiversX dApp config (mainnet) and mounts the app
-   `src/App.tsx`: Router with `/` (Home) and `/dashboard`
-   `src/pages/Home.tsx`: Landing page with the connect button
-   `src/pages/Dashboard.tsx`: Account overview and recent transactions
-   `src/components/ConnectButton.tsx`: Unlock panel and login flow
-   `src/components/FormatAmount.tsx`: EGLD amount formatting using sdk-dapp-ui
-   `src/components/TransactionsTable.tsx`: Fetch and display last 5 transactions
-   `src/components/ui/*`: Button, Card, Table UI primitives
-   `src/index.css`: Tailwind v4 theme tokens and base styles

## Configuration

The dApp initializes with mainnet by default in `src/main.tsx`:

```ts
import { initApp } from "@multiversx/sdk-dapp/out/methods/initApp/initApp";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp/out/types/enums.types";

initApp({
    storage: { getStorageCallback: () => sessionStorage },
    dAppConfig: { environment: EnvironmentsEnum.mainnet },
});
```

To target testnet or devnet, change `environment` to `EnvironmentsEnum.testnet` or `EnvironmentsEnum.devnet`.

## Notes on Build Warnings

Vite may warn about large chunks and browser externalized Node modules (fs/path/crypto). These originate from SDK dependencies and are safe in the browser build. You can optionally tune chunking in `vite.config.ts` via `build.rollupOptions.output.manualChunks`.

## License

MIT
