function NumberFix(){
	for(let i in RESOURCE['main']){
		if(RESOURCE['main'][i]['capped']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceCapped(i))
			getResourceID(i)
		}
	}
}

function CheckBuildAllocation(build, res){
    let cost = n(tmp.main.building[build].effect.gain[res].sub.getValue().neg()).mul(player['building'][build+'Allocation'] ?? player['building'][build])
    if(n(cost).lt(0)){
        if(player['resource'][res].lte(n(cost).abs())){
            if(player['building'][build+'Allocation']!==undefined){
                buildingAllocation(build, n(1).neg())
            }
            return n(0)
        }
    }
}

function CheckCitizensAllocation(citizen, res){
    let cost = n(tmp.civics.citizens[citizen].effect.gain[res].sub.getValue().neg()).mul(player['citizens'][citizen])
    if(n(cost).lt(0)){
        if(player['resource'][res].lte(n(cost).abs())){
            if(player['citizens'][citizen]!==undefined){
                citizensAllocate(citizen, n(1).neg())
            }
            return n(0)
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