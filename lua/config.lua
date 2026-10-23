-- DescentClaimData SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "DescentClaimData",
      slug = "descent-claim-data",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://citizenshipdescentchecker.com",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["enquiry"] = {},
        ["guide"] = {},
        ["mcp"] = {},
      },
    },
    entity = {
      ["enquiry"] = {
        ["fields"] = {
          {
            ["name"] = "answers",
            ["title"] = "Answers",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "the person's answers, keyed by field key",
          },
          {
            ["name"] = "confirmation",
            ["title"] = "Confirmation",
            ["type"] = "`$STRING`",
            ["short"] = "the confirmation token from step 1, after the person has approved the summary",
          },
          {
            ["name"] = "consent",
            ["title"] = "Consent",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "true only when the person has agreed to: Send my contact details to up to three relevant citizenship services, chosen by Citizenship Descent Checker, who'll contact me directly.",
          },
        },
        ["name"] = "enquiry",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/mcp/tools/enquiry_describe",
                ["segments"] = {
                  {
                    ["lit"] = "mcp",
                  },
                  {
                    ["lit"] = "tools",
                  },
                  {
                    ["lit"] = "enquiry_describe",
                  },
                },
                ["parts"] = {
                  "mcp",
                  "tools",
                  "enquiry_describe",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/mcp/tools/enquiry_fields",
                ["segments"] = {
                  {
                    ["lit"] = "mcp",
                  },
                  {
                    ["lit"] = "tools",
                  },
                  {
                    ["lit"] = "enquiry_fields",
                  },
                },
                ["parts"] = {
                  "mcp",
                  "tools",
                  "enquiry_fields",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/mcp/tools/submit_enquiry",
                ["segments"] = {
                  {
                    ["lit"] = "mcp",
                  },
                  {
                    ["lit"] = "tools",
                  },
                  {
                    ["lit"] = "submit_enquiry",
                  },
                },
                ["parts"] = {
                  "mcp",
                  "tools",
                  "submit_enquiry",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = {
                    ["answers"] = "`reqdata.answer`",
                    ["confirmation"] = "`reqdata.confirmation`",
                    ["consent"] = "`reqdata.consent`",
                  },
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["guide"] = {
        ["fields"] = {
          {
            ["name"] = "choice",
            ["title"] = "Choice",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
          },
          {
            ["name"] = "question",
            ["title"] = "Question",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
        },
        ["name"] = "guide",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/mcp/tools/checker_answer",
                ["segments"] = {
                  {
                    ["lit"] = "mcp",
                  },
                  {
                    ["lit"] = "tools",
                  },
                  {
                    ["lit"] = "checker_answer",
                  },
                },
                ["parts"] = {
                  "mcp",
                  "tools",
                  "checker_answer",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = {
                    ["choice"] = "`reqdata.choice`",
                    ["question"] = "`reqdata.question`",
                  },
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/mcp/tools/checker_start",
                ["segments"] = {
                  {
                    ["lit"] = "mcp",
                  },
                  {
                    ["lit"] = "tools",
                  },
                  {
                    ["lit"] = "checker_start",
                  },
                },
                ["parts"] = {
                  "mcp",
                  "tools",
                  "checker_start",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/mcp/tools/checker_tree",
                ["segments"] = {
                  {
                    ["lit"] = "mcp",
                  },
                  {
                    ["lit"] = "tools",
                  },
                  {
                    ["lit"] = "checker_tree",
                  },
                },
                ["parts"] = {
                  "mcp",
                  "tools",
                  "checker_tree",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["mcp"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "jsonrpc",
            ["title"] = "Jsonrpc",
            ["type"] = "`$ANY`",
            ["req"] = true,
          },
          {
            ["name"] = "method",
            ["title"] = "Method",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "params",
            ["title"] = "Params",
            ["type"] = "`$OBJECT`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "mcp",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/mcp",
                ["segments"] = {
                  {
                    ["lit"] = "mcp",
                  },
                },
                ["parts"] = {
                  "mcp",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/mcp",
                ["segments"] = {
                  {
                    ["lit"] = "mcp",
                  },
                },
                ["parts"] = {
                  "mcp",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
