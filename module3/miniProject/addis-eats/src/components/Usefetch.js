import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(url, { signal: controller.signal, cache: "no-store" }); if (!res.ok) {
                    throw new Error("Could not load the menu. Please try again.");
                }
                const json = await res.json();
                setData(json);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        load();

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
}