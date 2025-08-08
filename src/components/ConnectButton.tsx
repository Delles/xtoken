import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { UnlockPanelManager } from "@multiversx/sdk-dapp/out/managers/UnlockPanelManager";
import { ProviderFactory } from "@multiversx/sdk-dapp/out/providers/ProviderFactory";
import type { IProviderFactory } from "@multiversx/sdk-dapp/out/providers/types/providerFactory.types";
import { useNavigate } from "react-router-dom";

export default function ConnectButton() {
    const navigate = useNavigate();
    const unlockPanelManager = useMemo(() => {
        return UnlockPanelManager.init({
            loginHandler: async ({ type, anchor }: IProviderFactory) => {
                try {
                    const provider = await ProviderFactory.create({
                        type,
                        anchor,
                    });
                    const result = await provider.login();
                    if (result && "address" in result) {
                        console.log("Logged in:", result.address);
                        navigate("/dashboard");
                    }
                } catch (error) {
                    console.error("Login failed", error);
                }
            },
            onClose: () => {
                // No-op for now; hook for when panel is closed without login
            },
        });
    }, [navigate]);

    const handleOpenUnlockPanel = () => {
        unlockPanelManager.openUnlockPanel();
    };

    return <Button onClick={handleOpenUnlockPanel}>Connect</Button>;
}
