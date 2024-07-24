const config = {
    BACKEND_PATH: process.env.BACKEND_PATH || 'default/path',
    API_BASE_URL: process.env.API_BASE_URL || 'https://default-api.example.com',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'default-google-client-id',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'default-google-client-secret',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
};

export default config;
