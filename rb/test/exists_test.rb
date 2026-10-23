# DescentClaimData SDK exists test

require "minitest/autorun"
require_relative "../DescentClaimData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DescentClaimDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
