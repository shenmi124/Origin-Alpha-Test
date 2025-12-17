var MainBuilding = {
    civics: {
        name(){return '定居地'},
        tooltip(){return '决定定居?'},
        unlocked(){return player.action.explore.civicsFound && player.building.civics.eq(0)},
        unique(){return true},
        onBuy(){
            addLog('你找到了一片平地')
            addLog('你决定将此地作为暂时的定居点')
            addLog('以此为基础你可以探索更远的地方')
        },
        cost: {
            dirt(){return n(10)}
        },
        costPower(){return n(0)},
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
                resource(){return 'dirt'},
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
                value(){return n(20)},
            },
        ]
    },
    shelter: {
        name(){
            if(player.workshop.campfire){
                return '小屋'
            }
            return '庇护所'
        },
        tooltip(){
            if(player.workshop.campfire){
                return '用泥土搭建起来的简易小屋'
            }
            return '一个用泥土搭建的临时庇护所,无法提供什么安全感,但是可以遮风挡雨'
        },
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            dirt(){return n(8)},
        },
        costPower(){return n(0.15)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'citizens'},
                value(){return n(1)},
            },
        ]
    },
    hut: {
        name(){
            return '木屋'
        },
        tooltip(){
            return '真正意义上的家,在居住的同时可以提升幸福度'
        },
        unlocked(){return player.workshop.hut},
        cost: {
            plank(){return n(80)},
        },
        costPower(){return n(0.15)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'citizens'},
                value(){return n(2)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福度'},
                display(){return ['+','%']},
                value(){return n(1)},
            },
        ]
    },
    brickHouse: {
        name(){
            return '砖瓦房'
        },
        tooltip(){
            return '真正意义上的家,在居住的同时可以提升幸福度'
        },
        unlocked(){return player.workshop.brickHouse},
        cost: {
            brick(){return n(30)}
        },
        costPower(){return n(0.15)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'citizens'},
                value(){return n(2)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福度'},
                display(){return ['+','%']},
                value(){return n(3)},
            },
        ]
    },
    circus: {
        name(){
            return '马戏团'
        },
        tooltip(){
            return '单有马戏团并没有什么用,你还需要招募一些小丑'
        },
        unlocked(){return player.workshop.circus},
        cost: {
            idea(){return n(10000)},
            leather(){return n(200)},
        },
        costPower(){return n(0.02)},
        onBuy(){
            CitizensFix()
        },
    },
    workshop: {
        name(){return '工坊'},
        tooltip(){
            return '手工工坊,提升全锻造材料获取倍率<br><grey>类加工行动的获取也会增加</grey>'
        },
        unlocked(){return player.workshop.workshop},
        cost: {
            stone(){return n(100)},
            brick(){return n(1)}
        },
        costPower(){return n(0.025)},
        effect: [
            {
                type(){return 'special'},
                side(){return 'forging'},
                formula(){return 'add'},
                name(){return '锻造资源'},
                display(){return ['+','%']},
                value(){return n(4)},
            },
        ]
    },
    granary: {
        name(){return '粮仓'},
        tooltip(){return '储存食物'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            dirt(){return n(20)},
            wood(){return n(20)},
            stone(){return n(10)},
        },
        costPower(){return n(0.1)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(150)},
            },
        ],
        unlocked(){return player.workshop.campfire},
    },
    warehouse: {
        name(){return '货仓'},
        tooltip(){return '储存物资'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            plank(){return n(5)},
        },
        costPower(){return n(0.15)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'leather'},
                value(){return n(25)},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'dirt'},
                value(){return n(80)},
            },
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
                resource(){return 'copper'},
                value(){return n(0)},
            },
        ],
        unlocked(){return player.workshop.campfire},
    },
    school: {
        name(){return '学院'},
        unlocked(){return player.workshop.knowledge},
        cost: {
            brick(){return n(5)},
            parchment(){return n(2)}
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
                side(){return ['gain', 'idea', 'add']},
                formula(){return 'addmul'},
                value(){return n(0.15)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'scholar'},
                side(){return ['gain', 'knowledge', 'add']},
                formula(){return 'addmul'},
                value(){return n(0.15)},
            },
        ],
        onBuy(){
            CitizensFix()
        },
    },
    farm: {
        name(){return '农田'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            food(){return n(2.5)}
        },
        costPower(){return n(0.14)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(0.1)},
            }
        ],
    },
    lumberyards: {
        name(){return '伐木场'},
        unlocked(){return player.workshop.lumberyards},
        cost: {
            wood(){return n(20)},
            dirt(){return n(25)}
        },
        costPower(){return n(0.065)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(0.25)},
            }
        ],
        onBuy(){
            CitizensFix()
        },
    },
    mine:{
        name(){return '矿井'},
        unlocked(){return player.workshop.mine},
        base(){return n(main.craft.collect.luck()).add(main.craft.collect.mul()).sub(2).mul(0.05)},
        tooltip(){
            let speed = ''
            let lucky = ''
            let hr = ''
            if(n(MAIN['craft']['stone']['speed']()).gt(1)){
                speed = '<left>速度倍率: <mul>×</mul>'+format(MAIN['craft']['stone']['speed']())+' <grey>#提升全局产量</grey></left>'
                hr = '<hr>'
            }
            if(n(MAIN['craft']['stone']['lucky']()).gt(1)){
                lucky = '<left>幸运倍率: <mul>×</mul>'+format(MAIN['craft']['stone']['lucky']())+' <grey>#提升矿石产量</grey></left>'
                hr = '<hr>'
            }
            return '建造矿井采集矿石<br><grey>矿井会继承 行动石料 的倍率</grey>'+hr+speed+lucky
        },
        cost: {
            dirt(){return n(200)},
            wood(){return n(100)},
            stone(){return n(150)}
        },
        costPower(){return n(0.1)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(2).mul(MAIN['craft']['stone']['speed']())},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'copper'},
                value(){return n(0.01).mul(MAIN['craft']['stone']['speed']())},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'coal'},
                value(){return n(0.001).mul(MAIN['craft']['stone']['speed']())},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'iron'},
                value(){
                    let base = n(0)
                    if(player.workshop.elevator){
                        base = base.add(0.01)
                    }
                    return n(base).mul(MAIN['craft']['stone']['speed']()).mul(MAIN['craft']['stone']['lucky']())
                },
            },
        ],
        onBuy(){
            CitizensFix()
        },
    },
    kiln: {
        name(){return '窑炉'},
        tooltip(){return '将松散泥土精炼成坚固瓦'},
        unlocked(){return player.workshop.kiln},
        allocation(){return true},
        cost: {
            dirt(){return n(500)}
        },
        costPower(){return n(0.05)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'pollution'},
                value(){return n(10)},
            },
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'dirt'},
                value(){return n(5)},
            },
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'coal'},
                value(){return n(0.05)},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'brick'},
                value(){return n(0.005)},
            },
        ],
    },
    steel: {
        name(){return '高炉'},
        tooltip(){return '炼制钢材'},
        unlocked(){return player.workshop.steel},
        allocation(){return true},
        cost: {
            dirt(){return n(1500)},
            iron(){return n(50)},
            blueprint(){return n(5)}
        },
        costPower(){return n(0.05)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'pollution'},
                value(){return n(50)},
            },
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'coal'},
                value(){return n(0.1)},
            },
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'iron'},
                value(){return n(0.002)},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'steel'},
                value(){return n(0.002)},
            },
        ],
    },
    brewery: {
        name(){return '酿酒厂'},
        tooltip(){return '酿酒厂的存在提升了每位村民消耗食物的基础值'},
        unlocked(){return player.workshop.brewery},
        allocation(){return true},
        cost: {
            plank(){return n(40)},
            food(){return n(600)}
        },
        costPower(){return n(0.04)},
        effect: [
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福度'},
                display(){return ['+','%']},
                value(){return n(6)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'resource'},
                submain(){return 'main'},
                target(){return 'citizens'},
                side(){return ['gain', 'food', 'sub']},
                formula(){return 'addmul'},
                value(){return n(0.2)},
                Class(){return 'red'},
            },
        ],
    },
}