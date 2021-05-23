/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  MessageRequest: {
    fields: {
      name: {
        type: "string",
        id: 1
      },
      msg: {
        type: "string",
        id: 2
      },
      code: {
        type: "int64",
        id: 3
      }
    }
  },
  MessageResponse: {
    fields: {
      name: {
        type: "string",
        id: 1
      },
      msg: {
        type: "string",
        id: 2
      },
      code: {
        type: "int64",
        id: 3
      },
      time: {
        type: "string",
        id: 4
      }
    }
  }
});

module.exports = $root;
