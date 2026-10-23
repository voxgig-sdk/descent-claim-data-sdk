<?php
declare(strict_types=1);

// DescentClaimData SDK exists test

require_once __DIR__ . '/../descentclaimdata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = DescentClaimDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
