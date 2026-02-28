var MainBuilding = {
    foundation: {
        name(){return '地基'},
        tooltip(){return '清理出一块土地当做地基'},
        unlocked(){return player.stage.explore.gte(4) && player.building.foundation.eq(0)},
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
            wood(){return n(3)},
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
    storehouse: {
        name(){return '粮仓'},
        cost: {
            wood(){return n(25)},
            stone(){return n(50)},
        },
        costPower(){return n(0.1)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(25)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(25)},
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
            plank(){return n(50)},
            brick(){return n(20)},
        },
        costPower(){return n(0.1)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(50)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(50)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'fur'},
                value(){return n(50)},
            },
        ],
        unlocked(){return player.workshop.warehouseWorkshop},
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
        tooltip(){return '伐木场将会提供伐木工的工作岗位并以较低的速率被动生产木材<joker>为什么伐木场会自动生产木材,这不合理</joker><hr>伐木场的基础产量基于采集木头<br>每三个伐木场将提供一个工作岗位'},
        unlocked(){return player.workshop.lumberyardWorkshop},
        cost: {
            wood(){return n(10)},
            stone(){return n(25)}
        },
        costPower(){return n(0.05)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(getCraftEfficiency('collectWood')).mul(0.25)},
            }
        ],
        onBuy(){
            CitizensFix()
        },
    },
    quarry: {
        name(){return '采石场'},
        tooltip(){return '采石场将会提供采石工的工作岗位并以较低的速率被动生产石材<hr>采石场的基础产量基于采集石头<br>每两个采石场将提供一个工作岗位'},
        unlocked(){return player.workshop.quarryWorkshop},
        cost: {
            wood(){return n(25)},
            stone(){return n(40)},
        },
        costPower(){return n(0.075)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(getCraftEfficiency('collectStone')).mul(0.15)},
            }
        ],
        onBuy(){
            CitizensFix()
        },
    },
    circus: {
        name(){
            return '马戏团'
        },
        tooltip(){
            return '每个马戏团将提供一个工作岗位'
        },
        cost: {
            idea(){return n(500)},
            leather(){return n(20)},
        },
        costPower(){return n(0.02)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'idea'},
                value(){return n(100)},
            },
        ],
        onBuy(){
            CitizensFix()
        },
        unlocked(){return player.workshop.jokerWorkshop},
    },
    workshop: {
        name(){return '工坊'},
        tooltip(){return '工坊可以提升制造资源的获取倍率<br>制造资源是与木板同类的资源<br><gery>鼠标移动到对应资源名称上查看详情</gery><hr>每个工坊都会解锁一项新的研究<br>每五个工坊都会使自身增加一种消耗的资源种类<br>每两个工坊将提供一个工作岗位'},
        unlocked(){return player.workshop.artisanWorkshop},
        cost: {
            plank(){return n(5)},
            brick(){return n(5)},
            disableUnlocked(){
                if(player.building.workshop.gte(5)){
                    return n(1)
                }
                return n(0)
            },
        },
        costPower(){return n(0.25)},
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
            addLog('<darkblue>已学习: '+getWorkshopUnlocked()[Number(player.building.workshop)]+'</darkblue>')
            CitizensFix()
        },
    },
    school: {
        name(){return '学院'},
        unlocked(){return player.workshop.scholarWorkshop},
        cost: {
            idea(){return n(200)},
            brick(){return n(5)},
            paper(){return n(2)}
        },
        costPower(){return n(0.2)},
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
                value(){return n(0.2)},
            },
        ],
        onBuy(){
            CitizensFix()
        },
    },
}