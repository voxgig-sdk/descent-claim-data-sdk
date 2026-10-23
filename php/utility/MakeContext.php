<?php
declare(strict_types=1);

// DescentClaimData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DescentClaimDataMakeContext
{
    public static function call(array $ctxmap, ?DescentClaimDataContext $basectx): DescentClaimDataContext
    {
        return new DescentClaimDataContext($ctxmap, $basectx);
    }
}
