"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

require("@babel/polyfill");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// invoke express
var app = (0, _express["default"])(); // Parse incoming requests data (https://github.com/expressjs/body-parser)

app.use(_bodyParser["default"].json()); // secure with helmet middleware

app.use((0, _helmet["default"])()); // Set up CORS

app.use((0, _cors["default"])()); // log requests to console

app.use((0, _morgan["default"])("dev"));
app.use(_routes["default"]);
module.exports = app;
//# sourceMappingURL=app.js.map