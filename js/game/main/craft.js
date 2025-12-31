let MainCraft = {
    meditation: {
        name(){return '冥想'},
        gain(){return [n(1)]},
        onClick(){
            gainResource('idea', n(MAIN['craft']['collectFood']['gain']()[0]))
        },
        afterClick(){
            player.craft.meditationClick = true
        },
        handoff(){
            handoffCollect('meditation')
        },
        coerciveClick(){return true},
        tooltip(){return '思考现状'+(getResourceUnlocked('citizens') ? '<hr><left>平均产率: '+format(getCraftEfficiency('meditation'))+'/s '+getResourceColorText('idea')+'</left>' : '')+getCollectDisplay()},
        unlocked(){return player.stage.explore.gte(3)},
        cooldown(){return n(15)},
    },
    talk: {
        name(){return '交谈'},
        onClick(){
            gainResource('citizens', n(1))
        },
        afterClick(){
            player.craft.talkClick = true
        },
        handoff(){
            handoffCollect('talk')
        },
        coerciveClick(){return n(getResourceCapped('citizens')).sub(player.resource.citizens).gte(1)},
        canClick(){return n(getResourceCapped('citizens')).sub(player.resource.citizens).gte(1)},
        tooltip(){return '提供住所和食物,尝试让这的原住民追随你'+getCollectDisplay()},
        unlocked(){return player.stage.explore.gte(4)},
        cooldown(){return n(30)},
    },
    collectFood: {
        name(){return '采集食物'},
        gain(){return [n(5)]},
        onClick(){
            gainResource('food', n(MAIN['craft']['collectFood']['gain']()[0]))
        },
        afterClick(){
            player.craft.collectFoodClick = true
        },
        handoff(){
            handoffCollect('collectFood')
        },
        coerciveClick(){return true},
        tooltip(){
            return '花费一些时间采集一些食物'+(getResourceUnlocked('citizens') ? '<hr><left>平均产率: '+format(getCraftEfficiency('collectFood'))+'/s '+getResourceColorText('food')+'</left>' : '')+getCollectDisplay()
        },
        unlocked(){return player.stage.explore.gte(1)},
        cooldown(){return n(5)},
    },
    collectWood: {
        name(){return '采集木头'},
        gain(){return [n(0.25), n(1)]},
        onClick(){
            gainResource('wood', n(Math.random()).mul(MAIN['craft']['collectWood']['gain']()[1]))
        },
        afterClick(){
            player.craft.collectWoodClick = true
        },
        handoff(){
            handoffCollect('collectWood')
        },
        coerciveClick(){return true},
        tooltip(){
            return '花费一些时间采集一些木头'+(getResourceUnlocked('citizens') ? '<hr><left>平均产率: '+format(getCraftEfficiency('collectWood'))+'/s '+getResourceColorText('wood')+'</left>' : '')+getCollectDisplay()
        },
        unlocked(){return player.stage.explore.gte(2)},
        cooldown(){return n(10)},
    },
    collectStone: {
        name(){return '采集石头'},
        gain(){return [n(1), n(3)]},
        onClick(){
            gainResource('stone', n(MAIN['craft']['collectStone']['gain']()[0]).add(n(Math.random()).mul(MAIN['craft']['collectStone']['gain']()[1])))
        },
        afterClick(){
            player.craft.collectStoneClick = true
        },
        handoff(){
            handoffCollect('collectStone')
        },
        coerciveClick(){return true},
        tooltip(){
            return '花费一些时间采集一些石头'+(getResourceUnlocked('citizens') ? '<hr><left>平均产率: '+format(getCraftEfficiency('collectStone'))+'/s '+getResourceColorText('stone')+'</left>' : '')+getCollectDisplay()
        },
        unlocked(){return player.stage.explore.gte(2)},
        cooldown(){return n(10)},
    },
}