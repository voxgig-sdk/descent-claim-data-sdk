-- Guide entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("descent-claim-data_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("GuideEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Guide(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Guide(nil):create({ ["choice"] = "x", ["question"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = guide_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "guide." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    local client = setup.client

    -- CREATE
    local guide_ref01_ent = client:Guide(nil)
    local guide_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.guide"), "guide_ref01"))

    local guide_ref01_data_result, err = guide_ref01_ent:create(guide_ref01_data, nil)
    assert.is_nil(err)
    guide_ref01_data = helpers.to_map(type(guide_ref01_data_result) == 'table' and guide_ref01_data_result.data_get and guide_ref01_data_result:data_get() or guide_ref01_data_result)
    assert.is_not_nil(guide_ref01_data)

  end)
end)

function guide_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/guide/GuideTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read guide test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "guide01", "guide02", "guide03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("DESCENT_CLAIM_DATA_TEST_GUIDE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["DESCENT_CLAIM_DATA_TEST_GUIDE_ENTID"] = idmap,
    ["DESCENT_CLAIM_DATA_TEST_LIVE"] = "FALSE",
    ["DESCENT_CLAIM_DATA_TEST_EXPLAIN"] = "FALSE",
    ["DESCENT_CLAIM_DATA_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["DESCENT_CLAIM_DATA_TEST_GUIDE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["DESCENT_CLAIM_DATA_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["DESCENT_CLAIM_DATA_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["DESCENT_CLAIM_DATA_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["DESCENT_CLAIM_DATA_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
