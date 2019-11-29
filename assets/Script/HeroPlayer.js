// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 掉落速度
        maxMoveSpeed: 0
    },
    // 上升
    setJumpUpAction () {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight));
        return jumpUp
    },
    // 降落
    setJumpDownAction () {
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, - this.jumpHeight));
        return jumpDown
    },
    // 跳跃
    setJumpRunAction () {
        this.jumpUp = this.setJumpUpAction()
        this.jumpDown = this.setJumpDownAction()
        // 完整动作 顺序执行
        var seq = cc.sequence(this.jumpUp, this.jumpDown);
        // 执行并返回该执行的动作
        this.node.runAction(seq)
    },
    // 玩家不操作时，角色进行掉落动作
    heroDownMove () {
        var heroDown = cc.moveBy(0.8, cc.v2(0, - 5))
        return heroDown
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setJumpRunAction()
    },

    start () {
    },

    update (dt) {
        this.node.runAction(this.heroDownMove())
    },
});
