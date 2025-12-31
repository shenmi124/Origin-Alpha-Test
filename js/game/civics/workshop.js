var CivicsWorkshop = {
    cantbuy: {
        name(){return '残局提醒'},
        tooltip(){return '已达残局<br>后续内容暂未制作'},
        cost: {
            food(){return n(114514)},
        },
        unlocked(){return true},
    },
    axeWorkshop: {
        name(){return '燧石手斧'},
        tooltip(){return '打磨,穿孔'},
        cost: {
            stone(){return n(25)},
            wood(){return n(5)},
        },
        unlockedDisplay: [
            '提升采集木头的获取',
        ],
        unlocked(){return player.action.ideaOfTool.study},
    },
    pickaxeWorkshop: {
        name(){return '燧石手镐'},
        tooltip(){return '打磨,穿孔'},
        cost: {
            stone(){return n(25)},
            wood(){return n(5)},
        },
        unlockedDisplay: [
            '提升采集石头的获取',
        ],
        unlocked(){return player.action.ideaOfTool.study},
    },
    hoeWorkshop: {
        name(){return '燧石锄'},
        tooltip(){return '打磨,穿孔'},
        cost: {
            stone(){return n(25)},
            wood(){return n(5)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'farm'},
                side(){return ['gain', 'food', 'add']},
                formula(){return 'add'},
                value(){return n(0.025)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'farm'},
                side(){return ['capped', 'food', 'add']},
                formula(){return 'add'},
                value(){return n(5)},
            },
        ],
        unlockedDisplay: [
            '增加职业: 农民',
        ],
        unlocked(){return player.action.ideaOfTool.study},
    },
}

let WORKSHOPBOUGHT = false