-- Typed models for the DescentClaimData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Enquiry
---@field answers table
---@field confirmation? string
---@field consent boolean

---@class EnquiryCreateData
---@field answers table
---@field confirmation? string
---@field consent boolean

---@class Guide
---@field choice number
---@field question string

---@class GuideCreateData
---@field choice number
---@field question string

---@class Mcp
---@field id? string
---@field jsonrpc any
---@field method string
---@field params? table

---@class McpLoadMatch
---@field id string
---@field jsonrpc? any
---@field method? string
---@field params? table

---@class McpCreateData
---@field id? string
---@field jsonrpc any
---@field method string
---@field params? table

local M = {}

return M
