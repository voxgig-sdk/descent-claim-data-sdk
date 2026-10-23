<?php
declare(strict_types=1);

// DescentClaimData SDK base feature

class DescentClaimDataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DescentClaimDataContext $ctx, array $options): void {}
    public function PostConstruct(DescentClaimDataContext $ctx): void {}
    public function PostConstructEntity(DescentClaimDataContext $ctx): void {}
    public function SetData(DescentClaimDataContext $ctx): void {}
    public function GetData(DescentClaimDataContext $ctx): void {}
    public function GetMatch(DescentClaimDataContext $ctx): void {}
    public function SetMatch(DescentClaimDataContext $ctx): void {}
    public function PrePoint(DescentClaimDataContext $ctx): void {}
    public function PreSpec(DescentClaimDataContext $ctx): void {}
    public function PreRequest(DescentClaimDataContext $ctx): void {}
    public function PreResponse(DescentClaimDataContext $ctx): void {}
    public function PreResult(DescentClaimDataContext $ctx): void {}
    public function PreDone(DescentClaimDataContext $ctx): void {}
    public function PreUnexpected(DescentClaimDataContext $ctx): void {}
}
