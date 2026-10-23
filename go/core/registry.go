package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewEnquiryEntityFunc func(client *DescentClaimDataSDK, entopts map[string]any) DescentClaimDataEntity

var NewGuideEntityFunc func(client *DescentClaimDataSDK, entopts map[string]any) DescentClaimDataEntity

var NewMcpEntityFunc func(client *DescentClaimDataSDK, entopts map[string]any) DescentClaimDataEntity

