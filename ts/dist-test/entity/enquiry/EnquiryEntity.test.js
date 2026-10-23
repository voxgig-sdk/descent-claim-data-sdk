"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EnquiryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DESCENT_CLAIM_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DESCENT_CLAIM_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DescentClaimDataSDK.test();
        const ent = testsdk.Enquiry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DescentClaimDataSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Enquiry().create({ "answers": "x", "confirmation": 1, "consent": true }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DESCENT_CLAIM_DATA_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'enquiry.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "answers": { "a": true, "h": "Answers", "n": "answers", "r": true, "sh": "the person's answers, keyed by field key", "t": "`$OBJECT`", "key$": "answers", "index$": 0 }, "confirmation": { "a": true, "h": "Confirmation", "n": "confirmation", "r": false, "sh": "the confirmation token from step 1, after the person has approved the summary", "t": "`$STRING`", "key$": "confirmation", "index$": 1 }, "consent": { "a": true, "h": "Consent", "n": "consent", "r": true, "sh": "true only when the person has agreed to: Send my contact details to up to three relevant citizenship services, chosen by Citizenship Descent Checker, who'll contact me directly.", "t": "`$BOOLEAN`", "key$": "consent", "index$": 2 } }, "name": "enquiry", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /mcp/tools/enquiry_describe", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/mcp/tools/enquiry_describe", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mcp" }, { "lit": "tools" }, { "lit": "enquiry_describe" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /mcp/tools/enquiry_fields", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/mcp/tools/enquiry_fields", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mcp" }, { "lit": "tools" }, { "lit": "enquiry_fields" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["answers", "confirmation", "consent"], "co": { "id": "POST /mcp/tools/submit_enquiry", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/mcp/tools/submit_enquiry", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mcp" }, { "lit": "tools" }, { "lit": "submit_enquiry" }], "t": { "req": { "answers": "`reqdata.answer`", "confirmation": "`reqdata.confirmation`", "consent": "`reqdata.consent`" }, "res": "`body`" }, "index$": 2 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "enquiry", "name__orig": "enquiry", "Name": "Enquiry", "name_": "enquiry", "name-": "enquiry", "NAME": "ENQUIRY", "index$": 0 }, { "active": true, "entity": "enquiry", "key$": "BasicEnquiryFlow", "kind": "basic", "name": "BasicEnquiryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "enquiry_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Enquiry', { "POST /mcp/tools/enquiry_describe": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": {}, "index$": 1 } } } }, "parameters": [] }, "POST /mcp/tools/enquiry_fields": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": {}, "index$": 1 } } } }, "parameters": [] }, "POST /mcp/tools/submit_enquiry": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "answers": { "type": "object", "additionalProperties": { "type": ["string", "number", "boolean"] }, "description": "the person's answers, keyed by field key", "key$": "answers" }, "consent": { "type": "boolean", "description": "true only when the person has agreed to: Send my contact details to up to three relevant citizenship services, chosen by Citizenship Descent Checker, who'll contact me directly. I'll be emailed each firm's name as my details go to it, and can stop any more firms getting them.", "key$": "consent" }, "confirmation": { "type": "string", "description": "the confirmation token from step 1, after the person has approved the summary", "key$": "confirmation" } }, "required": ["answers", "consent"], "additionalProperties": false, "index$": 1 } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const enquiry_ref01_ent = client.Enquiry();
        let enquiry_ref01_data = setup.data.new.enquiry['enquiry_ref01'];
        enquiry_ref01_data = (await enquiry_ref01_ent.create(enquiry_ref01_data)).data();
        (0, node_assert_1.default)(null != enquiry_ref01_data);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/enquiry/EnquiryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DescentClaimDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['enquiry01', 'enquiry02', 'enquiry03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DESCENT_CLAIM_DATA_TEST_ENQUIRY_ENTID': idmap,
        'DESCENT_CLAIM_DATA_TEST_LIVE': 'FALSE',
        'DESCENT_CLAIM_DATA_TEST_EXPLAIN': 'FALSE',
        'DESCENT_CLAIM_DATA_APIKEY': '',
    });
    idmap = env['DESCENT_CLAIM_DATA_TEST_ENQUIRY_ENTID'];
    const live = 'TRUE' === env.DESCENT_CLAIM_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DESCENT_CLAIM_DATA_TEST_ENQUIRY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DescentClaimDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.DESCENT_CLAIM_DATA_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.DESCENT_CLAIM_DATA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=EnquiryEntity.test.js.map