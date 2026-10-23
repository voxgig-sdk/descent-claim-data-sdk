# DescentClaimData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DescentClaimDataUtility.registrar = ->(u) {
  u.clean = DescentClaimDataUtilities::Clean
  u.clean_add = DescentClaimDataUtilities::CleanAdd
  u.clean_explain = DescentClaimDataUtilities::CleanExplain
  u.done = DescentClaimDataUtilities::Done
  u.make_error = DescentClaimDataUtilities::MakeError
  u.feature_add = DescentClaimDataUtilities::FeatureAdd
  u.feature_hook = DescentClaimDataUtilities::FeatureHook
  u.feature_init = DescentClaimDataUtilities::FeatureInit
  u.fetcher = DescentClaimDataUtilities::Fetcher
  u.make_fetch_def = DescentClaimDataUtilities::MakeFetchDef
  u.make_context = DescentClaimDataUtilities::MakeContext
  u.make_options = DescentClaimDataUtilities::MakeOptions
  u.make_request = DescentClaimDataUtilities::MakeRequest
  u.make_response = DescentClaimDataUtilities::MakeResponse
  u.make_result = DescentClaimDataUtilities::MakeResult
  u.make_point = DescentClaimDataUtilities::MakePoint
  u.make_spec = DescentClaimDataUtilities::MakeSpec
  u.make_url = DescentClaimDataUtilities::MakeUrl
  u.param = DescentClaimDataUtilities::Param
  u.prepare_auth = DescentClaimDataUtilities::PrepareAuth
  u.prepare_body = DescentClaimDataUtilities::PrepareBody
  u.prepare_headers = DescentClaimDataUtilities::PrepareHeaders
  u.prepare_method = DescentClaimDataUtilities::PrepareMethod
  u.prepare_params = DescentClaimDataUtilities::PrepareParams
  u.prepare_path = DescentClaimDataUtilities::PreparePath
  u.prepare_query = DescentClaimDataUtilities::PrepareQuery
  u.graphql_body = DescentClaimDataUtilities::GraphqlBody
  u.graphql_errors = DescentClaimDataUtilities::GraphqlErrors
  u.result_basic = DescentClaimDataUtilities::ResultBasic
  u.result_body = DescentClaimDataUtilities::ResultBody
  u.result_headers = DescentClaimDataUtilities::ResultHeaders
  u.transform_request = DescentClaimDataUtilities::TransformRequest
  u.transform_response = DescentClaimDataUtilities::TransformResponse
}
