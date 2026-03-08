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
                value(){return n(0.1).mul(getEfficient('happiness').max(1))},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'sub'},
                name(){return '幸福度'},
                display(){return ['-','%']},
                value(){return n(0.5)},
            },
        ],
        tooltip(){
            return `保持幸福度与食物供给可以让他们更加忠诚`
        },
        unlockAction(){
            addLog('你招揽到了第一批原住民,看起来他们和普通的人类没什么区别,你也能与他们正常交流')
            addLog('已解锁“村庄”选项卡以及其中的子页面“调配”与“研究”,位于“主页”选项卡的右侧', 'red')
            addLog('你真正的开始了游戏,左下角记录了游戏当前的版本号,右下角分别是QQ群和捐助的链接,本游戏完全免费,如果你愿意的话你也可以请我喝一杯咖啡.', 'grey')
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
        tooltip(){return '非圣人莫能为,非智者莫能先'},
        unlocked(){return player.workshop.scholarWorkshop},
    },
    power: {
        name(){return "力量"},
        color(){return 'rgb(217 0 96)'},
        gain(){return n(0)},
        capped(){return n(0)},
        tooltip(){return '力量是一种概念,它是你的部队实力的象征'},
        unlocked(){return player.workshop.hunterWorkshop},
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
            addLog('而反直觉的是,平原的缘故加上没有趁手的工具,木头的采集实际上要比石材要难')
            addLog('但起码花上一点时间还是可以找到木头的')
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
    fur: {
        name(){return "毛皮"},
        color(){return '#d57200'},
        gain(){return n(0)},
        capped(){return n(50)},
        unlocked(){return getResourceUnlocked('fur')},
        unlockAction(){
            addLog('我们花费了一些时间狩猎到了一些我从未见到过的动物,不过好在这些动物并不强大,我们从这些动物身上搜刮到了一些毛皮')
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
        tooltip(){return '制造资源<hr><joker>有人问为什么要用皮革造纸,因为我们没有获得蔡伦先生的版权</joker><hr>你一共有'+format(getCraftEfficient())+'锻造资源获取倍率'},
        color(){return '#000'},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('paper')},
    },
    manuscript: {
        name(){return "手稿"},
        tooltip(){return '制造资源<br>你一共有'+format(getCraftEfficient())+'锻造资源获取倍率<hr>每张'+getResourceColorText('manuscript')+'提供5'+getResourceColorText('knowledge')+'上限<br>此效果具有上限<br>('+format(player.resource.manuscript.min(100))+' / 100)'},
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