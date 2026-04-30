function getActionClick(id){
	if(getActionCanClick(id)){
		player['action'][id+'Click'] = true
	}
    if(MAIN['action'][id]['handoff']!==undefined){
        MAIN['action'][id]['handoff']()
    }
	componentAction(id)
}

function getActionUnlocked(id){
    let unlocked = true
    if(MAIN['action'][id]['unlocked']!==undefined){
        unlocked = MAIN['action'][id]['unlocked']()
    }
    return unlocked
}

function hasActionClick(id){
    return player['action'][id+'Click']
}

function getActionCanClick(id){
    let click = true
    if(MAIN['action'][id]['canClick']!==undefined){
        click = MAIN['action'][id]['canClick']()
    }
    return click && getActionUnlocked(id)
}

function getActionCoerciveClick(id){
    let coercive = false
    if(MAIN['action'][id]['coerciveClick']!==undefined){
        coercive = MAIN['action'][id]['coerciveClick']()
    }
    return coercive
}

function getActionCooldown(id){
    return getEffectValue(tmpEffect.main?.action[id]?.cooldown, MAIN['action'][id]['cooldown']!==undefined)
}

function getActionAuto(id){
    return getEffectValue(tmpEffect.main?.action[id]?.auto, MAIN['action'][id]['cooldown']!==undefined)
}

function getCraftClick(id){
	if(getCraftCanClick(id)){
		player['craft'][id+'Click'] = true
	}
    if(MAIN['craft'][id]['handoff']!==undefined){
        MAIN['craft'][id]['handoff']()
    }
	componentCraft(id)
}

function getCraftUnlocked(id){
    let unlocked = true
    if(MAIN['craft'][id]['unlocked']!==undefined){
        unlocked = MAIN['craft'][id]['unlocked']()
    }
    return unlocked
}

function hasCraftClick(id){
    return player['craft'][id+'Click']
}

function getCraftCanClick(id){
    let click = true
    if(MAIN['craft'][id]['canClick']!==undefined){
        click = MAIN['craft'][id]['canClick']()
    }
    return click && getCraftUnlocked(id)
}

function getCraftCoerciveClick(id){
    let coercive = false
    if(MAIN['craft'][id]['coerciveClick']!==undefined){
        coercive = MAIN['craft'][id]['coerciveClick']()
    }
    return coercive
}

function getCraftCooldown(id){
    return getEffectValue(tmpEffect.main?.craft[id]?.cooldown, MAIN['craft'][id]['cooldown']!==undefined)
}

function getCraftAuto(id){
    return getEffectValue(tmpEffect.main?.craft[id]?.auto, MAIN['craft'][id]['cooldown']!==undefined)
}

function buildBuilding(id){
    let canbuy = true
    let logs = '缺少资源'
    for(let i in MAIN['building'][id]['cost']){
        let res = getBuildCost(id, i)
        if(n(player['resource'][i]).lt(res)){
            let name = getResourceColorText(i)
            canbuy = false
            if(RESOURCE['main'][i]['unlocked']!==undefined){
                if(!RESOURCE['main'][i]['unlocked']()){
                    name = '<gery>???</gery>'
                }
            }
            logs += '<br><li-hid>'+format(n(res).sub(player['resource'][i]))+name
        }
    }
    if(canbuy){
        for(let i in MAIN['building'][id]['cost']){
            let res = getBuildCost(id, i)
            player['resource'][i] = player['resource'][i].sub(res)
        }
        player['building'][id] = player['building'][id].add(1)
        if(player['building'][id+'Allocation']){
            player['building'][id+'Allocation'] = player['building'][id+'Allocation'].add(1)
        }
        if(MAIN['building'][id]['onBuy']!==undefined){
            MAIN['building'][id]['onBuy']()
        }
    }else{
        addLog(logs,'#888')
    }

    intervalID()
    componentBuilding(id)
}

function getBuildCost(build, res){
    let base = n(MAIN['building'][build]['cost'][res]()).mul(n(MAIN['building'][build]['costIncrease']()).pow(player['building'][build]))
    return base
}

function getBuildBase(build, type, res, operator){
    if(temp?.main?.building[build][type][res]?.[operator]==undefined){
        return n(0)
    }
    if(operator=='add'){
        return temp.main.building[build][type][res][operator].getValue()
    }else if(operator=='addmul'){
        return temp.main.building[build][type][res][operator].getValue()
    }else if(operator=='mul'){
        return temp.main.building[build][type][res][operator].getValue()
    }else if(operator=='sub'){
        return temp.main.building[build][type][res][operator].getValue().neg()
    }
    return n(0)
}

function buildingAllocation(build, amount){
    player['building'][build+'Allocation'] = player['building'][build+'Allocation'].add(amount).min(player['building'][build]).max(0)
    componentBuilding(build)
    intervalID()
}

function getLargeBuildingComplete(id){
    return player['largeBuilding'][id+'Times'].gte(MAIN['largeBuilding'][id]['buildingTimes']())
}

function getLargeBuildingCanBuild(id){
    return player['largeBuilding'][id+'Building'].lt(n(MAIN['largeBuilding'][id]['buildingDifficulty']()).mul(player['largeBuilding'][id+'Times']).div(MAIN['largeBuilding'][id]['buildingTimes']()))
}

