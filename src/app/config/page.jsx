import config from "@/lib/config"

export default function Config() {
    const {BACKEND_PATH, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, API_BASE_URL, NEXTAUTH_URL} = config;
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>{BACKEND_PATH}</h1>
            <h1>{GOOGLE_CLIENT_SECRET}</h1>
            <h1>{GOOGLE_CLIENT_ID}</h1>
            <h1>{API_BASE_URL}</h1>
            <h1>{NEXTAUTH_URL}</h1>
        </main>
    );
}
