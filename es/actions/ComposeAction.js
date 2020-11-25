import { __extends } from "tslib";
import * as ReactRedux from 'react-redux';
import { ComposeAction as BaseComponseAction } from '@redux-model/core';
var ComposeAction = /** @class */ (function (_super) {
    __extends(ComposeAction, _super);
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
}(BaseComponseAction));
export { ComposeAction };
