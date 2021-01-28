"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPersonalInfo = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getPersonalInfo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", res.json({
              message: "My Rule-Validation API",
              status: "success",
              data: {
                name: "Ezeani Ikenna",
                github: "@iykeevans",
                email: "elochi238@gmail.com",
                mobile: "07053052215",
                twitter: "@iykeevan"
              }
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPersonalInfo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getPersonalInfo = getPersonalInfo;
//# sourceMappingURL=index.js.map