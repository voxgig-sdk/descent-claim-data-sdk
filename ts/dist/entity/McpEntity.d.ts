import { DescentClaimDataEntityBase } from '../DescentClaimDataEntityBase';
import type { DescentClaimDataSDK } from '../DescentClaimDataSDK';
import type { Control } from '../types';
import type { Mcp, McpLoadMatch, McpCreateData } from '../DescentClaimDataTypes';
declare class McpEntity extends DescentClaimDataEntityBase<Mcp> {
    constructor(client: DescentClaimDataSDK, entopts: any);
    make(this: McpEntity): McpEntity;
    load(this: any, reqmatch?: McpLoadMatch, ctrl?: Control): Promise<McpEntity>;
    create(this: any, reqdata?: McpCreateData, ctrl?: Control): Promise<McpEntity>;
}
export { McpEntity };
