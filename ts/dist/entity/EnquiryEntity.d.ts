import { DescentClaimDataEntityBase } from '../DescentClaimDataEntityBase';
import type { DescentClaimDataSDK } from '../DescentClaimDataSDK';
import type { Control } from '../types';
import type { Enquiry, EnquiryCreateData } from '../DescentClaimDataTypes';
declare class EnquiryEntity extends DescentClaimDataEntityBase<Enquiry> {
    constructor(client: DescentClaimDataSDK, entopts: any);
    make(this: EnquiryEntity): EnquiryEntity;
    create(this: any, reqdata?: EnquiryCreateData, ctrl?: Control): Promise<EnquiryEntity>;
}
export { EnquiryEntity };
