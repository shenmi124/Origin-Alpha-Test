let MainCraft = {
    meditation: {
        name(){return '冥想'},
        gain(){
            let mul = n(1)
            if(player.workshop.logCabinWorkshop){
                mul = mul.mul(10)
            }
            return [n(1).mul(mul)]
        },
        onClick(){
            gainResource('idea', n(MAIN['craft']['meditation']['gain']()[0]))
        },
        afterClick(){
            player.craft.meditationClick = true
        },
        handoff(){
            handoffCollect('meditation')
        },
        coerciveClick(){return true},
        tooltip(){return '思考现状'+(getResourceUnlocked('citizens') ? '<hr>'+format(getCraftEfficiency('meditation'))+getResourceColorText('idea')+'/s' : '')+getCollectDisplay()},
        unlocked(){return player.stage.explore.gte(3)},
        cooldown(){return n(15)},
    },
    talk: {
        name(){return '交谈'},
        onClick(){
            gainResource('citizens', n(1))
            if(!getCraftCoerciveClick('talk')){
                player.game.collecting = null
            }
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
        gain(){return [n(1)]},
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
            return '花费一些时间采集一些食物'+(getResourceUnlocked('citizens') ? '<hr>'+format(getCraftEfficiency('collectFood'))+getResourceColorText('food')+'/s' : '')+getCollectDisplay()
        },
        unlocked(){return player.stage.explore.gte(1)},
        cooldown(){return n(5)},
    },
    collectWood: {
        name(){return '采集木头'},
        gain(){
            let mul = n(1)
            if(player.workshop.axeWorkshop){
                mul = n(1.5)
            }
            return [n(0.25).mul(mul), n(1).mul(mul)]
        },
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
            return '花费一些时间采集一些木头'+(getResourceUnlocked('citizens') ? '<hr>'+format(getCraftEfficiency('collectWood'))+getResourceColorText('wood')+'/s' : '')+getCollectDisplay()
        },
        unlocked(){return player.stage.explore.gte(2)},
        cooldown(){
            let mul = n(1)
            if(player.workshop.axeWorkshop){
                mul = n(1.5)
            }
            return n(10).div(mul)
        },
    },
    collectStone: {
        name(){return '采集石头'},
        gain(){
            let mul = n(1)
            if(player.workshop.pickaxeWorkshop){
                mul = n(1.5)
            }
            return [n(1).mul(mul), n(3).mul(mul)]
        },
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
            return '花费一些时间采集一些石头'+(getResourceUnlocked('citizens') ? '<hr>'+format(getCraftEfficiency('collectStone'))+getResourceColorText('stone')+'/s' : '')+getCollectDisplay()
        },
        unlocked(){return player.stage.explore.gte(2)},
        cooldown(){
            let mul = n(1)
            if(player.workshop.pickaxeWorkshop){
                mul = n(1.5)
            }
            return n(10).div(mul)
        },
    },
    craftPlank: {
        name(){return '制造木板'},
        cost(){
            let base = n(25)
            return base
        },
        costSecond(){
            let cost = this.cost()
            return cost.div(getCraftCooldown('craftPlank')).mul(efficientValue.action)
        },
        gain(){
            return n(1).mul(getCraftEfficient())
        },
        gainSecond(){
            let gain = this.gain()
            return gain.div(getCraftCooldown('craftPlank')).mul(efficientValue.action)
        },
        canCraft(){
            return player.resource.wood.gte(this.cost())
        },
        onClick(){
            gainResource('wood', n(this.cost()).neg())
            gainResource('plank', n(this.gain()))
            if(!getCraftCoerciveClick('craftPlank')){
                player.game.collecting = null
            }
        },
        afterClick(){
            player.craft.craftPlankClick = true
        },
        handoff(){
            handoffCollect('craftPlank')
        },
        coerciveClick(){return this.canCraft()},
        canClick(){return this.canCraft()},
        tooltip(){
            let gain = '<hr>'+format(this.cost())+getResourceText('wood', true)+' -> '+format(this.gain())+getResourceText('plank', true)
            if(player.craft.craftPlankClick){
                gain += '<br><grey>'+format(this.costSecond())+getResourceText('wood', true)+'/s -> '+format(this.gainSecond())+getResourceText('plank', true)+'/s</grey>'
            }
            return '将木材加工成木板'+gain+getCollectDisplay()
        },
        unlocked(){return player.workshop.processingWorkshop},
        cooldown(){return n(20)},
    },
    craftBrick: {
        name(){return '制造石砖'},
        cost(){
            let base = n(75)
            return base
        },
        costSecond(){
            let cost = this.cost()
            return cost.div(getCraftCooldown('craftBrick')).mul(efficientValue.action)
        },
        gain(){
            return n(1).mul(getCraftEfficient())
        },
        gainSecond(){
            let gain = this.gain()
            return gain.div(getCraftCooldown('craftBrick')).mul(efficientValue.action)
        },
        canCraft(){
            return player.resource.stone.gte(this.cost())
        },
        onClick(){
            gainResource('stone', n(this.cost()).neg())
            gainResource('brick', n(this.gain()))
            if(!getCraftCoerciveClick('craftBrick')){
                player.game.collecting = null
            }
        },
        afterClick(){
            player.craft.craftBrickClick = true
        },
        handoff(){
            handoffCollect('craftBrick')
        },
        coerciveClick(){return this.canCraft()},
        canClick(){return this.canCraft()},
        tooltip(){
            let gain = '<hr>'+format(this.cost())+getResourceText('stone', true)+' -> '+format(this.gain())+getResourceText('brick', true)
            if(player.craft.craftBrickClick){
                gain += '<br><grey>'+format(this.costSecond())+getResourceText('stone', true)+'/s -> '+format(this.gainSecond())+getResourceText('brick', true)+'/s</grey>'
            }
            return '将石材加工成石砖'+gain+getCollectDisplay()
        },
        unlocked(){return player.workshop.processingWorkshop},
        cooldown(){return n(40)},
    },
    craftLeather: {
        name(){return '制造皮革'},
        resource(){
            return ['fur', 'leather']
        },
        cost(){
            let base = n(10)
            return base
        },
        costSecond(){
            let cost = this.cost()
            return cost.div(getCraftCooldown('craftLeather')).mul(efficientValue.action)
        },
        gain(){
            return n(1).mul(getCraftEfficient())
        },
        gainSecond(){
            let gain = this.gain()
            return gain.div(getCraftCooldown('craftLeather')).mul(efficientValue.action)
        },
        canCraft(){
            return player.resource[this.resource()[0]].gte(this.cost())
        },
        onClick(){
            gainResource([this.resource()[0]], n(this.cost()).neg())
            gainResource([this.resource()[1]], n(this.gain()))
            if(!getCraftCoerciveClick('craftLeather')){
                player.game.collecting = null
            }
        },
        afterClick(){
            player.craft.craftLeatherClick = true
        },
        handoff(){
            handoffCollect('craftLeather')
        },
        coerciveClick(){return this.canCraft()},
        canClick(){return this.canCraft()},
        tooltip(){
            let gain = '<hr>'+format(this.cost())+getResourceText([this.resource()[0]], true)+' -> '+format(this.gain())+getResourceText([this.resource()[1]], true)
            if(player.craft.craftLeatherClick){
                gain += '<br><grey>'+format(this.costSecond())+getResourceText([this.resource()[0]], true)+'/s -> '+format(this.gainSecond())+getResourceText([this.resource()[1]], true)+'/s</grey>'
            }
            return '将毛皮加工成皮革'+gain+getCollectDisplay()
        },
        unlocked(){return player.workshop.processingWorkshop},
        cooldown(){return n(30)},
    },
    craftPaper: {
        name(){return '制造纸'},
        resource(){
            return ['leather', 'paper']
        },
        cost(){
            let base = n(5)
            return base
        },
        costSecond(){
            let cost = this.cost()
            return cost.div(getCraftCooldown('craftPaper')).mul(efficientValue.action)
        },
        gain(){
            return n(1).mul(getCraftEfficient())
        },
        gainSecond(){
            let gain = this.gain()
            return gain.div(getCraftCooldown('craftPaper')).mul(efficientValue.action)
        },
        canCraft(){
            return player.resource[this.resource()[0]].gte(this.cost())
        },
        onClick(){
            gainResource([this.resource()[0]], n(this.cost()).neg())
            gainResource([this.resource()[1]], n(this.gain()))
            if(!getCraftCoerciveClick('craftPaper')){
                player.game.collecting = null
            }
        },
        afterClick(){
            player.craft.craftPaperClick = true
        },
        handoff(){
            handoffCollect('craftPaper')
        },
        coerciveClick(){return this.canCraft()},
        canClick(){return this.canCraft()},
        tooltip(){
            let gain = '<hr>'+format(this.cost())+getResourceText([this.resource()[0]], true)+' -> '+format(this.gain())+getResourceText([this.resource()[1]], true)
            if(player.craft.craftPaperClick){
                gain += '<br><grey>'+format(this.costSecond())+getResourceText([this.resource()[0]], true)+'/s -> '+format(this.gainSecond())+getResourceText([this.resource()[1]], true)+'/s</grey>'
            }
            return '将皮革加工成纸'+gain+getCollectDisplay()
        },
        unlocked(){return player.workshop.paperWorkshop},
        cooldown(){return n(80)},
    },
    crafManuscript: {
        name(){return '制造手稿'},
        resource(){
            return [['paper', 'knowledge'], 'manuscript']
        },
        cost(){
            let base = n(5)
            let base2 = n(100)
            return [base, base2]
        },
        costSecond(){
            let cost = this.cost()[0]
            cost = cost.div(getCraftCooldown('crafManuscript')).mul(efficientValue.action)
            let cost2 = this.cost()[1]
            cost2 = cost2.div(getCraftCooldown('crafManuscript')).mul(efficientValue.action)
            return [cost, cost2]
        },
        gain(){
            return n(1).mul(getCraftEfficient())
        },
        gainSecond(){
            let gain = this.gain()
            return gain.div(getCraftCooldown('crafManuscript')).mul(efficientValue.action)
        },
        canCraft(){
            let can = true
            for(let i in this.resource()[0]){
                can = can && player.resource[this.resource()[0][i]].gte(this.cost()[i])
            }
            return can
        },
        onClick(){
            for(let i in this.resource()[0]){
                gainResource([this.resource()[0][i]], n(this.cost()[i]).neg())
            }
            gainResource([this.resource()[1]], n(this.gain()))
            if(!getCraftCoerciveClick('crafManuscript')){
                player.game.collecting = null
            }
        },
        afterClick(){
            player.craft.crafManuscriptClick = true
        },
        handoff(){
            handoffCollect('crafManuscript')
        },
        coerciveClick(){return this.canCraft()},
        canClick(){return this.canCraft()},
        tooltip(){
            let gain = '<hr>'+format(this.cost()[0])+getResourceText([this.resource()[0][0]], true)+'+'+format(this.cost()[1])+getResourceText([this.resource()[0][1]], true)+' -> '+format(this.gain())+getResourceText([this.resource()[1]], true)
            if(player.craft.crafManuscriptClick){
                gain += '<br><grey>('+format(this.costSecond()[0])+getResourceText([this.resource()[0][0]], true)+'+'+format(this.costSecond()[1])+getResourceText([this.resource()[0]], true)+')/s -> '+format(this.gainSecond())+getResourceText([this.resource()[0][1]], true)+'/s</grey>'
            }
            return '将纸和知识加工成手稿'+gain+getCollectDisplay()
        },
        unlocked(){return player.workshop.manuscriptWorkshop},
        cooldown(){return n(100)},
    },
}