import { DescentClaimDataEntityBase } from '../DescentClaimDataEntityBase';
import type { DescentClaimDataSDK } from '../DescentClaimDataSDK';
import type { Control } from '../types';
import type { Guide, GuideCreateData } from '../DescentClaimDataTypes';
declare class GuideEntity extends DescentClaimDataEntityBase<Guide> {
    constructor(client: DescentClaimDataSDK, entopts: any);
    make(this: GuideEntity): GuideEntity;
    create(this: any, reqdata?: GuideCreateData, ctrl?: Control): Promise<GuideEntity>;
}
export { GuideEntity };
