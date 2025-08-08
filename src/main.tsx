import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initApp } from "@multiversx/sdk-dapp/out/methods/initApp/initApp";
import type { InitAppType } from "@multiversx/sdk-dapp/out/methods/initApp/initApp.types";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp/out/types/enums.types";

const config: InitAppType = {
    storage: { getStorageCallback: () => sessionStorage },
    dAppConfig: {
        environment: EnvironmentsEnum.mainnet,
    },
};

initApp(config).then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
});
