var CivicsCitizens = {
    farmer: {
        name(){return '农民'},
        tooltip(){return '<grey>农民的产量基于农田</grey>'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(getBuildBase('farm', 'gain', 'food', 'add'))},
            },
            {
                type(){return 'craft'},
                side(){return 'auto'},
                target(){return 'harvest'},
                formula(){return 'add'},
                value(){return n(0.255)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'sub'},
                name(){return '幸福度'},
                display(){return ['','%']},
                value(){
                    let base = n(1)
                    if(player.workshop.copperPoe){
                        base = base.sub(0.5)
                    }
                    return n(base)
                },
            },
        ],
    },
    explorer: {
        name(){
            if(player.workshop.campfire){
                return '探险家'
            }
            return '开拓者'
        },
        tooltip(){return this.name()+'可以自动进行探索行动并且提供遗忘延迟<br><grey>遗忘延迟可以提高行动的上限</grey>'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'action'},
                side(){return 'auto'},
                target(){return 'explore'},
                formula(){return 'add'},
                value(){return n(0.15)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'sub'},
                name(){return '幸福度'},
                display(){return ['','%']},
                value(){
                    let base = n(0.5)
                    if(player.workshop.mountaineeringPickaxe){
                        base = base.sub(0.5)
                    }
                    return n(base)
                },
            },
            {
                type(){return 'special'},
                side(){return 'memory'},
                formula(){return 'addmul'},
                name(){return '遗忘延迟'},
                display(){return ['<mul>×</mul>+','']},
                value(){return n(0.5)},
            },
        ],
        active(){
            GameCraftFix()
        },
    },
    collector: {
        name(){return '劳工'},
        unlocked(){return true},
        tooltip(){return '劳工会缓慢的自动采集泥土<br>同时也会缓慢进行收集以及树枝行动'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'dirt'},
                value(){return n(0.5)},
            },
            {
                type(){return 'craft'},
                side(){return 'auto'},
                target(){return 'collect'},
                formula(){return 'add'},
                value(){return n(0.1)},
            },
            {
                type(){return 'craft'},
                side(){return 'auto'},
                target(){return 'drop'},
                formula(){return 'add'},
                value(){return n(0.05)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'sub'},
                name(){return '幸福度'},
                display(){return ['','%']},
                value(){
                    let base = n(1.5)
                    if(player.workshop.copperShovel){
                        base = base.sub(0.5)
                    }
                    return n(base)
                },
            },
        ],
    },
    hunt: {
        name(){return '猎人'},
        tooltip(){return '辅助狩猎'},
        unlocked(){return player.workshop.lance},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'leather'},
                value(){return n(0.5)},
            },
            {
                type(){return 'craft'},
                side(){return 'auto'},
                target(){return 'beast'},
                formula(){return 'add'},
                value(){return n(0.4)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'sub'},
                name(){return '幸福度'},
                display(){return ['','%']},
                value(){
                    let base = n(1)
                    return n(base)
                },
            },
        ],
        active(){
            GameCraftFix()
        },
    },
    lumberjack: {
        name(){return '伐木工'},
        unlocked(){return player.workshop.lumberyards},
        tooltip(){return '伐木工可以收集木材并加工它们'},
        allocated: {
            unemployed(){return n(1)},
            lumberyards(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(0.5)},
            },
            {
                type(){return 'action'},
                side(){return 'auto'},
                target(){return 'plank'},
                formula(){return 'add'},
                value(){return n(0.5)},
            },
            {
                type(){return 'craft'},
                side(){return 'auto'},
                target(){return 'tree'},
                formula(){return 'add'},
                value(){return n(0.2)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'sub'},
                name(){return '幸福度'},
                display(){return ['','%']},
                value(){
                    let base = n(2.5)
                    if(player.workshop.copperAxe){
                        base = base.sub(0.5)
                    }
                    return n(base)
                },
            },
        ],
    },
    miner: {
        name(){return '矿工'},
        unlocked(){return player.workshop.mine},
        tooltip(){return '危险就业<br><grey>矿工的产量基于矿井</grey>'},
        allocated: {
            unemployed(){return n(1)},
            mine(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(getBuildBase('mine', 'gain', 'stone', 'add'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'copper'},
                value(){return n(getBuildBase('mine', 'gain', 'copper', 'add')).mul(2)},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'coal'},
                value(){return n(getBuildBase('mine', 'gain', 'coal', 'add')).mul(5)},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'iron'},
                value(){return n(getBuildBase('mine', 'gain', 'iron', 'add')).mul(0.25)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'sub'},
                name(){return '幸福度'},
                display(){return ['','%']},
                value(){
                    let base = n(7.5)
                    if(player.workshop.supportBeam){
                        base = base.sub(2.5)
                    }
                    if(player.workshop.copperPickaxe){
                        base = base.sub(1)
                    }
                    return n(base)
                },
            },
        ],
    },
    scholar: {
        name(){return '学者'},
        tooltip(){return '智者虑未萌,愚者惑已成<hr>学者能散发更多思想,同时可以将思想变成思维'},
        unlocked(){return player.workshop.knowledge},
        allocated: {
            unemployed(){return n(1)},
            scholar(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'idea'},
                value(){return n(5)},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'knowledge'},
                value(){return n(0.1)},
            },
        ],
    },
    joker: {
        name(){return '小丑'},
        unlocked(){return player.workshop.circus},
        allocated: {
            unemployed(){return n(1)},
            circus(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'idea'},
                value(){return n(10)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福度'},
                display(){return ['+','%']},
                value(){
                    let base = n(7)
                    return n(base)
                },
            },
        ],
    },
}

var CivicsJobs = {
    unemployed: {
        name(){return '无业游民'},
        amount(){return n(player.resource.citizens)},
        display(){return false}
    },
    lumberyards: {
        name(){return '空闲伐木场'},
        tooltip(){return '每三个伐木场可以就业一名伐木工'},
        amount(){return n(player.building.lumberyards).div(3).floor()},
    },
    mine: {
        name(){return '空闲矿井'},
        tooltip(){return '每一个矿井可以就业一名矿工'},
        amount(){return n(player.building.mine)},
    },
    circus: {
        name(){return '空闲马戏团'},
        tooltip(){return '每个马戏团需要一位小丑'},
        amount(){return n(player.building.circus)},
    },
    scholar: {
        name(){return '空闲学院'},
        tooltip(){return '每个学院可以容纳两位学者'},
        amount(){return n(player.building.school).mul(2)},
    },
}

var CitizensTip = function(){
    return formatWhole(player.resource.citizens)
}