function buildLargeBuilding(id){
    let canbuy = true
    let logs = '缺少资源'
    for(let i in MAIN['largeBuilding'][id]['cost']){
        let res = getLargeBuildingCost(id, i)
        if(n(player['resource'][i]).lt(res)){
            let name = getResourceColorText(i)
            canbuy = false
            if(RESOURCE['main'][i]['unlocked']!==undefined){
                if(!RESOURCE['main'][i]['unlocked']()){
                    name = '<gery>???</gery>'
                }
            }
            logs += '<br><li-hid>'+format(n(res).sub(player['resource'][i]))+name
        }
    }
    if(canbuy){
        for(let i in MAIN['largeBuilding'][id]['cost']){
            let res = getLargeBuildingCost(id, i)
            player['resource'][i] = player['resource'][i].sub(res)
        }
        player['largeBuilding'][id+'Times'] = player['largeBuilding'][id+'Times'].add(1)
    }else{
        addLog(logs,'#888')
    }

    intervalID()
    componentLargeBuilding(id)
}

function getBuildingSpeedBase(){
    return getBuildingSpeed()
}

function getLargeBuildingBase(build, type, res, operator){
    if(tmp.main.largeBuilding[build].effect[type][res]?.[operator]==undefined){
        return n(0)
    }
    if(operator=='add'){
        return tmp.main.largeBuilding[build].effect[type][res][operator].getValue()
    }else if(operator=='addmul'){
        return tmp.main.largeBuilding[build].effect[type][res][operator].getValue()
    }else if(operator=='mul'){
        return tmp.main.largeBuilding[build].effect[type][res][operator].getValue()
    }else if(operator=='sub'){
        return tmp.main.largeBuilding[build].effect[type][res][operator].getValue().neg()
    }
    return n(0)
}

function getLargeBuildingCheckboxAmount(){
    let buildingAmount = 0
    for(let i in MAIN['largeBuilding']){
        let checkbox = document.getElementById(i+'LargeBuildingCheckbox')
        if(checkbox?.checked){
            buildingAmount++
        }
    }
    return buildingAmount
}

function getLargeBuildingCost(build, res){
    let base = n(MAIN['largeBuilding'][build]['cost'][res]()).mul(n(MAIN['largeBuilding'][build]['costIncrease']()).pow(player['largeBuilding'][build]))
    return base
}

function largeBuildingUpdate(id){
    if(n(getLargeBuildingCheckboxAmount()).neq(0)){
        player['largeBuilding'][id+'Building'] = player['largeBuilding'][id+'Building'].add(n(getBuildingSpeed()).div(getLargeBuildingCheckboxAmount()).mul(DIFF)).min(n(MAIN['largeBuilding'][id]['buildingDifficulty']()).mul(player['largeBuilding'][id+'Times']).div(MAIN['largeBuilding'][id]['buildingTimes']()))
    }
    
    if(player.largeBuilding[id+'Building'].gte(MAIN['largeBuilding'][id]['buildingDifficulty']())){
        player.largeBuilding[id] = player.largeBuilding[id].add(1)
        player.largeBuilding[id+'Building'] = n(0)
        player.largeBuilding[id+'Times'] = n(0)
        if(MAIN['largeBuilding'][id]['onBuy']!==undefined){
            MAIN['largeBuilding'][id]['onBuy']()
        }
        addLog('大型建筑'+MAIN['largeBuilding'][id]['name']()+'建造完成')
        componentLargeBuilding(id)
    }

    if(!getLargeBuildingCanBuild(id)){
        getByID(id+'LoadLargeBuildingBuildingID', '')
    }
}

function getLargeBuildingID(build){
	if(player['largeBuilding'][build+'Times'].neq(0)){
		getByID(build+'LoadLargeBuildingBuildID', `<a>`+format(player.largeBuilding[build+'Building'])+` / `+format(n(MAIN['largeBuilding'][build]['buildingDifficulty']()).mul(n(player.largeBuilding[build+'Times']).div(MAIN['largeBuilding'][build]['buildingTimes']())))+` <grey>(+`+format(n(getBuildingSpeedBase(build)).div(n(getLargeBuildingCheckboxAmount()).max(1)))+`/s)</grey></a>`)
        
        let border = n(100).sub(player.largeBuilding[build+'Times'].div(MAIN['largeBuilding'][build]['buildingTimes']()).mul(100))
        document.getElementById(build+"BuildingTimesBorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
	}else{
		getByID(build+'LoadLargeBuildingBuildID', '')

        document.getElementById(build+"BuildingTimesBorderID").style.clipPath = 'inset(0% 100% 0% 0%)'
	}

    if(player.largeBuilding[build+'Building'].neq(0)){
        let border2 = n(100).sub(player.largeBuilding[build+'Building'].div(MAIN['largeBuilding'][build]['buildingDifficulty']()).mul(100))
        document.getElementById(build+"BuildingBorderID").style.clipPath = 'inset(0% '+border2+'% 0% 0%)'
    }else{
        document.getElementById(build+"BuildingBorderID").style.clipPath = 'inset(0% 100% 0% 0%)'
    }
}