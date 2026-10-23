# DescentClaimData SDK utility: prepare_body
require_relative 'media'
module DescentClaimDataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return DescentClaimDataUtilities.raw_body(ctx.reqdata) if DescentClaimDataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
