# Typed models for the DescentClaimData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class EnquiryRequired(TypedDict):
    answers: dict
    consent: bool


class Enquiry(EnquiryRequired, total=False):
    confirmation: str


class EnquiryCreateDataRequired(TypedDict):
    answers: dict
    consent: bool


class EnquiryCreateData(EnquiryCreateDataRequired, total=False):
    confirmation: str


class Guide(TypedDict):
    choice: int
    question: str


class GuideCreateData(TypedDict):
    choice: int
    question: str


class McpRequired(TypedDict):
    jsonrpc: Any
    method: str


class Mcp(McpRequired, total=False):
    id: str
    params: dict


class McpLoadMatchRequired(TypedDict):
    id: str


class McpLoadMatch(McpLoadMatchRequired, total=False):
    jsonrpc: Any
    method: str
    params: dict


class McpCreateDataRequired(TypedDict):
    jsonrpc: Any
    method: str


class McpCreateData(McpCreateDataRequired, total=False):
    id: str
    params: dict
