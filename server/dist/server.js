"use strict";

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express.default)();
server.listen(_config.default.serverPort, function () {
  console.log("Listen port ".concat(_config.default.serverPort));
});