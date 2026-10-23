# DescentClaimData SDK exists test

import pytest
from descentclaimdata_sdk import DescentClaimDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DescentClaimDataSDK.test(None, None)
        assert testsdk is not None
