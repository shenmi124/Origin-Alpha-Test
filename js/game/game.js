function gameDiff(){
	player.game.time = player.game.time.add(n(1).mul(DIFF))
    getGametime()

    if(n(getEfficient('stability')).lt(1) && player.resource.citizens.gte(1)){
        let leave = Math.floor(Math.random() * (1 / Number(DIFF)) * 60 * 20)
        if(leave<=(Number(player.resource.citizens.root(2)))){
            let sta = Math.random()
            if(n(sta).gt(getEfficient('stability'))){
                player.resource.citizens = player.resource.citizens.sub(1)
                CitizensFix()
                addLog('一位居民离开了你','#888')
            }
        }
    }
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
        let base = n(getPower()).div(adj)
        let roll = Math.random()
        return n(base.mul(0.25)).add(base.mul(0.75).mul(roll))
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

function getCraftEfficient(){
    let value = n(100)
    for(let type in tmp){
        for(let side in tmp[type]){
            for(let i in tmp[type][side]){
                if(tmp[type][side][i]?.special?.handicraft?.value.getValue().neq(0)){
                    value = value.add(n(tmp[type][side][i].special.handicraft.value.getValue()).mul(tmp[type][side][i].amount))
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

function getFaithPower(){
    return player.resource.faith.max(1).log10().mul(player.building.church.mul(0.1).add(1))
}