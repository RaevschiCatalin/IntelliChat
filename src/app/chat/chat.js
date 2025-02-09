import config from "../../lib/config";


export const getAiResponse = async (input, style, onData, onComplete, onError) => {
    const { API_BASE_URL } = config;
    const url = `${API_BASE_URL}/chat?model=llama3.2&prompt=${encodeURIComponent(input)}&temperature=${style}`;

    let fullResponse = ''; // Variable to store the full response as it comes in.

    try {
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            if (event.data) {
                try {
                    const trimmedData = event.data.trim();
                    console.log('Received raw data:', trimmedData);

                    if (trimmedData.startsWith('data:')) {
                        const jsonString = trimmedData.replace(/^data:/, '');
                        const data = JSON.parse(jsonString);

                        // Concatenate the response part
                        fullResponse += data.response;

                        // Pass the updated full response to onData
                        onData(fullResponse);

                        // If done, complete the process
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
            console.error('EventSource error:', error);
            eventSource.close();
            onError(error);
        };

        // Logging EventSource state
        eventSource.onopen = () => {
            console.log('EventSource connection opened');
        };

        eventSource.onclose = () => {
            console.log('EventSource connection closed');
        };

        return eventSource; // Return EventSource object to control from outside
    } catch (error) {
        console.error('Error initiating EventSource:', error);
        onError(error);
    }
};
