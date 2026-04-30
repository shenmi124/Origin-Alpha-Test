function NumberFix(){
	for(let i in RESOURCE['main']){
		if(RESOURCE['main'][i]['capped']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceCapped(i))
			getResourceID(i)
		}
	}
}

function CheckBuildAllocation(build, res){
    if(n(getResourceGain(res)).lt(0)){
        let cost = n(tmp.main.building[build].effect.gain[res].sub.getValue().neg()).mul(player['building'][build+'Allocation'] ?? player['building'][build])
        if(n(cost).lt(0)){
            if(player['resource'][res].lte(n(cost).abs())){
                if(player['building'][build+'Allocation']){
                    addLog('因资源不足建筑'+MAIN['building'][build]['name']()+'自动停用')
                    buildingAllocation(build, n(1).neg())
                }
                return n(0)
            }
        }
    }
}

function CheckLargeBuildAllocation(build, res){
    if(n(getResourceGain(res)).lt(0)){
        let cost = n(tmp.main.largeBuilding[build].effect.gain[res].sub.getValue().neg()).mul(player['largeBuilding'][build+'Allocation'] ?? player['largeBuilding'][build])
        if(n(cost).lt(0)){
            if(player['resource'][res].lte(n(cost).abs())){
                if(player['largeBuilding'][build+'Allocation']){
                    addLog('因资源不足大型建筑'+MAIN['building'][build]['name']()+'自动停用')
                    largeBuildingAllocation(build, n(1).neg())
                }
                return n(0)
            }
        }
    }
}

function CheckCitizensAllocation(citizen){
	for(let res in tmp.civics.citizens[citizen].effect?.gain){
        if(n(getResourceGain(res)).lt(0)){
            for(let operator in tmp.civics.citizens[citizen].effect.gain[res]){
                if(operator=='sub'){
                    let cost = n(tmp.civics.citizens[citizen].effect.gain[res].sub.getValue().neg()).mul(player['citizens'][citizen])
                    if(n(cost).lt(0)){
                        if(player['resource'][res].lte(n(cost).abs())){
                            if(player['citizens'][citizen]!==undefined){
                                addLog('因资源不足职业'+CIVICS['citizens'][citizen]['name']()+'变为无业游民')
                                citizensAllocate(citizen, n(1).neg())
                            }
                            return n(0)
                        }
                    }
                }
            }
        }
	}
}

function CitizensFix(){
    for(let i in CIVICS['citizens']){
        if(CIVICS['citizens'][i]['unlocked']!==undefined){
            if(!CIVICS['citizens'][i]['unlocked']() && player['citizens'][i].neq(0)){
                citizensAllocate(i, player['citizens'][i].neg())
            }
        }
    }
	for(let i in CIVICS['jobs']){
        let num = n(CIVICS['jobs'][i]['amount']())
        for(let ic in CIVICS['citizens']){
            if(CIVICS['citizens'][ic]['allocated']?.[i]!==undefined){
                num = num.sub(n(player['citizens'][ic]).mul(CIVICS['citizens'][ic]['allocated'][i]()))                        
            }
        }
        if(num.lt(0)){
            for(let ic in CIVICS['citizens']){
                if(CIVICS['citizens'][ic]['allocated']?.[i]!==undefined){
                    let remain = n(num).abs()
                    let over = n(remain).div(CIVICS['citizens'][ic]['allocated'][i]()).ceil()
                    if(player['citizens'][ic].gte(over)){
                        player['citizens'][ic] = player['citizens'][ic].sub(over)
                        break
                    }else{
                        let weight = player['citizens'][ic]
                        player['citizens'][ic] = player['citizens'][ic].sub(weight)
                        num = num.add(weight)
                    }
                }
            }
        }
	}

	for(let i in CIVICS['citizens']){
		componentCitizens(i)
	}

	for(let i in CIVICS['jobs']){
		componentJobs(i)
	}

	getByID('CitizensTip',CitizensTip())
}