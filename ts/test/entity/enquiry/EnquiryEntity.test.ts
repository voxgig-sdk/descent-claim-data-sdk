

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DescentClaimDataSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('EnquiryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DESCENT_CLAIM_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('DESCENT_CLAIM_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DescentClaimDataSDK.test()
    const ent = testsdk.Enquiry()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DescentClaimDataSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Enquiry().create({"answers":"x","confirmation":1,"consent":true} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DESCENT_CLAIM_DATA_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'enquiry.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"answers":{"a":true,"h":"Answers","n":"answers","r":true,"sh":"the person's answers, keyed by field key","t":"`$OBJECT`","key$":"answers","index$":0},"confirmation":{"a":true,"h":"Confirmation","n":"confirmation","r":false,"sh":"the confirmation token from step 1, after the person has approved the summary","t":"`$STRING`","key$":"confirmation","index$":1},"consent":{"a":true,"h":"Consent","n":"consent","r":true,"sh":"true only when the person has agreed to: Send my contact details to up to three relevant citizenship services, chosen by Citizenship Descent Checker, who'll contact me directly.","t":"`$BOOLEAN`","key$":"consent","index$":2}},"name":"enquiry","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /mcp/tools/enquiry_describe","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mcp/tools/enquiry_describe","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"},{"lit":"tools"},{"lit":"enquiry_describe"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /mcp/tools/enquiry_fields","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mcp/tools/enquiry_fields","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"},{"lit":"tools"},{"lit":"enquiry_fields"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["answers","confirmation","consent"],"co":{"id":"POST /mcp/tools/submit_enquiry","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mcp/tools/submit_enquiry","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"},{"lit":"tools"},{"lit":"submit_enquiry"}],"t":{"req":{"answers":"`reqdata.answer`","confirmation":"`reqdata.confirmation`","consent":"`reqdata.consent`"},"res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"enquiry","name__orig":"enquiry","Name":"Enquiry","name_":"enquiry","name-":"enquiry","NAME":"ENQUIRY","index$":0}, {"active":true,"entity":"enquiry","key$":"BasicEnquiryFlow","kind":"basic","name":"BasicEnquiryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"enquiry_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Enquiry', {"POST /mcp/tools/enquiry_describe":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"index$":1}}}},"parameters":[]},"POST /mcp/tools/enquiry_fields":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"index$":1}}}},"parameters":[]},"POST /mcp/tools/submit_enquiry":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"answers":{"type":"object","additionalProperties":{"type":["string","number","boolean"]},"description":"the person's answers, keyed by field key","key$":"answers"},"consent":{"type":"boolean","description":"true only when the person has agreed to: Send my contact details to up to three relevant citizenship services, chosen by Citizenship Descent Checker, who'll contact me directly. I'll be emailed each firm's name as my details go to it, and can stop any more firms getting them.","key$":"consent"},"confirmation":{"type":"string","description":"the confirmation token from step 1, after the person has approved the summary","key$":"confirmation"}},"required":["answers","consent"],"additionalProperties":false,"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const enquiry_ref01_ent = client.Enquiry()
    let enquiry_ref01_data = setup.data.new.enquiry['enquiry_ref01']

    enquiry_ref01_data = (await enquiry_ref01_ent.create(enquiry_ref01_data)).data()
    assert(null != enquiry_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/enquiry/EnquiryTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DescentClaimDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['enquiry01','enquiry02','enquiry03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DESCENT_CLAIM_DATA_TEST_ENQUIRY_ENTID': idmap,
    'DESCENT_CLAIM_DATA_TEST_LIVE': 'FALSE',
    'DESCENT_CLAIM_DATA_TEST_EXPLAIN': 'FALSE',
    'DESCENT_CLAIM_DATA_APIKEY': '',
  })

  idmap = env['DESCENT_CLAIM_DATA_TEST_ENQUIRY_ENTID']

  const live = 'TRUE' === env.DESCENT_CLAIM_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DESCENT_CLAIM_DATA_TEST_ENQUIRY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DescentClaimDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
