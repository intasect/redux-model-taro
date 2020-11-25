"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposeAction = void 0;
var tslib_1 = require("tslib");
var ReactRedux = tslib_1.__importStar(require("react-redux"));
var core_1 = require("@redux-model/core");
var ComposeAction = /** @class */ (function (_super) {
    tslib_1.__extends(ComposeAction, _super);
    function ComposeAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComposeAction.prototype.useMeta = function (key) {
        var _this = this;
        return ReactRedux.useSelector(function () {
            return key ? _this.meta[key] : _this.meta;
        });
    };
    ComposeAction.prototype.useLoading = function () {
        return this.useMeta('loading');
    };
    /**
     * @override
     */
    ComposeAction.prototype.methods = function () {
        return _super.prototype.methods.call(this).concat('useMeta', 'useLoading');
    };
    return ComposeAction;
}(core_1.ComposeAction));
exports.ComposeAction = ComposeAction;
