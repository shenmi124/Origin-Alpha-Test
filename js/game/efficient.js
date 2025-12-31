let efficient = {
    action: {
        name(){return '效率'},
        tooltip(){return '效率是基础的行动速度<hr><grey>效率会影响行动与行为的基础速度</grey>'},
        unlocked(){return true},
        food: {
            name(){return '缺少食物'},
            effect(){return n(-50)},
            active(){return player.resource.food.lte(0)}
        },
    },
    happiness: {
        name(){return '幸福'},
        tooltip(){return '幸福是决定居民工作效率的主要影响之一<hr><grey>幸福度会影响村民的基础效率<br>幸福度大于100%时居民会食用更多的食物</grey>'},
        unlocked(){return getResourceUnlocked('citizens')},
        food: {
            name(){return '缺少食物'},
            effect(){return n(-50)},
            active(){return player.resource.food.lte(0)}
        },
        citizens: {
            name(){return '人口'},
            effect(){return player.resource.citizens.mul(0.5).neg()},
        },
    }
}

function getEfficient(id){
    let base = n(100)
	for(i in efficient[id]){
		if(i=="tooltip" || i=="name" || i=="unlocked"){
			continue
		}
        let act = true
        if(efficient[id][i]['active']!==undefined){
            act = efficient[id][i]['active']()
        }
		if(act){
			base = base.add(efficient[id][i]['effect']())
		}
	}
    return base.max(1).div(100)
}