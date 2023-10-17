/*
 * @Author: 王欣磊
 * @Date: 2021-02-02 11:12:26
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-03-29 15:53:50
 * @Description:
 * @FilePath: /ship-face/src/utils/EventBus.js
 */
class EventBus {
    constructor () {
        this.listeners = {}
    }
    /**
     * 缓存事件监听
     * @param {String} type 事件类型
     * @param {Function} cb 回调函数
     */
    on (type, cb) {
        if (!this.listeners[type]) {
            this.listeners[type] = []
        }
        this.listeners[type].push(cb)
    }

    /**
     * @param {String} type 事件类型
     * @param  {...params} args 参数列表，传回给callback
     */
    emit (type, ...args) {
        if (this.listeners[type] && this.listeners[type].length > 0) {
            const types = this.listeners[type]
            // eslint-disable-next-line standard/no-callback-literal
            types.forEach(cb => cb(...args))
        }
    }

    /**
     * 移除事件监听
     * 传两个参 移除该事件类型的 回调函数
     * 传一个类型 移除该类型下的所有回调函数列表
     * @param {*} type
     * @param {*} cb
     */
    off (type, cb) {
        if (this.listeners[type]) {
            const curIndex = this.listeners[type].findIndex(it => it === cb)
            if (curIndex >= 0) {
                this.listeners[type].splice(curIndex, 1)
            }
            // 只传type时，移除该事件的所有监听者
            if (this.listeners[type].length > 0) {
                delete this.listeners[type]
            }
        }
    }
}
export default EventBus
