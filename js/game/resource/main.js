var ResourceMain = {
    citizens: {
        name(){return "居民"},
        color(){return '#000'},
        capped(){return n(0)},
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'idea'},
                value(){return n(0.05).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'idea'},
                value(){return n(100)},
            },
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'food'},
                value(){return n(0.3).mul(getEfficient('happiness').max(1))},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'sub'},
                name(){return '幸福'},
                display(){return ['-','%']},
                value(){return n(0.5)},
            },
        ],
        tooltip(){
            return `保持幸福与食物供给可以让他们更加忠诚`
        },
        unlockAction(){
            addLog('你招揽到了第一批原住民,看起来他们和普通的人类没什么区别,你也能与他们正常交流')
            addLog('已解锁“文明”标签页以及其中的子页面“调配”与“研究”,位于“文明”标签页的右侧', 'red')
            addLog('- 帮助 -<br>在“文明-调配”中你可以将空闲的居民分配为不同的职业并获得其效果与加成,将鼠标移动到对应职业的名称上可以查看它们对应的职业信息<br>不同职业的分配需求并不一致,通常来说大部分职业至少需要一名空闲的居民,有些职业需要额外的对应的空闲岗位,对于额外的需求,会在对应的职业信息中有特殊的说明<br>同时也存在并不需要居民的职业,它们大多会有和其他职业不同的颜色以进行区分,例如<a style="color: #d90049">这个颜色</a><br><grey>你可以在标签页“其他-记录”中再次查看你所见过的帮助')
            addLog('- 帮助 -<br>在“文明-研究”中你可以花费对应研究所需要的资源以获得其加成或解锁更多内容,在此页面的“工坊”右侧有一个可以选择的复选框,启用此复选框时可以重新查看已经购买过的研究<br><grey>你可以在标签页“其他-记录”中再次查看你所见过的帮助')
            addLog('- 帮助 -<br>“幸福”与“稳定”是两种新的数值,“幸福”决定了村民的基础效率,但超过100%时村民将食用更多食物;“稳定”决定了居民离你而去的概率,当“稳定”不足100%时居民有概率在任意时刻离你而去,这个概率会随着“稳定”的降低而提升,详细的效果请将鼠标移动到对应数值的名称上以获取更多信息<br><grey>你可以在标签页“其他-记录”中再次查看你所见过的帮助')
            addLog('你真正的开始了游戏,左下角记录了游戏当前的版本号,右下角分别是QQ群和捐助的链接,本游戏完全免费,如果你愿意的话你也可以请我喝一杯咖啡', 'grey')
            addLog('另外,本游戏后台效率与前台无异,可以放心将本游戏置于后台挂机', 'grey')
        },
        unlocked(){return getResourceUnlocked('citizens')},
    },
    groupNode: {
        type(){return 'node'},
        unlocked(){return getResourceUnlocked('citizens')},
    },

    idea: {
        name(){return "思想"},
        color(){return 'rgb(186, 0, 192)'},
        gain(){return n(0)},
        capped(){return n(100)},
        cappedTooltip(){return '自身'},
        tooltip(){return '将杂乱的思路整理在一起'},
        unlockAction(){
            addLog('当我真正安静下来时,无数的想法从脑中浮现了出来')
            addLog('我确信我没有如此灵敏的大脑,我有一种感觉,我现在的思维比以往的任何时刻都要灵敏')
        },
        unlocked(){return getResourceUnlocked('idea')},
    },
    knowledge: {
        name(){return "知识"},
        color(){return 'rgb(0 143 255)'},
        gain(){return n(0)},
        capped(){return n(0)},
        unlocked(){return getResourceUnlocked('knowledge') || player.workshop.scholarWorkshop},
    },
    faith: {
        name(){return "信仰"},
        color(){return '#000'},
        gain(){return n(0)},
        capped(){return n(0)},
        tooltip(){
            let display = '人们坚信生活与财富都依赖于超自然力量,而你被认为是这种力量的代表和唯一被承认的中间人<hr>'
            let power = '信仰力量: '+format(getFaithPower())+'<hr>'
            let formula = '信仰力量公式: lg(信仰)'
            if(player.building.church.gte(1)){
                formula += '<hr>教堂加成: +'+format(player.building.church.mul(10))+'%'
            }
            return display + power + formula
        },
        unlockAction(){
            addLog('- 帮助 -<br>“牧师”可以基于“信仰力量”获取选择的加成,“信仰力量”是“信仰”的特殊数值,其值基于当前信仰值,将鼠标移动到“信仰”上可以查看其具体数值与计算公式,默认公式为lg(信仰)')
        },
        unlocked(){return getResourceUnlocked('faith')},
    },
    power: {
        name(){return "力量"},
        color(){return 'rgb(217 0 96)'},
        gain(){return n(0)},
        capped(){return n(0)},
        tooltip(){return '力量是一种概念,它是你的部队实力的象征'},
        unlocked(){return getResourceUnlocked('power') || player.workshop.hunterWorkshop},
        unlockAction(){
            addLog('- 帮助 -<br>你可以使用“力量”进行“打猎”行动,通常来说“力量”越高收益越高,并且这种加成不是线性的,也就是说消耗同等的“力量”进行“打猎”平均次数越少收益越高')
        },
    },
    ideaNode: {
        type(){return 'node'},
        unlocked(){return getResourceUnlocked('idea')},
    },

    food: {
        name(){return "食物"},
        color(){return '#cf7004'},
        capped(){return n(20)},
        gain(){return n(0)},
        gainCost(){return n(0.1)},
        gainTooltip(){return '食用'},
        tooltip(){return '所有人的基本需求'},
        unlocked(){return true},
    },
    wood: {
        name(){return "木材"},
        color(){return 'rgb(180,144,90)'},
        gain(){return n(0)},
        capped(){return n(20)},
        tooltip(){return '基础建材之一'},
        unlockAction(){
            addLog('由于工具的匮乏,目前来看木材的采集实际上要比石材更难')
        },
        unlocked(){return getResourceUnlocked('wood')},
    },
    stone: {
        name(){return "石材"},
        color(){return '#666'},
        gain(){return n(0)},
        capped(){return n(50)},
        tooltip(){return '基础建材之二<br>坚固而又富有重量,你可以储存很多这种材料'},
        unlocked(){return getResourceUnlocked('stone')},
    },
    copper: {
        name(){return "铜"},
        color(){return '#C98C4D'},
        capped(){return n(20)},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('copper')},
        unlockAction(){
            addLog('捡起铜的瞬间,无数关于铜的想法在我脑中浮现,这些想法是从哪来的呢?')
            addLog('无论如何这极大程度的加快了文明的发展,但想要让想法落实必要的研究仍然要进行')
        },
    },
    gold: {
        name(){return "金"},
        color(){return 'rgb(171 152 0)'},
        capped(){return n(100)},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('gold')},
        unlockAction(){
            addLog('极好的奢侈品,用不了多久人们就会用黄金替代粮食作为货币了')
        },
    },
    clay: {
        name(){return "黏土"},
        color(){return '#7c9e9f'},
        gain(){return n(0)},
        capped(){return n(20)},
        tooltip(){return '基础建材之三'},
        unlocked(){return getResourceUnlocked('clay') || player.stage.explore.gte(4)},
    },
    ceramic: {
        name(){return "白陶"},
        color(){return '#0070b1'},
        gain(){return n(0)},
        capped(){return n(200)},
        tooltip(){return '用于日常生活和祭祀活动'},
        tooltip(){return '将黏土烧纸成白陶,用于建筑'},
        unlockAction(){
            addLog('我用简单的陶窑烧了一些黏土,顺理成章的烧制出了一些陶瓷')
            addLog('这些陶瓷是白色的,说明这片地区的黏土铁含量极低')
        },
        unlocked(){return getResourceUnlocked('ceramic')},
    },
    fur: {
        name(){return "毛皮"},
        color(){return '#d57200'},
        gain(){return n(0)},
        capped(){return n(50)},
        unlocked(){return getResourceUnlocked('fur')},
        unlockAction(){
            addLog('一种从未出现在我的记忆中的动物身上的毛皮,这些毛皮质量极高,或许可以拿这些毛皮制成纸')
        },
    },
    ivory: {
        name(){return "象牙"},
        color(){return '#ebebeb'},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('ivory')},
    },
    resourceNode: {
        type(){return 'node'},
        unlocked(){return getResourceUnlocked('plank') || getResourceUnlocked('brick')},
    },
    
    plank: {
        name(){return "木板"},
        tooltip(){return '制造资源<br>你一共有'+format(getCraftEfficient())+'锻造资源获取倍率'},
        color(){return 'rgb(158 103 19)'},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('plank')},
    },
    brick: {
        name(){return "石砖"},
        tooltip(){return '制造资源<br>你一共有'+format(getCraftEfficient())+'锻造资源获取倍率'},
        color(){return '#68533f'},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('brick')},
    },
    leather: {
        name(){return "皮革"},
        tooltip(){return '制造资源<br>你一共有'+format(getCraftEfficient())+'锻造资源获取倍率'},
        color(){return '#763f00'},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('leather')},
    },
    paper: {
        name(){return "纸"},
        tooltip(){return '制造资源<hr>你一共有'+format(getCraftEfficient())+'锻造资源获取倍率'},
        color(){return '#000'},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('paper')},
    },
    manuscript: {
        name(){return "手稿"},
        tooltip(){return '制造资源<br>你一共有'+format(getCraftEfficient())+'锻造资源获取倍率<hr>每张'+getResourceColorText('manuscript')+'提供5'+getResourceColorText('knowledge')+'上限<br>此效果具有上限<br>( '+format(player.resource.manuscript.min(100))+' / 100 '+getResourceColorText('manuscript')+' )'},
        color(){return '#00aaff'},
        gain(){return n(0)},
        count(){return player.resource.manuscript.min(100)},
        effect: [
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'knowledge'},
                value(){return n(5)},
            },
        ],
        unlocked(){return getResourceUnlocked('manuscript')},
    },

    node: {
        type(){return 'node'},
        unlocked(){return true},
    },
    disableUnlocked: {
        name(){return "不可解锁资源"},
        color(){return '#000'},
        gain(){return n(0)},
        unlocked(){return false},
    },
    devSpeed: {
        name(){return "测试速度"},
        color(){return '#000'},
        amount(){return player.data.devSpeed},
        unlocked(){return player.data.devSpeed.neq(1)},
    },
    test: {
        name(){return "测试"},
        color(){return '#000'},
        gain(){return n(0)},
        unlocked(){return false},
    },
}