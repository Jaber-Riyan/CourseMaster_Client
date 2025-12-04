const config = {
    localServerUrl: import.meta.env.VITE_LOCAL_SERVER_URL,
    productionServerUrl: import.meta.env.VITE_PRODUCTION_SERVER_URL,
    nodeEnv: import.meta.env.VITE_NODE_ENV as "production" | "development",
}

export default config