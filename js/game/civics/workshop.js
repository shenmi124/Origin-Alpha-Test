var CivicsWorkshop = {
    start: {
        name(){return '起始'},
        tooltip(){return '一切的开始'},
        keep(){return true},
        cost: {
            idea(){return n(10)},
        },
        onBuy(){
            addLog('将鼠标移动到资源,职业等名字上可以看见对应的信息','red')
        },
    },

    minute: {
        name(){return '沙漏轮翻'},
        keep(){return true},
        tooltip(){return '观察沙漏,以此来判断分钟'},
        cost: {
            idea(){return n(5000)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福度'},
                display(){return ['+','%']},
                value(){return n(1)},
            },
        ],
        unlockedDisplay: [
            '允许玩家知晓实时游戏分',
        ],
        preliminary(){return ['hour']}
    },
    hour: {
        name(){return '日晷渐移'},
        keep(){return true},
        tooltip(){return '观察影子的位移,以此来判断时期'},
        cost: {
            idea(){return n(500)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福度'},
                display(){return ['+','%']},
                value(){return n(1)},
            },
        ],
        unlockedDisplay: [
            '允许玩家知晓实时游戏时',
        ],
        preliminary(){return ['day']}
    },
    day: {
        name(){return '东升西落'},
        keep(){return true},
        tooltip(){return '观察太阳的东升西落,以此来判断日期'},
        cost: {
            idea(){return n(200)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福度'},
                display(){return ['+','%']},
                value(){return n(1)},
            },
        ],
        unlockedDisplay: [
            '允许玩家知晓实时游戏日',
        ],
        preliminary(){return ['start']},
        unlocked(){return player.game.time.gte(144)}
    },
    month: {
        name(){return '阴晴圆缺'},
        keep(){return true},
        tooltip(){return '观察月亮的阴晴圆缺,以此来判断月份'},
        cost: {
            idea(){return n(1000)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福度'},
                display(){return ['+','%']},
                value(){return n(1)},
            },
        ],
        unlockedDisplay: [
            '允许玩家知晓实时游戏月',
        ],
        preliminary(){return ['day']},
        unlocked(){return player.game.time.gte(4320)}
    },
    year: {
        name(){return '四季轮转'},
        keep(){return true},
        tooltip(){return '观察四季变换,以此来判断年份'},
        cost: {
            idea(){return n(2000)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福度'},
                display(){return ['+','%']},
                value(){return n(1)},
            },
        ],
        unlockedDisplay: [
            '允许玩家知晓实时游戏年',
        ],
        preliminary(){return ['month']},
        unlocked(){return player.game.time.gte(51840)}
    },
    pickaxe: {
        name(){return '燧石镐'},
        tooltip(){return '用石头做出石镐以开采石头<br><grey>采集土堆时有概率获得石头</grey><joker>开采石头做出石镐以开采石头</joker>'},
        cost: {
            stone(){return n(1)},
        },
        unlockedDisplay: [
            '允许开采石堆',
        ],
        preliminary(){return ['start']},
    },
    binding: {
        name(){return '绑定结'},
        tooltip(){return '绑定好你的燧石镐'},
        effect: [
            {
                type(){return 'craft'},
                side(){return 'auto'},
                target(){return 'stone'},
                formula(){return 'mul'},
                value(){return n(1.25)},
            },
            {
                type(){return 'special'},
                side(){return 'stoneLuck'},
                formula(){return 'add'},
                name(){return '行动石堆'},
                display(){return ['幸运+','%']},
                value(){return n(50)},
            },
        ],
        cost: {
            wood(){return n(5)},
            stone(){return n(10)},
        },
        preliminary(){return ['pickaxe']}
    },
    mountaineeringPickaxe: {
        name(){return '手杖'},
        tooltip(){return '提供探索加成,同时允许玩家进一步的探索<br><grey>采集石料时有概率获得石头</grey>'},
        effect: [
            {
                type(){return 'action'},
                side(){return 'auto'},
                target(){return 'explore'},
                formula(){return 'mul'},
                value(){return n(1.1)},
            },
            {
                type(){return 'special'},
                side(){return 'exploreLuck'},
                formula(){return 'add'},
                name(){return '行动探索'},
                display(){return ['幸运+','%']},
                value(){return n(10)},
            },
            {
                type(){return 'special'},
                side(){return 'explorerHappiness'},
                formula(){return 'add'},
                name(){return '职业'+CIVICS['citizens']['explorer']['name']()},
                display(){return ['幸福度修正+','%']},
                value(){return n(0.5)},
            },
        ],
        unlockedDisplay: [
            '探索可以找到更多事物',
        ],
        cost: {
            stone(){return n(30)},
            copper(){return n(2)},
        },
        preliminary(){return ['pickaxe']}
    },
    axe: {
        name(){return '燧石斧'},
        cost: {
            wood(){return n(5)},
            stone(){return n(30)},
        },
        unlockedDisplay: [
            '允许将木头加工成木梁',
            '允许砍树<grey>#你需要先找到树</gery>',
        ],
        preliminary(){return ['start']},
    },
    hoe: {
        name(){return '燧石锄头'},
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'farm'},
                side(){return ['gain', 'food', 'add']},
                formula(){return 'mul'},
                value(){return n(1.2)},
            }
        ],
        cost: {
            wood(){return n(200)},
            stone(){return n(50)},
        },
        preliminary(){return ['start']},
    },
    lumberyards: {
        name(){return '伐木场'},
        tooltip(){return '<grey>每三个伐木场可以就业一名伐木工</grey>'},
        cost: {
            wood(){return n(20)},
            dirt(){return n(25)}
        },
        unlockedDisplay: [
            '解锁建筑 伐木场',
            '解锁职业 伐木工',
        ],
        onBuy(){
            player.building.lumberyards = player.building.lumberyards.add(1)
            componentBuilding('lumberyards')
            CitizensFix()
        },
        unlocked(){return player.action.explore.treeFound},
        preliminary(){return ['axe']}
    },
    knife: {
        name(){return '燧石小刀'},
        tooltip(){return '<grey>力量决定了你类狩猎行为的倍率<br>当你的力量大于对方时可以进行狩猎<br>同时你的力量每溢出一倍的需求最大狩猎数量就+1</grey>'},
        effect: [
            {
                type(){return 'special'},
                side(){return 'power'},
                formula(){return 'add'},
                name(){return '力量'},
                display(){return ['+','']},
                value(){return n(3)},
            }
        ],
        cost: {
            wood(){return n(5)},
            stone(){return n(30)},
        },
        preliminary(){return ['start']},
    },
    armor: {
        name(){return '护甲'},
        effect: [
            {
                type(){return 'special'},
                side(){return 'power'},
                formula(){return 'add'},
                name(){return '力量'},
                display(){return ['+','']},
                value(){return n(2)},
            }
        ],
        cost: {
            leather(){return n(30)},
        },
        preliminary(){return ['start']},
    },
    clothes: {
        name(){return '皮衣'},
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(15)},
            }
        ],
        cost: {
            leather(){return n(20)},
        },
        preliminary(){return ['start']},
    },
    campfire: {
        name(){return '营火'},
        keep(){return true},
        tooltip(){return '人们聚在一起谈论自己的想法<br>真正的开始'},
        cost: {
            dirt(){return n(50)},
            wood(){return n(20)},
            stone(){return n(20)},
        },
        effect: [
            {
                type(){return 'capped'},
                resource(){return 'idea'},
                formula(){return 'mul'},
                value(){return n(1.2)},
            }
        ],
        unlockedDisplay: [
            '阶段1 - 手工工场时代',
            '解锁建筑 货仓',
            '解锁建筑 粮仓',
            '建筑修正 庇护所->小屋',
            '职业修正 开拓者->探险家',
            '更多...',
        ],
        onBuy(){
            nameCorrection('building', 'shelter', '小屋')
            nameCorrection('citiznes', 'explorer', '探险家')
        },
        preliminary(){return ['start']},
    },

    mine: {
        name(){return '矿井'},
        tooltip(){return '在石头上搭建矿井并派人去开采矿石<br><grey>矿井会基于 行动石料 的倍率<hr>速度倍率 将提升矿井的基础产量<br>幸运倍率 将提升矿井的矿石产量</grey>'},
        cost: {
            dirt(){return n(200)},
            wood(){return n(100)},
            stone(){return n(150)}
        },
        onBuy(){
            player.building.mine = player.building.mine.add(1)
            componentBuilding('mine')
            CitizensFix()
        },
        preliminary(){return ['campfire']}
    },
    kiln: {
        name(){return '窑炉'},
        tooltip(){return '砖瓦匠'},
        cost: {
            dirt(){return n(500)},
        },
        onBuy(){
            player.building.kiln = player.building.kiln.add(1)
            componentBuilding('kiln')
        },
        preliminary(){return ['mine']}
    },
    hut: {
        name(){return '木屋'},
        tooltip(){return '用木板搭建而成的小屋'},
        cost: {
            plank(){return n(100)}
        },
        onBuy(){
            player.building.hut = player.building.hut.add(1)
            componentBuilding('hut')
        },
        preliminary(){return ['campfire']}
    },
    brewery: {
        name(){return '酿酒厂'},
        tooltip(){return '你的居民十分不幸福,或许你需要提供一些精神物质的支持'},
        cost: {
            plank(){return n(40)},
            food(){return n(600)}
        },
        onBuy(){
            player.building.brewery = player.building.brewery.add(1)
            componentBuilding('brewery')
        },
        preliminary(){return ['campfire']}
    },
    circus: {
        name(){return '马戏团'},
        tooltip(){return '你的居民十分不幸福,或许你需要提供另一些精神物质的支持'},
        cost: {
            idea(){return n(10000)},
            leather(){return n(200)},
        },
        onBuy(){
            player.building.circus = player.building.circus.add(1)
            componentBuilding('circus')
            CitizensFix()
        },
        preliminary(){return ['campfire']}
    },
    depth: {
        name(){return '深层采集'},
        tooltip(){return '<joker>deeeep</joker>'},
        cost: {
            plank(){return n(200)},
        },
        preliminary(){return ['mine']}
    },
    supportBeam: {
        name(){return '支撑柱'},
        tooltip(){return '安全就业'},
        cost: {
            plank(){return n(300)},
        },
        preliminary(){return ['mine']}
    },
    fireBrick: {
        name(){return '耐火砖'},
        tooltip(){return '用你刚刚获得的砖块重修窑炉,降低温度散失速率,变相节省燃料'},
        cost: {
            brick(){return n(5)},
        },
        preliminary(){return ['kiln']}
    },
    highTemperature: {
        name(){return '高温生产'},
        tooltip(){return '或许你可以利用这高温炼制一些金属'},
        cost: {
            coal(){return n(150)},
        },
        preliminary(){return ['kiln']}
    },
    highTemperatureProcessing: {
        name(){return '高温炼制'},
        tooltip(){return '淬炼工具'},
        cost: {
            knowledge(){return n(200)},
            iron(){return n(20)}
        },
        preliminary(){return ['fireBrick', 'highTemperature']}
    },
    steel: {
        name(){return '高炉'},
        tooltip(){return '淬炼钢铁'},
        cost: {
            dirt(){return n(1500)},
            iron(){return n(50)},
            blueprint(){return n(5)}
        },
        onBuy(){
            player.building.steel = player.building.steel.add(1)
            componentBuilding('steel')
        },
        preliminary(){return ['fireBrick', 'highTemperature']}
    },
    dryAirBlastlns: {
        name(){return '自然干化法'},
        tooltip(){return '通过下渗和蒸发自然风干污泥,提升瓦的获取率'},
        cost: {
            plank(){return n(50)},
            knowledge(){return n(30)},
        },
        preliminary(){return ['kiln', 'knowledge']}
    },
    brickReinforcement: {
        name(){return '砖材加固'},
        cost: {
            brick(){return n(20)},
        },
        preliminary(){return ['kiln']}
    },
    workshop: {
        name(){return '工坊'},
        tooltip(){return '现在是真正的手工工厂时代了!'},
        cost: {
            stone(){return n(100)},
            brick(){return n(1)}
        },
        onBuy(){
            player.building.workshop = player.building.workshop.add(1)
            componentBuilding('workshop')
        },
        preliminary(){return ['kiln']}
    },
    lance: {
        name(){return '长矛'},
        tooltip(){return '锻造一些金属长矛,组建一支猎人大军'},
        cost: {
            stone(){return n(100)},
            copper(){return n(20)}
        },
        preliminary(){return ['workshop']}
    },
    cooperReinforcement: {
        name(){return '铜材加固'},
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'warehouse'},
                side(){return ['capped', 'copper', 'add']},
                formula(){return 'add'},
                value(){return n(5)},
            },
        ],
        cost: {
            brick(){return n(10)},
            copper(){return n(50)},
        },
        preliminary(){return ['workshop']}
    },
    copperShovel: {
        name(){return '铜铲'},
        cost: {
            copper(){return n(50)},
        },
        preliminary(){return ['workshop']}
    },
    copperAxe: {
        name(){return '铜锯'},
        cost: {
            copper(){return n(40)},
            plank(){return n(180)}
        },
        preliminary(){return ['workshop']}
    },
    copperPickaxe: {
        name(){return '铜镐'},
        cost: {
            copper(){return n(80)}
        },
        preliminary(){return ['workshop']}
    },
    copperPoe: {
        name(){return '耒耜'},
        cost: {
            wood(){return n(50)},
            copper(){return n(149)},
        },
        preliminary(){return ['workshop']}
    },
    landImprovement: {
        name(){return '土地改良'},
        cost: {
            dirt(){return n(1000)}
        },
        preliminary(){return ['copperPoe']}
    },
    copperAnvil: {
        name(){return '铜砧'},
        cost: {
            copper(){return n(120)}
        },
        preliminary(){return ['workshop']}
    },
    ironReinforcement: {
        name(){return '金属加固'},
        cost: {
            knowledge(){return n(150)},
            copper(){return n(10)},
            iron(){return n(50)},
        },
        preliminary(){return ['workshop', 'highTemperatureProcessing']}
    },
    ironShovel: {
        name(){return '金属铲'},
        cost: {
            knowledge(){return n(100)},
            iron(){return n(50)},
        },
        preliminary(){return ['workshop', 'highTemperatureProcessing']}
    },
    ironAxe: {
        name(){return '金属锯'},
        cost: {
            knowledge(){return n(200)},
            iron(){return n(40)},
            plank(){return n(360)}
        },
        preliminary(){return ['workshop', 'highTemperatureProcessing']}
    },
    ironPickaxe: {
        name(){return '金属镐'},
        cost: {
            knowledge(){return n(300)},
            iron(){return n(80)}
        },
        preliminary(){return ['workshop', 'highTemperatureProcessing']}
    },
    ironAnvil: {
        name(){return '铁砧'},
        cost: {
            knowledge(){return n(200)},
            iron(){return n(120)}
        },
        preliminary(){return ['workshop', 'highTemperatureProcessing']}
    },
    parchment: {
        name(){return '羊皮纸'},
        tooltip(){return '用羊皮制成纸形薄片,用于书写'},
        cost: {
            leather(){return n(50)},
        },
        onBuy(){
            gainResource('parchment', n(MAIN['action']['parchment']['gain']()))
        },
        preliminary(){return ['campfire']}
    },
    map: {
        name(){return '地图'},
        tooltip(){return '刻画地图<br><grey>通过地图你可以寻找到铁</grey>'},
        cost: {
            parchment(){return n(10)},
        },
        onBuy(){
            addLog('效率 不会提升 特殊 一栏下的效果' ,'#888')
        },
        preliminary(){return ['parchment', 'workshop']}
    },
    compass: {
        name(){return '指南针'},
        tooltip(){return '用磁石做一块指南针'},
        cost: {
            iron(){return n(5)},
        },
        preliminary(){return ['parchment', 'magnetFound']}
    },
    knowledge: {
        name(){return '学院'},
        tooltip(){return '非圣人莫能为,非智者莫能先'},
        cost: {
            idea(){return n(1000)},
            parchment(){return n(1)}
        },
        onBuy(){
            player.building.school = player.building.school.add(1)
            componentBuilding('school')
            CitizensFix()
        },
        preliminary(){return ['parchment']}
    },
    blueprint: {
        name(){return '蓝图'},
        tooltip(){return '记录思维'},
        cost: {
            knowledge(){return n(100)},
            parchment(){return n(1)}
        },
        onBuy(){
            gainResource('blueprint', n(MAIN['action']['blueprint']['gain']()))
        },
        preliminary(){return ['knowledge']}
    },
    papermaking: {
        name(){return '造纸术'},
        tooltip(){return '用木材剩下来的木屑代替毛皮'},
        cost: {
            parchment(){return n(50)},
            knowledge(){return n(220)},
        },
        preliminary(){return ['knowledge']}
    },
    simplifiedMachinery: {
        name(){return '简单机械'},
        tooltip(){return '工业化的开端'},
        cost: {
            copper(){return n(100)},
            iron(){return n(10)},
            blueprint(){return n(1)},
        },
        preliminary(){return ['workshop']}
    },
    pulley: {
        name(){return '吊轮'},
        tooltip(){return '有效提升建筑效率'},
        cost: {
            copper(){return n(50)},
            iron(){return n(10)},
            blueprint(){return n(3)},
        },
        preliminary(){return ['simplifiedMachinery']}
    },
    truck: {
        name(){return '手推车'},
        cost: {
            copper(){return n(60)},
            iron(){return n(40)},
        },
        preliminary(){return ['simplifiedMachinery']}
    },
    elevator: {
        name(){return '升降机'},
        cost: {
            copper(){return n(100)},
            blueprint(){return n(5)},
        },
        preliminary(){return ['pulley']}
    },
    brickHouse: {
        name(){return '砖瓦房'},
        cost: {
            brick(){return n(30)}
        },
        onBuy(){
            player.building.brickHouse = player.building.brickHouse.add(1)
            componentBuilding('brickHouse')
        },
        preliminary(){return ['pulley', 'truck']}
    },
    camp: {
        name(){return '营地'},
        keep(){return true},
        tooltip(){return '逐步进入工业化'},
        cost: {
            knowledge(){return n(500)},
            copper(){return n(100)},
            iron(){return n(50)},
            steel(){return n(1)},
            brick(){return n(50)},
        },
        onBuy(){
            getStage(5)
        },
        preliminary(){return ['campfire']}
    },
}

let WORKSHOPBOUGHT = false