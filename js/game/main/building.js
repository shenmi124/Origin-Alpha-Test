var MainBuilding = {
    foundation: {
        name(){return '地基'},
        tooltip(){return '清理出一块土地当做地基'},
        unlocked(){return player.stage.explore.gte(2) && player.building.foundation.eq(0)},
        unique(){return true},
        onBuy(){
            addLog('为了之后的探索,我找到了一片平地并决定作为暂时的定居点')
        },
        cost: {
            wood(){return n(1)},
            stone(){return n(10)},
        },
        costPower(){return n(0)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(30)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(30)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(50)},
            },
        ]
    },

    cabin: {
        name(){
            return '小屋'
        },
        tooltip(){
            return '一个简陋的小屋,无法提供什么安全感,但是可以遮风挡雨'
        },
        unlocked(){return player.action.ideaOfCabin.study},
        cost: {
            wood(){return n(2)},
            stone(){return n(10)},
        },
        costPower(){return n(0.2)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'citizens'},
                value(){return n(1)},
            },
        ]
    },
    farm: {
        name(){return '农田'},
        unlocked(){return player.action.ideaOfPlant.study},
        cost: {
            food(){return n(2.5)}
        },
        costPower(){return n(0.15)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(0.05)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(5)},
            },
        ],
    },
}