"use strict";

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.all("/", _controllers.getPersonalInfo);
module.exports = router;
//# sourceMappingURL=index.js.map