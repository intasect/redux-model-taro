import { BaseModel, HttpServiceBuilderWithMeta } from '@redux-model/core';
import { ComposeAction } from '../actions/ComposeAction';
import { TaroRequestConfig } from '../services/HttpService';
export declare abstract class Model<Data = null> extends BaseModel<Data, TaroRequestConfig> {
    static useLoading(...useLoading: boolean[]): boolean;
    /**
     * @deprecated
     * Taro doesn't support request method `patch`, actually, it's limited by mini-program.
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
     */
    protected patch<Response>(uri: string): HttpServiceBuilderWithMeta<Data, Response, unknown, TaroRequestConfig>;
    /**
     * Use selector to pick minimum collection to against re-render
     * ```typescript
     * const counter = model.useData((state) => {
     *   return state.counter;
     * });
     */
    useData(): Data;
    useData<T>(selector: (data: Data) => T): T;
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
    protected compose<Fn extends (...args: any[]) => Promise<any>>(fn: Fn): Fn & ComposeAction<Data, Fn>;
}
