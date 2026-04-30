var MainBuilding = {
    cabin: {
        name(){
            return '小屋'
        },
        tooltip(){
            return '一个简陋的小屋,无法提供什么安全感,但是可以遮风挡雨'
        },
        unlocked(){return player.action.ideaOfCabin.study},
        cost: {
            wood(){return n(3)},
            stone(){return n(5)},
        },
        costIncrease(){
            let base = n(1.95)
            if(player.workshop.beamWorkshop){
                base = base.sub(0.1)
            }
            return base
        },
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'citizens'},
                value(){return n(1)},
            },
        ]
    },
    logCabin: {
        name(){
            return '木屋'
        },
        tooltip(){
            return '由木板搭建而成的房屋'
        },
        unlocked(){return player.workshop.logCabinWorkshop},
        cost: {
            plank(){return n(5)},
        },
        costIncrease(){return n(1.25)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'citizens'},
                value(){return n(1)},
            },
        ]
    },
    brickHouse: {
        name(){
            return '砖瓦房'
        },
        tooltip(){return '一个真正像模像样的房子'},
        unlocked(){return player.workshop.brickHouseWorkshop},
        cost: {
            brick(){return n(30)},
            ceramic(){return n(20)}
        },
        costIncrease(){return n(1.3)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'citizens'},
                value(){return n(2)},
            }
        ]
    },
    storehouse: {
        name(){return '仓库'},
        cost: {
            wood(){return n(20)},
            stone(){return n(50)},
        },
        costIncrease(){
            let base = n(1.5)
            if(player.workshop.brickReinforcementWorkshop){
                base = base.sub(0.05)
            }
            if(player.workshop.copperReinforcementWorkshop){
                base = base.sub(0.1)
            }
            return base
        },
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(20)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(20)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(50)},
            },
        ],
        unlocked(){return player.workshop.storehouseWorkshop},
    },
    warehouse: {
        name(){return '货仓'},
        cost: {
            plank(){return n(20)},
            brick(){return n(10)},
        },
        costIncrease(){return n(1.2)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'copper'},
                value(){return n(20)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'clay'},
                value(){return n(20)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'ceramic'},
                value(){return n(50)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'fur'},
                value(){return n(25)},
            },
        ],
        unlocked(){return player.workshop.warehouseWorkshop},
    },
    farm: {
        name(){return '农田'},
        unlocked(){return player.action.ideaOfPlant.study},
        cost: {
            food(){return n(5)}
        },
        costIncrease(){return n(1.15)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(0.04)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(5)},
            },
        ],
    },
    lumberyard: {
        name(){return '伐木场'},
        tooltip(){return '伐木场将会提供伐木工的工作岗位并以较低的速率被动生产木材<funny>为什么伐木场会自动生产木材,这不合理</funny>'},
        unlocked(){return player.workshop.lumberyardWorkshop},
        cost: {
            wood(){return n(10)},
            stone(){return n(20)}
        },
        costIncrease(){return n(1.15)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(getCraftEfficiency('collectWood')).mul(0.25)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'logger'},
                side(){return ['gain', 'wood', 'add']},
                formula(){return 'addmul'},
                value(){
                    if(player.workshop.copperAxeWorkshop){
                        return n(0.05)
                    }
                    return n(0)
                },
            },
        ],
        onBuy(){
            CitizensFix()
        },
    },
    quarry: {
        name(){return '采石场'},
        tooltip(){return '采石场将会提供采石工的工作岗位并以较低的速率被动生产石材'},
        unlocked(){return player.workshop.quarryWorkshop},
        cost: {
            wood(){return n(20)},
            stone(){return n(40)},
        },
        costIncrease(){return n(1.15)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(getCraftEfficiency('collectStone')).mul(0.2)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'stonecutter'},
                side(){return ['gain', 'stone', 'add']},
                formula(){return 'addmul'},
                value(){
                    if(player.workshop.copperPickaxeWorkshop){
                        return n(0.05)
                    }
                    return n(0)
                },
            },
        ],
        onBuy(){
            CitizensFix()
        },
    },
    mine: {
        name(){return '矿井'},
        tooltip(){return '每两个矿井将提供一个工作岗位'},
        unlocked(){return player.workshop.shallowMineWorkshop},
        cost: {
            stone(){return n(300)},
            plank(){return n(10)},
        },
        costIncrease(){return n(1.2)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(0.3)},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'copper'},
                value(){return n(0.05)},
            },
        ],
        onBuy(){
            CitizensFix()
        },
    },
    theater: {
        name(){return '剧院'},
        tooltip(){return '每两个剧院将提供一个工作岗位'},
        cost: {
            idea(){return n(500)},
            leather(){return n(20)},
        },
        costIncrease(){return n(1.2)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'idea'},
                value(){return n(200)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福'},
                display(){return ['+','%']},
                value(){
                    let base = n(1)
                    return n(base)
                },
            },
        ],
        onBuy(){
            CitizensFix()
        },
        unlocked(){return player.workshop.artistWorkshop},
    },
    workshop: {
        name(){return '工坊'},
        tooltip(){return '每五个工坊会增加一种自身需要的资源种类<br>每两个工坊将提供一个工作岗位'},
        unlocked(){return player.workshop.artisanWorkshop},
        cost: {
            plank(){return n(3)},
            brick(){return n(3)},
            copper(){
                if(player.building.workshop.gte(5)){
                    return n(1)
                }
                return n(0)
            },
            ceramic(){
                if(player.building.workshop.gte(10)){
                    return n(2.5)
                }
                return n(0)
            },
            manuscript(){
                if(player.building.workshop.gte(15)){
                    return n(0.5)
                }
                return n(0)
            },
            disableUnlocked(){
                if(player.building.workshop.gte(20)){
                    return n(0.25)
                }
                return n(0)
            },
        },
        costIncrease(){return n(1.3)},
        effect: [
            {
                type(){return 'special'},
                side(){return 'handicraft'},
                formula(){return 'add'},
                name(){return '制造资源获取'},
                display(){return ['+','%']},
                value(){return n(6)},
            }
        ],
        onBuy(){
            CitizensFix()
        },
    },
    church: {
        name(){return '教堂'},
        unlocked(){return player.largeBuilding.temple.gte(1)},
        cost: {
            faith(){return n(50)},
            brick(){return n(10)},
        },
        costIncrease(){return n(1.25)},
        effect: [
            {
                type(){return 'capped'},
                resource(){return 'faith'},
                formula(){return 'add'},
                value(){return n(50)},
            },
            {
                type(){return 'special'},
                side(){return 'faithPower'},
                formula(){return 'add'},
                name(){return '信仰力量'},
                display(){return ['+','%']},
                value(){return n(10)},
            },
        ],
    },
    school: {
        name(){return '学院'},
        unlocked(){return player.workshop.scholarWorkshop},
        cost: {
            idea(){return n(100)},
            brick(){return n(10)},
            paper(){return n(2)}
        },
        costIncrease(){return n(1.15)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'knowledge'},
                value(){return n(100)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'scholar'},
                side(){return ['gain', 'knowledge', 'add']},
                formula(){return 'addmul'},
                value(){return n(0.1)},
            },
        ],
        onBuy(){
            CitizensFix()
        },
    },
    library: {
        name(){return '图书馆'},
        unlocked(){return player.workshop.libraryWorkshop},
        cost: {
            ceramic(){return n(50)},
            manuscript(){return n(10)}
        },
        costIncrease(){return n(1.15)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'idea'},
                value(){return n(200)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'knowledge'},
                value(){return n(200)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'scholar'},
                side(){return ['gain', 'knowledge', 'add']},
                formula(){return 'addmul'},
                value(){return n(0.2)},
            },
        ],
        onBuy(){
            CitizensFix()
        },
    },
    kiln: {
        name(){return '窑炉'},
        tooltip(){return '将松散黏土烧成砖瓦'},
        unlocked(){return player.workshop.kilnWorkshop},
        allocation(){return true},
        cost: {
            stone(){return n(200)},
            clay(){return n(10)},
        },
        costIncrease(){return n(1.2)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'wood'},
                value(){return n(1)},
            },
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'clay'},
                value(){return n(1)},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'ceramic'},
                value(){return n(0.1)},
            },
        ],
    },
}

function getBuildingSpeed(){
    let value = n(0)
    for(let type in tmp){
        for(let side in tmp[type]){
            for(let i in tmp[type][side]){
                if(tmp[type][side][i]?.special?.buildingSpeed?.value.getValue().neq(0)){
                    value = value.add(n(tmp[type][side][i].special.buildingSpeed.value.getValue()).mul(tmp[type][side][i].amount))
                }
            }
        }
    }
    return value
}