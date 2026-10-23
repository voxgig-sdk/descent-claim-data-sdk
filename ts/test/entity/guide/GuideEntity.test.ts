

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


describe('GuideEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DESCENT_CLAIM_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('DESCENT_CLAIM_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DescentClaimDataSDK.test()
    const ent = testsdk.Guide()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DescentClaimDataSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Guide().create({"choice":"x","question":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DESCENT_CLAIM_DATA_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'guide.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"choice":{"a":true,"h":"Choice","n":"choice","r":true,"t":"`$INTEGER`","key$":"choice","index$":0},"question":{"a":true,"h":"Question","n":"question","r":true,"t":"`$STRING`","key$":"question","index$":1}},"name":"guide","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["choice","question"],"co":{"id":"POST /mcp/tools/checker_answer","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mcp/tools/checker_answer","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"},{"lit":"tools"},{"lit":"checker_answer"}],"t":{"req":{"choice":"`reqdata.choice`","question":"`reqdata.question`"},"res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /mcp/tools/checker_start","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mcp/tools/checker_start","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"},{"lit":"tools"},{"lit":"checker_start"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /mcp/tools/checker_tree","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mcp/tools/checker_tree","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"},{"lit":"tools"},{"lit":"checker_tree"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"guide","name__orig":"guide","Name":"Guide","name_":"guide","name-":"guide","NAME":"GUIDE","index$":1}, {"active":true,"entity":"guide","key$":"BasicGuideFlow","kind":"basic","name":"BasicGuideFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"guide_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Guide', {"POST /mcp/tools/checker_answer":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"question":{"type":"string","minLength":1,"key$":"question"},"choice":{"type":"integer","minimum":0,"key$":"choice"}},"required":["question","choice"],"additionalProperties":false,"index$":1}}}},"parameters":[]},"POST /mcp/tools/checker_start":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"index$":1}}}},"parameters":[]},"POST /mcp/tools/checker_tree":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const guide_ref01_ent = client.Guide()
    let guide_ref01_data = setup.data.new.guide['guide_ref01']

    guide_ref01_data = (await guide_ref01_ent.create(guide_ref01_data)).data()
    assert(null != guide_ref01_data)


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
      '../../../../.sdk/test/entity/guide/GuideTestData.json')

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
    ['guide01','guide02','guide03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DESCENT_CLAIM_DATA_TEST_GUIDE_ENTID': idmap,
    'DESCENT_CLAIM_DATA_TEST_LIVE': 'FALSE',
    'DESCENT_CLAIM_DATA_TEST_EXPLAIN': 'FALSE',
    'DESCENT_CLAIM_DATA_APIKEY': '',
  })

  idmap = env['DESCENT_CLAIM_DATA_TEST_GUIDE_ENTID']

  const live = 'TRUE' === env.DESCENT_CLAIM_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DESCENT_CLAIM_DATA_TEST_GUIDE_ENTID']
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
  
