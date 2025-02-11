import config from "../../lib/config";

export const getAiResponse = (input, style, onData, onComplete, onError) => {
    const { API_BASE_URL } = config;
    const url = `${API_BASE_URL}/chat?model=llama3.2&prompt=${encodeURIComponent(input)}&temperature=${style}`;

    let fullResponse = "";
    let isDone = false;
    let isStopped = false;

    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
        console.log("EventSource connection opened");
    };

    eventSource.onmessage = (event) => {
        if (isStopped) return;
        if (!event.data) return;

        let dataStr = event.data.trim();
        if (dataStr.startsWith("data:")) {
            dataStr = dataStr.slice(5).trim();
        }

        try {
            const data = JSON.parse(dataStr);
            console.log("Received raw data:", data);

            if (data.response) {
                const token = data.response;
                const words = token.match(/(\S+\s*)/g);
                if (words && words.length > 1) {
                    words.forEach((word, index) => {
                        setTimeout(() => {
                            fullResponse += word;
                            onData(fullResponse);
                        }, index * 100);
                    });
                } else {
                    fullResponse += token;
                    onData(fullResponse);
                }
            }

            if (data.done) {
                isDone = true;
                eventSource.close();
                onComplete(fullResponse);
            }
        } catch (error) {
            console.error("Error parsing JSON data:", error);
            onError(error);
        }
    };

    eventSource.onerror = (error) => {
        if (isStopped || isDone) {
            console.log("EventSource connection closed.");
            return;
        }
        console.error("EventSource error:", error);
        eventSource.close();
        onError(error);
        setTimeout(() => {
            if (!isStopped && !isDone) {
                getAiResponse(input, style, onData, onComplete, onError);
            }
        }, 3000);
    };

    const stop = () => {
        if (!isStopped) {
            isStopped = true;
            eventSource.close();
            console.log("EventSource connection stopped by user");
        }
    };
    return { stop };
};