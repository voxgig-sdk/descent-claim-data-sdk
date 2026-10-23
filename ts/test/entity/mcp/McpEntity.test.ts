

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


describe('McpEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DESCENT_CLAIM_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('DESCENT_CLAIM_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DescentClaimDataSDK.test()
    const ent = testsdk.Mcp()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DescentClaimDataSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Mcp().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DESCENT_CLAIM_DATA_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mcp.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"jsonrpc":{"a":true,"h":"Jsonrpc","n":"jsonrpc","r":true,"t":"`$ANY`","key$":"jsonrpc","index$":1},"method":{"a":true,"h":"Method","n":"method","r":true,"t":"`$STRING`","key$":"method","index$":2},"params":{"a":true,"h":"Params","n":"params","r":false,"t":"`$OBJECT`","key$":"params","index$":3}},"id":{"field":"id","name":"id"},"name":"mcp","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["id","jsonrpc","method","params"],"co":{"id":"POST /mcp","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mcp","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /mcp","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/mcp","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"mcp","name__orig":"mcp","Name":"Mcp","name_":"mcp","name-":"mcp","NAME":"MCP","index$":2}, {"active":true,"entity":"mcp","key$":"BasicMcpFlow","kind":"basic","name":"BasicMcpFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"mcp_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"mcp_ref01","srcdatavar":"mcp_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mcp_ref01"}}],"index$":1}]}, 'Mcp', {"POST /mcp":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["jsonrpc","method"],"properties":{"jsonrpc":{"const":"2.0","key$":"jsonrpc"},"id":{"key$":"id"},"method":{"type":"string","key$":"method"},"params":{"type":"object","key$":"params"}},"index$":1}}}},"parameters":[]},"GET /mcp":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const mcp_ref01_ent = client.Mcp()
    let mcp_ref01_data = setup.data.new.mcp['mcp_ref01']

    mcp_ref01_data = (await mcp_ref01_ent.create(mcp_ref01_data)).data()
    assert(null != mcp_ref01_data.id)


    // LOAD
    const mcp_ref01_match_dt0: any = {}
    mcp_ref01_match_dt0.id = mcp_ref01_data.id
    const mcp_ref01_data_dt0 = (await mcp_ref01_ent.load(mcp_ref01_match_dt0)).data()
    assert(mcp_ref01_data_dt0.id === mcp_ref01_data.id)


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
      '../../../../.sdk/test/entity/mcp/McpTestData.json')

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
    ['mcp01','mcp02','mcp03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DESCENT_CLAIM_DATA_TEST_MCP_ENTID': idmap,
    'DESCENT_CLAIM_DATA_TEST_LIVE': 'FALSE',
    'DESCENT_CLAIM_DATA_TEST_EXPLAIN': 'FALSE',
    'DESCENT_CLAIM_DATA_APIKEY': '',
  })

  idmap = env['DESCENT_CLAIM_DATA_TEST_MCP_ENTID']

  const live = 'TRUE' === env.DESCENT_CLAIM_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DESCENT_CLAIM_DATA_TEST_MCP_ENTID']
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
  
