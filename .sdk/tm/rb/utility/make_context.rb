# DescentClaimData SDK utility: make_context
require_relative '../core/context'
module DescentClaimDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    DescentClaimDataContext.new(ctxmap, basectx)
  }
end
