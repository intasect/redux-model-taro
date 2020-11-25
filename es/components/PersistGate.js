import { __extends } from "tslib";
import { PureComponent } from 'react';
import { storeHelper, isCrushed } from '@redux-model/core';
var PersistGate = /** @class */ (function (_super) {
    __extends(PersistGate, _super);
    function PersistGate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isReady: storeHelper.persist.isReady(),
        };
        return _this;
    }
    PersistGate.prototype.componentDidMount = function () {
        var _this = this;
        var isReady = this.state.isReady;
        if (!isReady) {
            this.unlisten = storeHelper.persist.listen(function () {
                _this.setState({
                    isReady: true,
                });
            });
        }
    };
    PersistGate.prototype.componentWillUnmount = function () {
        this.unlisten && this.unlisten();
    };
    PersistGate.prototype.render = function () {
        var _a = this.props, children = _a.children, loading = _a.loading;
        var isReady = this.state.isReady;
        if (!isCrushed() && loading && typeof children === 'function') {
            console.error('ReduxModel: PersistGate expects either a function child or loading prop. The loading prop will be ignored.');
        }
        if (typeof children === 'function') {
            return children(isReady);
        }
        return isReady ? children : loading;
    };
    PersistGate.defaultProps = {
        loading: null,
    };
    return PersistGate;
}(PureComponent));
export { PersistGate };
