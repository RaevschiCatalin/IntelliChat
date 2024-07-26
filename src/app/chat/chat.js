export const getAiResponse = async (input, onData, onComplete, onError) => {
    const url = `http://localhost:8080/api/chat?model=llama3.1&prompt=${encodeURIComponent(input)}&temperature=0.7`;

    try {
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            if (event.data) {
                try {
                    const trimmedData = event.data.trim();
                    console.log('Received raw data:', trimmedData);

                    // Handling various data formats
                    if (trimmedData.startsWith('data:')) {
                        const jsonString = trimmedData.replace(/^data:/, '');
                        const data = JSON.parse(jsonString);
                        onData(data.response);
                        if (data.done) {
                            eventSource.close();
                            onComplete();
                        }
                    }
                } catch (error) {
                    console.error('Error parsing JSON data:', error);
                }
            }
        };

        eventSource.onerror = (error) => {
            eventSource.close();
            onError(error);
        };

    } catch (error) {
        onError(error);
    }
};