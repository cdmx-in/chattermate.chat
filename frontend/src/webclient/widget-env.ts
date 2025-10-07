// @ts-nocheck
export interface InitialData {
    widgetId: string;
    agentName: string;
    customization: Record<string, any>;
    customerId: string;
    customer: Record<string, any>;
    initialToken?: string;
}

// @ts-ignore
declare global {
    // @ts-ignore
    interface Window {
        // @ts-ignore
        __INITIAL_DATA__: InitialData;
    }
}

// Helper function to get runtime configuration
function getRuntimeConfig() {
    // @ts-ignore - APP_CONFIG might not be available at build time
    return typeof window !== 'undefined' && window.APP_CONFIG ? window.APP_CONFIG : {};
}

export const widgetEnv = {
    get API_URL() {
        const config = getRuntimeConfig();
        return config.API_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    },
    get WS_URL() {
        const config = getRuntimeConfig();
        return config.WS_URL || import.meta.env.VITE_WS_URL || 'ws://localhost:8000';
    }
}
