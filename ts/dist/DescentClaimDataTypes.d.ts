export interface Enquiry {
    answers: Record<string, any>;
    confirmation?: string;
    consent: boolean;
}
export interface EnquiryCreateData {
    answers: Record<string, any>;
    confirmation?: string;
    consent: boolean;
}
export interface Guide {
    choice: number;
    question: string;
}
export interface GuideCreateData {
    choice: number;
    question: string;
}
export interface Mcp {
    id?: string;
    jsonrpc: any;
    method: string;
    params?: Record<string, any>;
}
export interface McpLoadMatch {
    id: string;
    jsonrpc?: any;
    method?: string;
    params?: Record<string, any>;
}
export interface McpCreateData {
    id?: string;
    jsonrpc: any;
    method: string;
    params?: Record<string, any>;
}
