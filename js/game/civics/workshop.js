var CivicsWorkshop = {
    axeWorkshop: { //燧石手斧
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
    pickaxeWorkshop: { //燧石手镐
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
    hoeWorkshop: { //燧石锄
        name(){return '燧石锄'},
        tooltip(){return '能够自给自足谁还想要去拾荒?'},
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
                value(){return n(0.01)},
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
            '解锁职业: 农民',
        ],
        unlocked(){return player.action.ideaOfTool.study},
    },
    marketWorkshop: { //市场
        name(){return '市场'},
        tooltip(){return '有了基础的工具与食物的供给,你可以让你的居民专心执行一项工作的时候维持温饱'},
        cost: {
            food(){return n(100)},
            wood(){return n(20)},
            stone(){return n(50)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(5)},
            }
        ],
        unlockedDisplay: [
            '解锁想法: 语言',
            '解锁想法: 专业化',
        ],
        preliminary(){return ['axeWorkshop', 'pickaxeWorkshop', 'hoeWorkshop']},
    },
    lumberyardWorkshop: { //伐木场
        name(){return '伐木场'},
        cost: {
            wood(){return n(10)},
            stone(){return n(25)}
        },
        effect: [
        ],
        onBuy(){
            player.building.lumberyard = player.building.lumberyard.add(1)
            componentBuilding('lumberyard')
            CitizensFix()
        },
        unlockedDisplay: [
            '解锁建筑: 伐木场',
            '解锁职业: 伐木工',
        ],
        preliminary(){return ['marketWorkshop']},
    },
    quarryWorkshop: { //采石场
        name(){return '采石场'},
        cost: {
            wood(){return n(25)},
            stone(){return n(40)},
        },
        effect: [
        ],
        onBuy(){
            player.building.quarry = player.building.quarry.add(1)
            componentBuilding('quarry')
            CitizensFix()
        },
        unlockedDisplay: [
            '解锁建筑: 采石场',
            '解锁职业: 采石工',
        ],
        preliminary(){return ['marketWorkshop']},
    },
    storehouseWorkshop: { //粮仓
        name(){return '粮仓'},
        cost: {
            wood(){return n(25)},
            stone(){return n(50)},
        },
        effect: [
        ],
        onBuy(){
            player.building.storehouse = player.building.storehouse.add(1)
            componentBuilding('storehouse')
            CitizensFix()
        },
        unlockedDisplay: [
            '解锁建筑: 粮仓',
        ],
        preliminary(){return ['marketWorkshop']},
    },
    processingWorkshop: { //材料加工
        name(){return '材料加工'},
        tooltip(){return '仅仅是原料很难有效的去使用,所以你可以尝试将其加工'},
        cost: {
            wood(){return n(50)},
            stone(){return n(50)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁行为: 制造木板',
            '解锁行为: 制造石板',
            '解锁行为: 制造皮革',
        ],
        preliminary(){return ['marketWorkshop']},
    },
    hunterWorkshop: { //猎人
        name(){return '猎人'},
        tooltip(){return '制造一些武器用于打猎'},
        cost: {
            wood(){return n(100)},
            stone(){return n(20)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁行动: 打猎',
            '解锁资源: 力量',
            '解锁职业: 猎人',
        ],
        preliminary(){return ['marketWorkshop']},
        unlocked(){return player.action.ideaOfProfessionalization.study}
    },
    artisanWorkshop: { //工匠
        name(){return '工匠'},
        tooltip(){return '工匠可以用更少的材料建造更多的建材'},
        cost: {
            plank(){return n(5)},
            brick(){return n(5)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁建筑: 工坊',
            '解锁职业: 工匠',
        ],
        onBuy(){
            player.building.workshop = player.building.workshop.add(1)
            componentBuilding('workshop')
            addLog('<darkblue>已学习: '+getWorkshopUnlocked()[Number(player.building.workshop)]+'</darkblue>')
            CitizensFix()
        },
        preliminary(){return ['marketWorkshop']},
        unlocked(){return player.action.ideaOfProfessionalization.study}
    },
    jokerWorkshop: { //愚者
        name(){return '愚者'},
        tooltip(){return '让一些人专门参与娱乐事业'},
        cost: {
            idea(){return n(500)},
            leather(){return n(20)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁建筑: 马戏团',
            '解锁职业: 愚者',
        ],
        onBuy(){
            player.building.circus = player.building.circus.add(1)
            componentBuilding('circus')
            CitizensFix()
        },
        preliminary(){return ['marketWorkshop']},
        unlocked(){return player.action.ideaOfProfessionalization.study}
    },
    scholarWorkshop: { //学者
        name(){return '学者'},
        tooltip(){return '培养一些学者进行研究'},
        cost: {
            idea(){return n(200)},
            brick(){return n(5)},
            paper(){return n(2)}
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁资源: 思维',
            '解锁建筑: 学院',
            '解锁职业: 学者',
        ],
        onBuy(){
            player.building.school = player.building.school.add(1)
            componentBuilding('school')
            CitizensFix()
        },
        preliminary(){return ['marketWorkshop']},
        unlocked(){return player.action.ideaOfProfessionalization.study}
    },
    builderWorkshop: { //建筑工
        name(){return '建筑工'},
        tooltip(){return '雇佣一些建筑工帮你建造一些大型建筑'},
        cost: {
            brick(){return n(20)},
            disableUnlocked(){return n(2)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁职业: 建筑工',
            '解锁页面: 建筑',
        ],
        onBuy(){
            addLog('已解锁“建筑”子选项卡,位于“主页”选项卡中', 'red')
            addLog('大型建筑')
        },
        preliminary(){return ['marketWorkshop']},
        unlocked(){return player.action.ideaOfProfessionalization.study}
    },
    logCabinWorkshop: { //木屋
        name(){return '木屋'},
        tooltip(){return '更加坚固的房屋'},
        cost: {
            plank(){return n(5)},
        },
        effect: [
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'meditation'},
                formula(){return 'mul'},
                value(){return n(0.1)},
            },
        ],
        unlockedDisplay: [
            '解锁建筑: 木屋',
            '提升冥想的思想获取',
        ],
        onBuy(){
            player.building.logCabin = player.building.logCabin.add(1)
            componentBuilding('logCabin')
            CitizensFix()
        },
        preliminary(){return ['processingWorkshop']},
    },
    warehouseWorkshop: { //货仓
        name(){return '货仓'},
        tooltip(){return '更加坚固的仓库,足以存放更多物品'},
        cost: {
            plank(){return n(50)},
            brick(){return n(20)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁建筑: 粮仓',
        ],
        onBuy(){
            player.building.warehouse = player.building.warehouse.add(1)
            componentBuilding('warehouse')
            CitizensFix()
        },
        preliminary(){return ['processingWorkshop']},
    },
    clothing: { //衣物
        name(){return '衣物'},
        cost: {
            leather(){return n(10)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(3)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福'},
                display(){return ['+','%']},
                value(){return n(3)},
            },
        ],
        preliminary(){return ['processingWorkshop']}
    },
    paperWorkshop: { //羊皮纸
        name(){return '羊皮纸'},
        tooltip(){return '造价昂贵且缓慢,大量生产'},
        cost: {
            leather(){return n(5)}
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁行为: 制造纸',
        ],
        preliminary(){return ['processingWorkshop']},
    },
    toolWorkshop: { //磨制工具
        name(){return '磨制工具'},
        tooltip(){return '制造更专业的工具'},
        cost: {
            stone(){return n(200)}
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(5)},
            },
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftPlank'},
                formula(){return 'mul'},
                value(){return n(0.95)},
            },
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftBrick'},
                formula(){return 'mul'},
                value(){return n(0.95)},
            },
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftLeather'},
                formula(){return 'mul'},
                value(){return n(0.95)},
            },
        ],
        preliminary(){return ['artisanWorkshop']},
        unlocked(){return player.building.workshop.gte(1)}
    },
    mapWorkshop: { //地图
        name(){return '地图'},
        tooltip(){return '记录地形以便更广泛的探索'},
        cost: {
            paper(){return n(10)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(3)},
            },
        ],
        unlockedDisplay: [
            '探索行动上限增加',
        ],
        preliminary(){return ['artisanWorkshop']},
        unlocked(){return player.building.workshop.gte(2)}
    },
    manuscriptWorkshop: { //手稿
        name(){return '手稿'},
        tooltip(){return '将研究记录下来'},
        cost: {
            paper(){return n(5)},
            knowledge(){return n(100)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁行为: 制造手稿',
        ],
        preliminary(){return ['artisanWorkshop']},
        unlocked(){return player.building.workshop.gte(3)}
    },
}

let WORKSHOPBOUGHT = false