import { __extends } from "tslib";
import * as ReactRedux from 'react-redux';
import { BaseModel } from '@redux-model/core';
import { ComposeAction } from '../actions/ComposeAction';
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Hooks can't be used in condition statement like: x.useLoading() || y.useLoading()
    // So we provide a quick way to combine all loading values.
    Model.useLoading = function () {
        var useLoading = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            useLoading[_i] = arguments[_i];
        }
        return useLoading.some(function (is) { return is; });
    };
    /**
     * @deprecated
     * Taro doesn't support request method `patch`, actually, it's limited by mini-program.
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
     */
    Model.prototype.patch = function (uri) {
        return _super.prototype.patch.call(this, uri);
    };
    Model.prototype.useData = function (selector) {
        var _this = this;
        return ReactRedux.useSelector(function () {
            return selector ? selector(_this.data) : _this.data;
        }, ReactRedux.shallowEqual);
    };
    /**
     * The action which compose aysnchorize program and hold loading.
     * ```
     * class TestModel extends Model {
     *   updateRoom = this.compose(async (id: number) => {
     *     const roomId = await getRoomId(id);
     *     const userId = await getUserId(roomId);
     *
     *     this.changeState((state) => {
     *       state.push([userId, roomId]);
     *     });
     *   });
     * }
     *
     * const testModel = new TestModel();
     *
     * -------------
     *
     * // Hold loading
     * const loading = testModel.updateRoom.useLoading();
     * // Dispatch action
     * const promise = testModel.updateRoom(10);
     * ```
     */
    Model.prototype.compose = function (fn) {
        var action = new ComposeAction(this, fn);
        return action;
    };
    return Model;
}(BaseModel));
export { Model };
