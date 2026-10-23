# frozen_string_literal: true

# Typed models for the DescentClaimData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Enquiry entity data model.
#
# @!attribute [rw] answers
#   @return [Hash]
#
# @!attribute [rw] confirmation
#   @return [String, nil]
#
# @!attribute [rw] consent
#   @return [Boolean]
Enquiry = Struct.new(
  :answers,
  :confirmation,
  :consent,
  keyword_init: true
)

# Request payload for Enquiry#create.
#
# @!attribute [rw] answers
#   @return [Hash]
#
# @!attribute [rw] confirmation
#   @return [String, nil]
#
# @!attribute [rw] consent
#   @return [Boolean]
EnquiryCreateData = Struct.new(
  :answers,
  :confirmation,
  :consent,
  keyword_init: true
)

# Guide entity data model.
#
# @!attribute [rw] choice
#   @return [Integer]
#
# @!attribute [rw] question
#   @return [String]
Guide = Struct.new(
  :choice,
  :question,
  keyword_init: true
)

# Request payload for Guide#create.
#
# @!attribute [rw] choice
#   @return [Integer]
#
# @!attribute [rw] question
#   @return [String]
GuideCreateData = Struct.new(
  :choice,
  :question,
  keyword_init: true
)

# Mcp entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] jsonrpc
#   @return [Object]
#
# @!attribute [rw] method
#   @return [String]
#
# @!attribute [rw] params
#   @return [Hash, nil]
Mcp = Struct.new(
  :id,
  :jsonrpc,
  :method,
  :params,
  keyword_init: true
)

# Request payload for Mcp#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] jsonrpc
#   @return [Object, nil]
#
# @!attribute [rw] method
#   @return [String, nil]
#
# @!attribute [rw] params
#   @return [Hash, nil]
McpLoadMatch = Struct.new(
  :id,
  :jsonrpc,
  :method,
  :params,
  keyword_init: true
)

# Request payload for Mcp#create.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] jsonrpc
#   @return [Object]
#
# @!attribute [rw] method
#   @return [String]
#
# @!attribute [rw] params
#   @return [Hash, nil]
McpCreateData = Struct.new(
  :id,
  :jsonrpc,
  :method,
  :params,
  keyword_init: true
)

