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
        /*ideaOfLanguage: {
            name(){return '语言的想法'},
            effect(){return n(3)},
            active(){return player.action.ideaOfLanguage.study}
        },*/
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
        workshop: {
            name(){return '工坊影响'},
            effect(){return n(getWorkshopHappiness())},
            active(){return n(getWorkshopHappiness()).neq(0)}
        },
        joker: {
            name(){return '愚者'},
            effect(){return n(tmp.civics.citizens.joker.special.happiness.value).mul(player.citizens.joker)},
            active(){return n(tmp.civics.citizens.joker.special.happiness.value).mul(player.citizens.joker).neq(0)}
        },
        citizens: {
            name(){return '人口'},
            effect(){return player.resource.citizens.mul(0.5).neg()},
        },
    }
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