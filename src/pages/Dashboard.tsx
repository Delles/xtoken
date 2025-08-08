import { useGetAccount } from "@multiversx/sdk-dapp/out/react/account/useGetAccount";
import { getAccountProvider } from "@multiversx/sdk-dapp/out/providers/helpers/accountProvider";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import FormatAmount from "@/components/FormatAmount";
import TransactionsTable from "@/components/TransactionsTable";

export default function Dashboard() {
    const account = useGetAccount();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const provider = getAccountProvider();
            if (provider && typeof provider.logout === "function") {
                await provider.logout();
            }
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            navigate("/");
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <p className="text-muted-foreground text-sm">
                        Overview of your MultiversX account
                    </p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Address</CardTitle>
                        <CardDescription>Your wallet address</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="break-all font-mono text-sm">
                            {account.address || "-"}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Balance</CardTitle>
                        <CardDescription>Available EGLD</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="font-mono text-base">
                            <FormatAmount value={account.balance} showLabel />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Nonce</CardTitle>
                        <CardDescription>
                            Next transaction nonce
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="font-mono text-sm">{account.nonce}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="border-b">
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardAction>
                        {/* placeholder for potential actions */}
                    </CardAction>
                    <CardDescription>
                        Last 5 transactions on-chain
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <TransactionsTable />
                </CardContent>
                <CardFooter className="justify-end">
                    {/* footer could host pagination or links later */}
                </CardFooter>
            </Card>
        </div>
    );
}
