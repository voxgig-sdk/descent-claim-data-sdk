# DescentClaimData SDK utility: make_context

from projectname_sdk.core.context import DescentClaimDataContext


def make_context_util(ctxmap, basectx):
    return DescentClaimDataContext(ctxmap, basectx)
