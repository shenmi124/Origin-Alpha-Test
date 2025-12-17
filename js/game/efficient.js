let efficient = {
    action: {
        name(){return '效率'},
        tooltip(){return '效率是基础的行动速度<hr><grey>效率影响行动与采集的基础速度</grey>'},
        unlocked(){return true},
    },
    happiness: {
        name(){return '幸福度'},
        tooltip(){return '居民的幸福度决定了他们的行动能力<hr><grey>幸福度会影响村民的基础效率<br>幸福度大于100%时居民会食用更多的食物<br>幸福度与效率都会影响村民的行动速度</grey>'},
        unlocked(){return player.game.stage.gte(4)},
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