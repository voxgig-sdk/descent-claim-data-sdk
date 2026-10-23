# DescentClaimData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DescentClaimDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      DescentClaimDataBaseFeature.new
    when "ratelimit"
      DescentClaimDataRatelimitFeature.new
    when "retry"
      DescentClaimDataRetryFeature.new
    when "test"
      DescentClaimDataTestFeature.new
    when "timeout"
      DescentClaimDataTimeoutFeature.new
    else
      DescentClaimDataBaseFeature.new
    end
  end
end
