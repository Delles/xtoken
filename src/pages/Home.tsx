import ConnectButton from "@/components/ConnectButton";

export default function Home() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
            <h1 className="text-2xl font-semibold">Welcome</h1>
            <ConnectButton />
        </div>
    );
}
