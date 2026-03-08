function gameDiff(){
	player.game.time = player.game.time.add(n(1).mul(DIFF))
    getGametime()

    /*if(player.resource.food.lte(0) && player.resource.citizens.gte(1)){
        let leave = n(Math.random() * 10000).round()
        if(leave.lte(n(1).mul(player.resource.citizens))){
            player.resource.citizens = player.resource.citizens.sub(1)
            CitizensFix()
            GameCraftFix()
            addLog('一位居民因为饥饿离开了你','#888')
        }
    }*/
}

function calcGame(){
    loader(['stage','wakeUp'], false)
    loader(['stage','explore'], n(0))

    loader(['game','time'], n(0))
    
    loader(['game','collecting'], null)
}

function gameLoader(){
	getStage()
	if(!player.stage.wakeUp){
		addLog('这是一个新的存档,要<u style="cursor: pointer; color: #000" onclick="importSave()">导入</u>吗?','#888')
		addLog('点击<u style="cursor: pointer; color: #000" onclick="player.setting.darkTheme = !player.setting.darkTheme; loadSetting()">此处</u>切换深色模式','#888')
		addLog('此版本为测试版,请自行备份存档','#888')
	}
}

function getWorkshopUnlocked(){
    return [
        '',
        '磨制工具 <red>注:由于内容不完整,后续内容暂未平衡</red>',
        '长矛',
        '地图',
        '复合弓',
        '手稿',
        '占位符 已达残局',
    ]
}

function useHunting(){
    function getPower(){
        let base = player.resource.power
        let power = base.pow(1.1).max(1)
        return power
    }
    function getProbability(maxProb, steepness, adj){
        let probability = maxProb * (1 - Math.exp(-steepness * Number(getPower()) / adj))
        let roll = Math.random()
        return probability >= roll
    }
    function getGain(adj){
        let roll = Math.random()
        return n(getPower()).div(adj).mul(roll)
    }

    let type = [
        ['food', getProbability(1, 0.05, 1), getGain(5), true],
        ['fur', getProbability(1, 0.01, 5), getGain(50), true],
        ['ivory', getProbability(0.01, 0.01, 500), n(1), player.resource.power.gte(500)],
    ]

    let display = ''
    for(let i in type){
        if(type[i][1] && type[i][3]){
            let gain = n(type[i][2])
            display += '<br>'+format(gain)+getResourceColorText(type[i][0])
            gainResource(type[i][0], gain)
        }
    }
    if(display!==''){
        display = '你使用了'+format(player.resource.power)+getResourceColorText('power')+'进行打猎,并获得了' + display
    }else{
        display = '你使用了'+format(player.resource.power)+getResourceColorText('power')+'进行打猎但什么也没有获得'
    }
    addLog(display)

    gainResource('power', player.resource.power.neg())
}

function getCollectDisplay(){
    if(player.game.collecting==null){
        return ''
    }
    return '<hr>你正在'+getCraftName(player.game.collecting)
}

function handoffCollect(id){
    for(let i in MAIN['craft']){
        if(i!==id){
            player.craft[i+'Click'] = false
            player.craft[i+'Cooldown'] = n(0)
        }
    }

    if(player.game.collecting!==id){
        player.game.collecting = id
    }else{
        player.game.collecting = null
        player.craft[id+'Click'] = false
        player.craft[id+'Cooldown'] = n(0)
    }
}

function getCraftEfficiency(id){
    let base = n(MAIN['craft'][id]['gain']()[0]).add(n(MAIN['craft'][id]['gain']()[1]).mul(0.5))
    return base.div(getCraftCooldown(id)).mul(efficientValue.action)
}

function getWorkshopEfficient(){
    let value = n(0)
    for(let i in tmp.civics.workshop){
        if(tmp.civics.workshop[i]?.special?.efficient?.value.neq(0) && player.workshop[i]){
            value = value.add(tmp.civics.workshop[i].special.efficient.value)
        }
    }
    return value
}

function getWorkshopHappiness(){
    let value = n(0)
    for(let i in tmp.civics.workshop){
        if(tmp.civics.workshop[i]?.special?.happiness?.value.neq(0) && player.workshop[i]){
            value = value.add(tmp.civics.workshop[i].special.happiness.value)
        }
    }
    return value
}

function getCraftEfficient(){
    let value = n(100)
    for(let type in tmp){
        for(let side in tmp[type]){
            for(let i in tmp[type][side]){
                if(tmp[type][side][i]?.special?.handicraft?.value.neq(0)){
                    value = value.add(n(tmp[type][side][i].special.handicraft.value).mul(tmp[type][side][i].amount))
                }
            }
        }
    }
    return value.div(100)
}

function getCraftCost(id){
    return MAIN.craft[id].costSecond()
}

function getCraftGain(id){
    return MAIN.craft[id].gainSecond()
}