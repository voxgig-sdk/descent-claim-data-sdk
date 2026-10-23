# DescentClaimData SDK feature factory

from descentclaimdata_sdk.feature.base_feature import DescentClaimDataBaseFeature
from descentclaimdata_sdk.feature.ratelimit_feature import DescentClaimDataRatelimitFeature
from descentclaimdata_sdk.feature.retry_feature import DescentClaimDataRetryFeature
from descentclaimdata_sdk.feature.test_feature import DescentClaimDataTestFeature
from descentclaimdata_sdk.feature.timeout_feature import DescentClaimDataTimeoutFeature


_FEATURES = {
    "base": lambda: DescentClaimDataBaseFeature(),
    "ratelimit": lambda: DescentClaimDataRatelimitFeature(),
    "retry": lambda: DescentClaimDataRetryFeature(),
    "test": lambda: DescentClaimDataTestFeature(),
    "timeout": lambda: DescentClaimDataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
