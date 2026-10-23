import { EnquiryEntity } from './entity/EnquiryEntity';
import { GuideEntity } from './entity/GuideEntity';
import { McpEntity } from './entity/McpEntity';
export type * from './DescentClaimDataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DescentClaimDataEntityBase } from './DescentClaimDataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class DescentClaimDataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Enquiry(entopts?: Record<string, any>): EnquiryEntity;
    Guide(entopts?: Record<string, any>): GuideEntity;
    Mcp(entopts?: Record<string, any>): McpEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DescentClaimDataSDK;
    tester(testopts?: any, sdkopts?: any): DescentClaimDataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DescentClaimDataSDK;
export { stdutil, config, BaseFeature, DescentClaimDataEntityBase, DescentClaimDataSDK, SDK, };
export type { DirectResult };
