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
    return base.div(getCraftCooldown(id))
}