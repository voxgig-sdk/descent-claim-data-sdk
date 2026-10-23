# Enquiry entity test

require "minitest/autorun"
require "json"
require_relative "../DescentClaimData_sdk"
require_relative "runner"

class EnquiryEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = DescentClaimDataSDK.test(nil, nil)
    ent = testsdk.Enquiry(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = DescentClaimDataConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = DescentClaimDataSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Enquiry(nil).create({ "answers" => "x", "confirmation" => 1, "consent" => true }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = enquiry_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "enquiry." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    enquiry_ref01_ent = client.Enquiry(nil)
    enquiry_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.enquiry"), "enquiry_ref01"))

    enquiry_ref01_data_result = enquiry_ref01_ent.create(enquiry_ref01_data, nil)
    enquiry_ref01_data = Helpers.to_map(enquiry_ref01_data_result.respond_to?(:data_get) ? enquiry_ref01_data_result.data_get : enquiry_ref01_data_result)
    assert !enquiry_ref01_data.nil?

  end
end

def enquiry_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "enquiry", "EnquiryTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = DescentClaimDataSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["enquiry01", "enquiry02", "enquiry03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["DESCENT_CLAIM_DATA_TEST_ENQUIRY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "DESCENT_CLAIM_DATA_TEST_ENQUIRY_ENTID" => idmap,
    "DESCENT_CLAIM_DATA_TEST_LIVE" => "FALSE",
    "DESCENT_CLAIM_DATA_TEST_EXPLAIN" => "FALSE",
    "DESCENT_CLAIM_DATA_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["DESCENT_CLAIM_DATA_TEST_ENQUIRY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["DESCENT_CLAIM_DATA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["DESCENT_CLAIM_DATA_APIKEY"],
      },
      extra || {},
    ])
    client = DescentClaimDataSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["DESCENT_CLAIM_DATA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["DESCENT_CLAIM_DATA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
