export async function fetchLlamaResponse(input, token) {
    const response = await fetch(`/api/llama?input=${encodeURIComponent(input)}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
