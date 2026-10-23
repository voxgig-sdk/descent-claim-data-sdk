<?php
declare(strict_types=1);

// Typed models for the DescentClaimData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Enquiry entity data model. */
class Enquiry
{
    public array $answers;
    public ?string $confirmation = null;
    public bool $consent;
}

/** Request payload for Enquiry#create. */
class EnquiryCreateData
{
    public array $answers;
    public ?string $confirmation = null;
    public bool $consent;
}

/** Guide entity data model. */
class Guide
{
    public int $choice;
    public string $question;
}

/** Request payload for Guide#create. */
class GuideCreateData
{
    public int $choice;
    public string $question;
}

/** Mcp entity data model. */
class Mcp
{
    public ?string $id = null;
    public mixed $jsonrpc;
    public string $method;
    public ?array $params = null;
}

/** Request payload for Mcp#load. */
class McpLoadMatch
{
    public string $id;
    public mixed $jsonrpc = null;
    public ?string $method = null;
    public ?array $params = null;
}

/** Request payload for Mcp#create. */
class McpCreateData
{
    public ?string $id = null;
    public mixed $jsonrpc;
    public string $method;
    public ?array $params = null;
}

