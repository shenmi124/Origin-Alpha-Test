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

function Build(id){
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

function getBuildCost(building, res){
    let base = n(MAIN['building'][building]['cost'][res]()).add(1).mul(player['building'][building].mul(0.1).add(1)).pow(player['building'][building].mul(MAIN['building'][building]['costPower']()).add(1)).sub(1)
    return base
}

function getBuildBase(build, type, res, operator){
    if(tmp.main.building[build].effect[type][res][operator]==undefined){
        return n(0)
    }
    if(operator=='add'){
        return tmp.main.building[build].effect[type][res][operator].getValue()
    }else if(operator=='sub'){
        return tmp.main.building[build].effect[type][res][operator].getValue().neg()
    }
}

function buildingAllocation(build, amount){
    player['building'][build+'Allocation'] = player['building'][build+'Allocation'].add(amount).max(0)
    componentBuilding(build)
    intervalID()
}