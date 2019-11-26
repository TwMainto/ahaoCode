cc.Class({
    extends: cc.Component,

    properties: {
        // 星星和主角之间的距离小于这个数值是， 就会完成收集
        pickRadius: 0,
    },

    getPlayerDistance(){
        // 更具 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        var dist = this.node.position.sub(playerPos).mag();
        console.log(" 两个相距的距离 ... ",dist);
        return dist;
    },

    onPicked(){
        this.game.spawnNewStar();
        this.node.destroy();
    },

    update(dt){
        if(this.getPlayerDistance() < this.pickRadius){
            this.onPicked();
            return;
        }
    },
    start () {

    },


});
