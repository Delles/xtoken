import { useEffect, useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetAccount } from "@multiversx/sdk-dapp/out/react/account/useGetAccount";
import { useGetNetworkConfig } from "@multiversx/sdk-dapp/out/react/network/useGetNetworkConfig";
import FormatAmount from "@/components/FormatAmount";

type ApiTransaction = {
    txHash: string;
    sender: string;
    receiver: string;
    value: string; // in wei (10^18)
    timestamp: number; // unix seconds
    status: string;
};

type RawTransaction = {
    txHash?: string;
    hash?: string;
    sender?: string;
    receiver?: string;
    value?: string | number;
    timestamp?: number | string;
    status?: string;
};

export default function TransactionsTable() {
    const { address } = useGetAccount();
    const {
        network: { explorerAddress },
    } = useGetNetworkConfig();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [txs, setTxs] = useState<ApiTransaction[]>([]);

    const explorerBase =
        explorerAddress?.replace(/\/$/, "") ||
        "https://explorer.multiversx.com";

    useEffect(() => {
        let cancelled = false;
        async function load() {
            if (!address) return;
            try {
                setLoading(true);
                setError(null);
                // MultiversX gateway API - fetch latest txs for address
                // Docs: https://api.multiversx.com
                const url = `https://api.multiversx.com/accounts/${address}/transactions?from=0&size=5&withScamInfo=true`;
                const resp = await fetch(url);
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const data = (await resp.json()) as RawTransaction[];
                if (cancelled) return;
                const normalized: ApiTransaction[] = (
                    Array.isArray(data) ? data : []
                ).map((t: RawTransaction) => ({
                    txHash: (t.txHash || t.hash || "").toString(),
                    sender: t.sender || "",
                    receiver: t.receiver || "",
                    value: String(t.value ?? "0"),
                    timestamp: Number(t.timestamp ?? 0),
                    status: t.status || "",
                }));
                setTxs(normalized);
            } catch (err: unknown) {
                if (!cancelled)
                    setError(
                        err instanceof Error ? err.message : "Failed to load"
                    );
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, [address]);

    const rows = useMemo(() => txs, [txs]);

    if (!address) {
        return (
            <div className="text-sm text-muted-foreground">
                Connect a wallet to view recent transactions.
            </div>
        );
    }

    return (
        <div className="w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Hash</TableHead>
                        <TableHead>Direction</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="hidden sm:table-cell text-right">
                            Time
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-right">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading && (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="py-6 text-center text-muted-foreground"
                            >
                                Loading...
                            </TableCell>
                        </TableRow>
                    )}
                    {error && !loading && (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="py-6 text-center text-destructive"
                            >
                                {error}
                            </TableCell>
                        </TableRow>
                    )}
                    {!loading && !error && rows.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="py-6 text-center text-muted-foreground"
                            >
                                No recent transactions
                            </TableCell>
                        </TableRow>
                    )}
                    {rows.map((tx) => {
                        const isOutgoing =
                            tx.sender?.toLowerCase() === address.toLowerCase();
                        const dir = isOutgoing ? "Sent" : "Received";
                        const date = tx.timestamp
                            ? new Date(tx.timestamp * 1000)
                            : null;
                        const hashShort = tx.txHash
                            ? `${tx.txHash.slice(0, 6)}...${tx.txHash.slice(
                                  -4
                              )}`
                            : "-";
                        const txUrl = tx.txHash
                            ? `${explorerBase}/transactions/${tx.txHash}`
                            : undefined;
                        return (
                            <TableRow key={`${tx.txHash}-${tx.timestamp}`}>
                                <TableCell className="font-mono">
                                    {txUrl ? (
                                        <a
                                            href={txUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary underline-offset-4 hover:underline"
                                        >
                                            {hashShort}
                                        </a>
                                    ) : (
                                        hashShort
                                    )}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={
                                            isOutgoing
                                                ? "text-amber-600 dark:text-amber-400"
                                                : "text-emerald-600 dark:text-emerald-400"
                                        }
                                    >
                                        {dir}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <FormatAmount value={tx.value} />
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-right text-muted-foreground">
                                    {date ? date.toLocaleString() : "-"}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-right">
                                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs">
                                        {tx.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
