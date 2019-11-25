cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
    },
    // 跳跃方法 
    setJumpAction() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown));

    },
    onLoad(){
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
    },
    start () {

    },

    // update (dt) {},
});
