cc.Class({
    extends: cc.Component,

    properties: {
        // 引用星星预支节点
        starPrefab: cc.Prefab,
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点， 用于确定星星的高度
        ground: cc.Node,
        // player 节点， 用于获取主角弹跳的高度， 和控制主角行动开关
        player: cc.Node,
    },
    onLoad(){
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        // 生成一个星星
        this.spawnNewStar();
    },

    spawnNewStar(){
        // 使用给定的模板在场景中生成一个新的节点
        let newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上缓存 Game 对象的引用
        newStar.getComponent('Star').game = this;
    },

    getNewStarPosition(){
        let randX = 0;
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX,randY);
    },


    start () {

    },

});
