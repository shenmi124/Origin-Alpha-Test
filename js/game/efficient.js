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
        workshop: {
            name(){return '工坊影响'},
            effect(){return n(getWorkshopEfficient())},
            active(){return n(getWorkshopEfficient()).neq(0)}
        },
    },
    happiness: {
        name(){return '幸福'},
        tooltip(){return '幸福是决定居民工作效率的主要影响之一<hr><grey>幸福会影响村民的基础效率<br>幸福大于100%时居民会食用更多的食物</grey>'},
        unlocked(){return getResourceUnlocked('citizens')},
        food: {
            name(){return '缺少食物'},
            effect(){return n(-50)},
            active(){return player.resource.food.lte(0)}
        },
        workshop: {
            name(){return '工坊影响'},
            effect(){return n(getWorkshopHappiness())},
            active(){return n(getWorkshopHappiness()).neq(0)}
        },
        theater: {
            name(){return '建筑: 剧院'},
            effect(){return tmp.main.building.theater.special.happiness.value.getValue().mul(player.building.theater)},
            active(){return tmp.main.building.theater.special.happiness.value.getValue().mul(player.building.theater).neq(0)}
        },
        artist: {
            name(){return '职业: 艺术家'},
            effect(){return tmp.civics.citizens.artist.special.happiness.value.getValue().mul(player.citizens.artist)},
            active(){return tmp.civics.citizens.artist.special.happiness.value.getValue().mul(player.citizens.artist).neq(0)}
        },
        priestToPraise: {
            name(){return '牧师: 颂赞'},
            effect(){return tmp.civics.citizens.priestToPraise.special.happiness.value.getValue().mul(player.citizens.priestToPraise)},
            active(){return tmp.civics.citizens.priestToPraise.special.happiness.value.getValue().mul(player.citizens.priestToPraise).neq(0)}
        },
        citizens: {
            name(){return '人口'},
            effect(){return player.resource.citizens.mul(0.5).neg()},
        },
    },
    stability: {
        name(){return '稳定'},
        tooltip(){return '稳定代表了一个文明的稳定程度<hr><grey>稳定小于100%时居民将有概率在任意时刻离你而去</grey>'},
        unlocked(){return getResourceUnlocked('citizens')},
        food: {
            name(){return '缺少食物'},
            effect(){return n(-50)},
            active(){return player.resource.food.lte(0)}
        },
        workshop: {
            name(){return '工坊影响'},
            effect(){return n(getWorkshopStability())},
            active(){return n(getWorkshopStability()).neq(0)}
        },
        priestToWorship: {
            name(){return '牧师: 礼拜'},
            effect(){return tmp.civics.citizens.priestToWorship.special.stability.value.getValue().mul(player.citizens.priestToWorship)},
            active(){return tmp.civics.citizens.priestToWorship.special.stability.value.getValue().mul(player.citizens.priestToWorship).neq(0)}
        },
        citizens: {
            name(){return '人口'},
            effect(){return player.resource.citizens.mul(1).neg()},
        },
        happiness: {
            name(){return '幸福'},
            effect(){return n(getEfficient('happiness')).sub(1).mul(100)},
        }
    }
}

function getWorkshopEfficient(){
    let value = n(0)
    for(let i in tmp.civics.workshop){
        if(tmp.civics.workshop[i]?.special?.efficient?.value.getValue().neq(0) && player.workshop[i]){
            value = value.add(tmp.civics.workshop[i].special.efficient.value.getValue())
        }
    }
    return value
}

function getWorkshopHappiness(){
    let value = n(0)
    for(let i in tmp.civics.workshop){
        if(tmp.civics.workshop[i]?.special?.happiness?.value.getValue().neq(0) && player.workshop[i]){
            if(tmp.civics.workshop[i]?.special?.happiness?.formula=='add'){
                value = value.add(tmp.civics.workshop[i].special.happiness.value.getValue())
            }else if(tmp.civics.workshop[i]?.special?.happiness?.formula=='sub'){
                value = value.sub(tmp.civics.workshop[i].special.happiness.value.getValue())
            }
        }
    }
    return value
}

function getWorkshopStability(){
    let value = n(0)
    for(let i in tmp.civics.workshop){
        if(tmp.civics.workshop[i]?.special?.stability?.value.getValue().neq(0) && player.workshop[i]){
            if(tmp.civics.workshop[i]?.special?.stability?.formula=='add'){
                value = value.add(tmp.civics.workshop[i].special.stability.value.getValue())
            }else if(tmp.civics.workshop[i]?.special?.stability?.formula=='sub'){
                value = value.sub(tmp.civics.workshop[i].special.stability.value.getValue())
            }
        }
    }
    return value
}

let efficientValue = {}
function getEfficientValue(){
    for(let type in efficient){
        let base = n(100)
        for(let i in efficient[type]){
            if(i=="tooltip" || i=="name" || i=="unlocked"){
                continue
            }
            let act = true
            if(efficient[type][i]['active']!==undefined){
                act = efficient[type][i]['active']()
            }
            if(act){
                base = base.add(efficient[type][i]['effect']())
            }
        }
        efficientValue[type] = base.max(1).div(100)
    }
}

function getEfficient(id){
    return n(efficientValue[id])
}