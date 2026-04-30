var CivicsWorkshop = {
    toolWorkshop: { //工具
        name(){return '工具'},
        tooltip(){return '工具的发明为生产力的提高提供了更多的可能性'},
        cost: {
            idea(){return n(20)},
            stone(){return n(5)}
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(3)},
            }
        ],
    },
    axeWorkshop: { //燧石斧
        name(){return '燧石斧'},
        tooltip(){return '打磨,穿孔'},
        cost: {
            wood(){return n(5)},
            stone(){return n(20)},
        },
        unlockedDisplay: [
            '提升采集木头的获取(<mul>×</mul>1.5)',
        ],
        preliminary(){return ['toolWorkshop']},
    },
    pickaxeWorkshop: { //燧石镐
        name(){return '燧石镐'},
        tooltip(){return '打磨,穿孔'},
        cost: {
            wood(){return n(5)},
            stone(){return n(20)},
        },
        unlockedDisplay: [
            '提升采集石头的获取(<mul>×</mul>1.5)',
        ],
        preliminary(){return ['toolWorkshop']},
    },
    hoeWorkshop: { //燧石锄
        name(){return '燧石锄'},
        tooltip(){return '自给自足'},
        cost: {
            wood(){return n(5)},
            stone(){return n(20)},
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
        preliminary(){return ['toolWorkshop']},
    },
    shovelWorkshop: { //燧石铲
        name(){return '燧石铲'},
        cost: {
            wood(){return n(50)},
            stone(){return n(200)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '提升采集黏土的获取(<mul>×</mul>1.5)',
        ],
        preliminary(){return ['toolWorkshop']},
        unlocked(){return player.stage.explore.gte(4)},
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
                value(){return n(2)},
            }
        ],
        preliminary(){return ['toolWorkshop']},
    },
    lumberyardWorkshop: { //伐木场
        name(){return '伐木场'},
        cost: {
            wood(){return n(10)},
            stone(){return n(20)}
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
            wood(){return n(20)},
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
    storehouseWorkshop: { //仓库
        name(){return '仓库'},
        cost: {
            wood(){return n(20)},
            stone(){return n(50)},
        },
        effect: [
        ],
        onBuy(){
            player.building.storehouse = player.building.storehouse.add(1)
            componentBuilding('storehouse')
        },
        unlockedDisplay: [
            '解锁建筑: 仓库',
        ],
        preliminary(){return ['marketWorkshop']},
    },
    brickReinforcementWorkshop: { //砖材加固
        name(){return '砖材加固'},
        cost: {
            brick(){return n(20)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'storehouse'},
                side(){return ['capped', 'wood', 'add']},
                formula(){return 'add'},
                value(){return n(25)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'storehouse'},
                side(){return ['capped', 'stone', 'add']},
                formula(){return 'add'},
                value(){return n(25)},
            },
        ],
        unlockedDisplay: [
            '轻微降低仓库的价格增长',
        ],
        preliminary(){return ['storehouseWorkshop']}
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
                formula(){return 'div'},
                value(){return n(5)},
            },
        ],
        unlockedDisplay: [
            '解锁建筑: 木屋',
            '提升冥想的思想获取(<mul>×</mul>10)',
        ],
        onBuy(){
            player.building.logCabin = player.building.logCabin.add(1)
            componentBuilding('logCabin')
        },
        preliminary(){return ['processingWorkshop']},
    },
    paperWorkshop: { //羊皮纸
        name(){return '羊皮纸'},
        tooltip(){return '羊皮纸的制造并不简单,现在只能以极低的效率产出'},
        cost: {
            leather(){return n(5)}
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁行为: 制造纸',
        ],
        onBuy(){
            gainResource('paper', n(1))
        },
        preliminary(){return ['processingWorkshop']},
    },
    mapWorkshop: { //地图
        name(){return '地图'},
        tooltip(){return '在此之前你们把地貌刻画在岩石之类的地方,但要想远航还是将地图刻画在纸张上更为实在'},
        cost: {
            paper(){return n(5)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(2)},
            },
        ],
        unlockedDisplay: [
            '探索行动上限增加',
        ],
        preliminary(){return ['paperWorkshop']},
    },
    kilnWorkshop: { //陶窑
        name(){return '陶窑'},
        tooltip(){return '烧一些陶瓦,用于制作<br>或许也可以用来烧一些金属'},
        cost: {
            stone(){return n(200)},
            clay(){return n(10)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁建筑: 陶窑',
        ],
        onBuy(){
            player.building.kiln = player.building.kiln.add(1)
            componentBuilding('kiln')
        },
        unlocked(){return player.stage.explore.gte(4)},
    },
    ceramicsIndustryWorkshop: { //制陶业
        name(){return '制陶业'},
        tooltip(){return '让工匠负责陶器的制作'},
        cost: {
            ceramic(){return n(5)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'artisan'},
                side(){return ['gain', 'clay', 'add']},
                formula(){return 'add'},
                value(){return n(getCraftEfficiency('collectClay')).mul(0.5).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'artisan'},
                side(){return ['gain', 'ceramic', 'addmul']},
                formula(){return 'add'},
                value(){return n(0.1).mul(getEfficient('happiness'))},
            },
        ],
        unlockedDisplay: [
        ],
        onBuy(){
        },
        preliminary(){return ['kilnWorkshop']},
    },
    ceramicMoldWorkshop: { //陶范法
        name(){return '陶范法'},
        tooltip(){return '将你找到的金属粒用陶范法烧制成足以用于制作工具的合金<br>青铜工具将有效的提升生产力'},
        cost: {
            knowledge(){return n(25)},
            copper(){return n(5)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'kiln'},
                side(){return ['gain', 'copper', 'addmul']},
                formula(){return 'add'},
                value(){return n(0.05)},
            },
        ],
        unlockedDisplay: [
        ],
        onBuy(){
        },
        preliminary(){return ['kilnWorkshop']},
    },
    dryAirBlastlnsWorkshop: { //自然干化法
        name(){return '自然干化法'},
        tooltip(){return '通过下渗和蒸发自然风干污泥,提升陶的获取率'},
        cost: {
            knowledge(){return n(250)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'kiln'},
                side(){return ['gain', 'ceramic', 'add']},
                formula(){return 'mul'},
                value(){return n(1.25)},
            },
        ],
        preliminary(){return ['kilnWorkshop']}
    },
    shipWorkshop: { //船
        name(){return '船'},
        tooltip(){return '水能载舟'},
        cost: {
            plank(){return n(500)},
            manuscript(){return n(5)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(2)},
            },
        ],
        unlockedDisplay: [
            '探索行动上限增加',
        ],
        onBuy(){
        },
        unlocked(){return player.stage.explore.gte(4)},
        preliminary(){return ['artisanWorkshop']}
    },
    professionalizationWorkshop: { //专业化
        name(){return '专业化'},
        tooltip(){return '为一些多余的人口进行专职化训练'},
        cost: {
            idea(){return n(500)},
            food(){return n(150)}
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(1)},
            }
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
        preliminary(){return ['professionalizationWorkshop']}
    },
    artisanWorkshop: { //工匠
        name(){return '工匠'},
        tooltip(){return '工匠可以用更少的材料建造更多的建材'},
        cost: {
            plank(){return n(3)},
            brick(){return n(3)},
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
            addLog('- 帮助 -<br>工坊可以提升制造资源的获取倍率,制造资源是与木板同类的资源,将鼠标移动到对应资源名称上查看详情<br><grey>你可以在标签页“其他-记录”中再次查看你所见过的帮助</grey>')
            CitizensFix()
        },
        preliminary(){return ['professionalizationWorkshop']}
    },
    artistWorkshop: { //艺术家
        name(){return '艺术家'},
        tooltip(){return '创作艺术满足精神世界'},
        cost: {
            idea(){return n(500)},
            leather(){return n(20)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁建筑: 剧院',
            '解锁职业: 艺术家',
        ],
        onBuy(){
            player.building.theater = player.building.theater.add(1)
            componentBuilding('theater')
            CitizensFix()
        },
        preliminary(){return ['professionalizationWorkshop']}
    },
    scholarWorkshop: { //学者
        name(){return '学者'},
        tooltip(){return '培养一些学者进行研究'},
        cost: {
            idea(){return n(100)},
            brick(){return n(10)},
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
        preliminary(){return ['professionalizationWorkshop']}
    },
    builderWorkshop: { //建筑工
        name(){return '建筑工'},
        tooltip(){return '雇佣一些建筑工帮你建造一些大型建筑'},
        cost: {
            brick(){return n(10)},
            ceramic(){return n(5)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁职业: 建筑工',
            '解锁页面: 建筑',
            '解锁大型建筑: 神殿',
        ],
        onBuy(){
            addLog('已解锁“建筑”子标签页,位于“建设”标签页中', 'red')
            addLog('- 帮助 -<br>大型建筑具有更加繁琐的建造过程,但也会带来更加显著的收益<br>大型建筑的建造分为两步,首先建造大型建筑需要备材,消耗对应的资源进行备材,已准备的材料还需要让建筑工进行建造,当备材与建造进度均完成时大型建筑才算作建造完成<br>可进行建筑的大型建筑最右侧会有一个建造按钮,建造速度将平均分配给所有正在进行建造的大型建筑<br><grey>你可以在标签页“其他-记录”中再次查看你所见过的帮助')
        },
        preliminary(){return ['professionalizationWorkshop']}
    },
    metalworkerWorkshop: { //金属工人
        name(){return '金属工人'},
        tooltip(){return '分配一些人专门去收集金属<br>金属工人需要矿井,不过在此之前你可以让拾荒者去拾起一些金属粒'},
        cost: {
            copper(){return n(5)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'wastePicker'},
                side(){return ['gain', 'copper', 'add']},
                formula(){return 'add'},
                value(){return n(getCraftEfficiency('collectCopper')).mul(0.2).mul(getEfficient('happiness'))},
            },
        ],
        unlockedDisplay: [
            '解锁职业: 金属工人'
        ],
        onBuy(){
        },
        preliminary(){return ['professionalizationWorkshop']},
        unlocked(){return player.stage.explore.gte(4)},
    },
    spearWorkshop: { //长矛
        name(){return '长矛'},
        tooltip(){return '比棍棒更好用'},
        cost: {
            power(){return n(500)},
            wood(){return n(120)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'hunter'},
                side(){return ['gain', 'power', 'add']},
                formula(){return 'mul'},
                value(){return n(1.2)},
            },
        ],
        preliminary(){return ['hunterWorkshop']},
    },
    bowWorkshop: { //弓
        name(){return '弓'},
        tooltip(){return '教会猎人们如何使用与制作合成弓和复合弓'},
        cost: {
            power(){return n(3000)},
            wood(){return n(200)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'hunter'},
                side(){return ['gain', 'power', 'add']},
                formula(){return 'mul'},
                value(){return n(1.2)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'hunter'},
                side(){return ['capped', 'power', 'add']},
                formula(){return 'mul'},
                value(){return n(1.2)},
            },
        ],
        preliminary(){return ['hunterWorkshop']},
    },
    delicateToolsWorkshop: { //精细工具
        name(){return '精细工具'},
        tooltip(){return '让工匠专门去生产精细工具,这将会有效提高生产力'},
        cost: {
            wood(){return n(40)},
            stone(){return n(150)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(2)},
            }
        ],
        unlockedDisplay: [
            '提升采集木头的获取(<mul>×</mul>1.25)',
            '提升采集石头的获取(<mul>×</mul>1.25)',
        ],
        preliminary(){return ['artisanWorkshop']},
    },
    specializedToolsWorkshop: { //专业工具
        name(){return '专业工具'},
        tooltip(){return '一些为了制造木板与石砖的专业工具'},
        cost: {
            wood(){return n(40)},
            stone(){return n(150)},
        },
        effect: [
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftPlank'},
                formula(){return 'div'},
                value(){return n(1.25)},
            },
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftBrick'},
                formula(){return 'div'},
                value(){return n(1.25)},
            },
        ],
        unlockedDisplay: [
            '降低制造木板的消耗(<mul>÷</mul>1.25)',
            '降低制造石砖的消耗(<mul>÷</mul>1.25)',
        ],
        preliminary(){return ['artisanWorkshop']},
    },
    operaWorkshop: { //歌剧
        name(){return '歌剧'},
        tooltip(){return '一种艺术形式'},
        cost: {
            idea(){return n(2400)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'artist'},
                side(){return ['gain', 'idea', 'add']},
                formula(){return 'mul'},
                value(){return n(1.25)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'artist'},
                side(){return ['special', 'happiness', 'value']},
                formula(){return 'add'},
                value(){return n(1)},
            },
        ],
        preliminary(){return ['artistWorkshop']},
    },
    musicalWorkshop: { //音乐剧
        name(){return '音乐剧'},
        tooltip(){return '另一种艺术形式'},
        cost: {
            idea(){return n(5600)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'theater'},
                side(){return ['gain', 'idea', 'addmul']},
                formula(){return 'add'},
                value(){return n(0.05)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'artist'},
                side(){return ['special', 'happiness', 'value']},
                formula(){return 'add'},
                value(){return n(1)},
            },
        ],
        preliminary(){return ['artistWorkshop']},
    },
    manuscriptWorkshop: { //手稿
        name(){return '手稿'},
        tooltip(){return '将研究记录下来'},
        cost: {
            paper(){return n(5)},
            knowledge(){return n(100)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'scholar'},
                side(){return ['gain', 'knowledge', 'add']},
                formula(){return 'mul'},
                value(){return n(2)},
            },
        ],
        unlockedDisplay: [
            '解锁行为: 制造手稿',
        ],
        onBuy(){
            gainResource('manuscript', n(1))
        },
        preliminary(){return ['scholarWorkshop']},
    },
    vegetableTanningWorkshop: { //植物鞣制法
        name(){return '植物鞣制法'},
        tooltip(){return '一种更好的皮革制法'},
        cost: {
            knowledge(){return n(10)}
        },
        effect: [
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftLeather'},
                formula(){return 'div'},
                value(){return n(1.2)},
            },
        ],
        unlockedDisplay: [
            '降低制造皮革的消耗(<mul>÷</mul>2)',
        ],
        preliminary(){return ['hunterWorkshop']},
    },
    airDryWorkshop: { //风干
        name(){return '风干'},
        tooltip(){return '储存食物的好方法'},
        cost: {
            knowledge(){return n(20)}
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'storehouse'},
                side(){return ['capped', 'food', 'add']},
                formula(){return 'add'},
                value(){return n(25)},
            },
        ],
        unlockedDisplay: [
        ],
        preliminary(){return ['scholarWorkshop']},
    },
    latheWorkshop: { //车床
        name(){return '车床'},
        tooltip(){return '高效制作'},
        cost: {
            knowledge(){return n(50)},
            wood(){return n(200)},
            stone(){return n(200)},
        },
        effect: [
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftPlank'},
                formula(){return 'div'},
                value(){return n(1.2)},
            },
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftBrick'},
                formula(){return 'div'},
                value(){return n(1.2)},
            },
        ],
        unlockedDisplay: [
            '降低制造木板的消耗(<mul>÷</mul>1.2)',
            '降低制造石砖的消耗(<mul>÷</mul>1.2)',
        ],
        preliminary(){return ['scholarWorkshop']},
    },
    languageWorkshop: { //语言
        name(){return '语言'},
        tooltip(){return '<grey><i>“「语言作为最重要的工具,主要不是一种用于表达思想的方式,而是扮演着更为实际的角色,那就是行为控制」——《技术史》”</i></grey>'},
        cost: {
            knowledge(){return n(100)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'stability'},
                formula(){return 'add'},
                name(){return '稳定'},
                display(){return ['+','%']},
                value(){return n(5)},
            },
        ],
        unlockedDisplay: [
        ],
        preliminary(){return ['scholarWorkshop']},
    },
    beamWorkshop: { //梁
        name(){return '梁'},
        tooltip(){return '在建筑物或矿井中用于承重的结构'},
        cost: {
            knowledge(){return n(80)},
            plank(){return n(20)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'storehouse'},
                side(){return ['capped', 'wood', 'add']},
                formula(){return 'add'},
                value(){return n(25)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'storehouse'},
                side(){return ['capped', 'stone', 'add']},
                formula(){return 'add'},
                value(){return n(15)},
            },
        ],
        unlockedDisplay: [
            '轻微降低小屋的价格增长',
        ],
        onBuy(){
        },
        preliminary(){return ['builderWorkshop']},
    },
    wheelWorkshop: { //轮子
        name(){return '轮子'},
        tooltip(){return '转动是一种概念,而转动的所有高效工业应用都是某种轮子发展起来的'},
        cost: {
            knowledge(){return n(80)},
            plank(){return n(30)},
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
        ],
        onBuy(){
        },
        preliminary(){return ['artisanWorkshop']},
    },
    potterWheelWorkshop: { //陶轮
        name(){return '陶轮'},
        tooltip(){return '为小堆可塑黏土提供离心力<funny>它实际上叫做tour</funny>'},
        cost: {
            knowledge(){return n(100)},
            clay(){return n(50)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'kiln'},
                side(){return ['gain', 'ceramic', 'add']},
                formula(){return 'mul'},
                value(){return n(1.25)},
            },
        ],
        unlockedDisplay: [
        ],
        onBuy(){
        },
        preliminary(){return ['wheelWorkshop', 'kilnWorkshop']},
    },
    horseWorkshop: { //马车
        name(){return '马车'},
        tooltip(){return '交通工具因轮子的概念有了质的飞跃'},
        cost: {
            idea(){return n(1000)},
            copper(){return n(20)},
            plank(){return n(50)},
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
        ],
        unlockedDisplay: [
        ],
        onBuy(){
        },
        preliminary(){return ['wheelWorkshop']},
    },
    wheelSpokeWorkshop: { //轮辐
        name(){return '轮辐'},
        tooltip(){return '随着轮辐的发明有轮车获得了长距离移动的能力'},
        cost: {
            idea(){return n(3000)},
            copper(){return n(150)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(2)},
            },
        ],
        unlockedDisplay: [
            '探索行动上限增加',
        ],
        onBuy(){
        },
        preliminary(){return ['horseWorkshop']},
    },
    copperAxeWorkshop: { //青铜斧
        name(){return '青铜斧'},
        cost: {
            copper(){return n(5)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '提升采集木头的获取(<mul>×</mul>1.5)',
            '每个伐木场提升伐木工的效率(+0.05)',
        ],
        onBuy(){
        },
        preliminary(){return ['axeWorkshop', 'ceramicMoldWorkshop']},
    },
    copperPickaxeWorkshop: { //青铜镐
        name(){return '青铜镐'},
        tooltip(){return '更加结实的镐子,可以用来开凿浅层矿井'},
        cost: {
            copper(){return n(10)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '提升采集石头的获取(<mul>×</mul>1.5)',
            '每个采石场提升采石工的效率(+0.05)',
        ],
        onBuy(){
        },
        preliminary(){return ['pickaxeWorkshop', 'ceramicMoldWorkshop']},
    },
    copperHoeWorkshop: { //青铜锄
        name(){return '青铜锄'},
        cost: {
            copper(){return n(30)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'farm'},
                side(){return ['gain', 'food', 'add']},
                formula(){return 'add'},
                value(){return n(0.05)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'farm'},
                side(){return ['capped', 'food', 'add']},
                formula(){return 'add'},
                value(){return n(10)},
            },
        ],
        unlockedDisplay: [
        ],
        onBuy(){
        },
        preliminary(){return ['hoeWorkshop', 'ceramicMoldWorkshop']},
    },
    copperShovelWorkshop: { //青铜铲
        name(){return '青铜铲'},
        cost: {
            copper(){return n(30)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '提升采集黏土的获取(<mul>×</mul>1.5)',
        ],
        onBuy(){
        },
        preliminary(){return ['shovelWorkshop', 'ceramicMoldWorkshop']},
    },
    copperSawWorkshop: { //青铜锯
        name(){return '青铜锯'},
        cost: {
            copper(){return n(20)},
        },
        effect: [
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftPlank'},
                formula(){return 'mul'},
                value(){return n(0.25)},
            },
        ],
        unlockedDisplay: [
            '降低制造木板的消耗(<mul>÷</mul>4)',
        ],
        onBuy(){
        },
        preliminary(){return ['ceramicMoldWorkshop', 'toolWorkshop']},
    },
    copperChiselWorkshop: { //青铜凿
        name(){return '青铜凿'},
        cost: {
            copper(){return n(20)},
        },
        effect: [
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'craftBrick'},
                formula(){return 'mul'},
                value(){return n(0.25)},
            },
        ],
        unlockedDisplay: [
            '降低制造石砖的消耗(<mul>÷</mul>4)',
        ],
        onBuy(){
        },
        preliminary(){return ['ceramicMoldWorkshop', 'toolWorkshop']},
    },
    copperKnifeWorkshop: { //青铜刀
        name(){return '青铜刀'},
        tooltip(){return '不仅是武器,同样也是用于剥皮的一把好工具'},
        cost: {
            power(){return n(5000)},
            copper(){return n(60)},
        },
        effect: [
            {
                type(){return 'gain'},
                resource(){return 'power'},
                formula(){return 'mul'},
                value(){return n(1.1)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'hunter'},
                side(){return ['gain', 'fur', 'add']},
                formula(){return 'add'},
                value(){return n(0.035).mul(getEfficient('happiness'))},
            },
        ],
        preliminary(){return ['ceramicMoldWorkshop', 'hunterWorkshop']},
    },
    copperReinforcementWorkshop: { //铜材加固
        name(){return '铜材加固'},
        cost: {
            manuscript(){return n(5)},
            copper(){return n(100)},
            ceramic(){return n(75)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'storehouse'},
                side(){return ['capped', 'food', 'add']},
                formula(){return 'add'},
                value(){return n(30)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'storehouse'},
                side(){return ['capped', 'wood', 'add']},
                formula(){return 'add'},
                value(){return n(30)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'storehouse'},
                side(){return ['capped', 'stone', 'add']},
                formula(){return 'add'},
                value(){return n(30)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'storehouse'},
                side(){return ['capped', 'copper', 'add']},
                formula(){return 'add'},
                value(){return n(5)},
            },
        ],
        unlockedDisplay: [
            '轻微降低仓库的价格增长',
        ],
        onBuy(){
        },
        preliminary(){return ['brickReinforcementWorkshop', 'ceramicMoldWorkshop']},
    },
    currencyDryWorkshop: { //货币
        name(){return '货币'},
        tooltip(){return '现在你有了更有价值的奢侈品,你决定发型一种货币系统用于促进市场交易'},
        cost: {
            gold(){return n(2)}
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
                type(){return 'special'},
                side(){return 'stability'},
                formula(){return 'add'},
                name(){return '稳定'},
                display(){return ['+','%']},
                value(){return n(5)},
            },
        ],
        unlockedDisplay: [
        ],
        preliminary(){return ['marketWorkshop']},
        unlocked(){return getResourceUnlocked('gold')},
    },
    taxDryWorkshop: { //税收
        name(){return '税收'},
        tooltip(){return '随着人口的增加,有些居民变得更加富有了起来,向他们征收一些税钱'},
        cost: {
            gold(){return n(50)}
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'resource'},
                submain(){return 'main'},
                target(){return 'citizens'},
                side(){return ['gain', 'gold', 'add']},
                formula(){return 'add'},
                value(){return n(0.002)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'resource'},
                submain(){return 'main'},
                target(){return 'citizens'},
                side(){return ['capped', 'gold', 'add']},
                formula(){return 'add'},
                value(){return n(20)},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'sub'},
                name(){return '幸福'},
                display(){return ['-','%']},
                value(){return n(3)},
                Class(){return 'red'}
            },
        ],
        unlockedDisplay: [
        ],
        preliminary(){return ['currencyDryWorkshop']},
    },
    shallowMineWorkshop: { //浅层矿井
        name(){return '浅层矿井'},
        tooltip(){return '在矿脉附近挖掘竖井或斜井'},
        cost: {
            stone(){return n(300)},
            plank(){return n(10)}
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁建筑: 矿井',
        ],
        onBuy(){
            player.building.mine = player.building.mine.add(1)
            componentBuilding('mine')
            CitizensFix()
        },
        preliminary(){return ['copperPickaxeWorkshop', 'beamWorkshop']},
    },
    /*s2Workshop: { //运河 次版本完善
        name(){return '运河'},
        tooltip(){return ''},
        cost: {
            disableUnlocked(){return n(67)},
        },
        effect: [
        ],
        unlockedDisplay: [
        ],
        onBuy(){
        },
        preliminary(){return ['s1Workshop', 'builderWorkshop']},
    },*/
    cityRevolutionWorkshop: { //城市革命
        name(){return '城市革命'},
        tooltip(){return '由于宗教的发展,人们将生产力聚集了起来,其聚集点的中心便是城市中心<br>围绕城市中心与富裕的生产力你得以建造更多建筑并加速发展'},
        cost: {
            faith(){return n(100)},
        },
        effect: [
            {
                type(){return 'craft'},
                side(){return 'cooldown'},
                target(){return 'talk'},
                formula(){return 'div'},
                value(){return n(2)},
            },
            {
                type(){return 'special'},
                side(){return 'stability'},
                formula(){return 'add'},
                name(){return '稳定'},
                display(){return ['+','%']},
                value(){return n(5)},
            },
        ],
        onBuy(){
        },
        unlocked(){return player.largeBuilding.temple.gte(1)},
    },
    warehouseWorkshop: { //货仓
        name(){return '货仓'},
        tooltip(){return '更加坚固的仓库,足以存放更多物品'},
        cost: {
            plank(){return n(20)},
            brick(){return n(10)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁建筑: 货仓',
        ],
        onBuy(){
            player.building.warehouse = player.building.warehouse.add(1)
            componentBuilding('warehouse')
        },
        preliminary(){return ['cityRevolutionWorkshop']},
    },
    libraryWorkshop: { //图书馆
        name(){return '图书馆'},
        cost: {
            ceramic(){return n(50)},
            manuscript(){return n(10)}
        },
        effect: [
        ],
        unlockedDisplay: [,
            '解锁建筑: 图书馆',
        ],
        onBuy(){
            player.building.library = player.building.library.add(1)
            componentBuilding('library')
        },
        preliminary(){return ['cityRevolutionWorkshop']},
    },
    brickHouseWorkshop: { //砖瓦房
        name(){return '砖瓦房'},
        tooltip(){return '更更加坚固的房屋'},
        cost: {
            brick(){return n(30)},
            ceramic(){return n(20)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁建筑: 砖瓦房',
        ],
        onBuy(){
            player.building.brickHouse = player.building.brickHouse.add(1)
            componentBuilding('brickHouse')
        },
        preliminary(){return ['processingWorkshop', 'cityRevolutionWorkshop']},
    },
    hymnWorkshop: { //颂歌
        name(){return '颂歌'},
        cost: {
            idea(){return n(3000)},
            faith(){return n(500)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'main'},
                submain(){return 'building'},
                target(){return 'theater'},
                side(){return ['gain', 'faith', 'addmul']},
                formula(){return 'add'},
                value(){return n(0.025)},
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'artist'},
                side(){return ['special', 'happiness', 'value']},
                formula(){return 'add'},
                value(){return n(1)},
            },
        ],
        onBuy(){
        },
        unlocked(){return player.largeBuilding.temple.gte(1)},
        preliminary(){return ['artistWorkshop']},
    },
    pigmentWorkshop: { //颜料
        name(){return '颜料'},
        tooltip(){return '颜色得名于自然,却获得了一种宗教和巫术上的重要意义'},
        cost: {
            idea(){return n(5000)},
            faith(){return n(300)},
        },
        effect: [
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'artist'},
                side(){return ['special', 'happiness', 'value']},
                formula(){return 'add'},
                value(){return n(1)},
            },
        ],
        onBuy(){
        },
        unlocked(){return player.largeBuilding.temple.gte(1)},
        preliminary(){return ['artistWorkshop']},
    },
    religiousThoughtWorkshop: { //宗教思想
        name(){return '宗教思想'},
        tooltip(){return '宗教思想的出现为人类提供了精神寄托和道德约束'},
        cost: {
            faith(){return n(1000)},
        },
        effect: [
        ],
        unlockedDisplay: [
            '解锁职业: 传教',
        ],
        onBuy(){
        },
        unlocked(){return player.largeBuilding.temple.gte(1)},
        preliminary(){return ['artistWorkshop']},
    },
    
    mathWorkshop: { //数学 保留
        name(){return '数学'},
        keep(){return true},
        tooltip(){return '人类抽象思维和逻辑推理的工具'},
        cost: {
            knowledge(){return n(100)}
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(0.5)},
            }
        ],
        unlockedDisplay: [
            '显示行动与行为基础耗时与实际耗时',
        ],
        preliminary(){return ['scholarWorkshop']},
    },
    sundialWorkshop: { //计时器 保留
        name(){return '计时器'},
        keep(){return true},
        tooltip(){return '利用日晷等器具记录并获得准确时间'},
        cost: {
            knowledge(){return n(200)}
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'efficient'},
                formula(){return 'add'},
                name(){return '效率'},
                display(){return ['+','%']},
                value(){return n(0.5)},
            }
        ],
        unlockedDisplay: [
            '在日志下方显示游戏时',
        ],
        preliminary(){return ['scholarWorkshop']},
    },
}

let WORKSHOPBOUGHT = false