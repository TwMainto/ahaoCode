cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        //maxMoveSpeed: 0,
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

    // 添加键盘触发事件
    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:     
                this.accRight = true;
                break;
        }
    },
    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },
    onLoad(){
        // onLoad总开启跳跃
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        // 加速方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;

        //初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);

        
    },
    // 在销毁节点或场景时取消键盘输入监听
    onDestroy(){
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },
    update(dt){
        // 根据当前加速度方向每帧更新
        if(this.accLeft){
            this.xSpeed -= this.accel * dt;
        }else if(this.accRight){
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        // if(Math.abs(this.xSpeed) > this.maxMoveSpeed){
        //     this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        // }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
    },


    start () {

    },

});
