var CivicsCitizens = {
    wastePicker: {
        name(){return '拾荒者'},
        tooltip(){return '拾荒者没有自己的专职,所以所以他们会根据效率被动的进行采集'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(getCraftEfficiency('collectFood')).mul(0.05).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(getCraftEfficiency('collectWood')).mul(0.05).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(getCraftEfficiency('collectStone')).mul(0.05).mul(getEfficient('happiness'))},
            },
        ],
    },
    farmer: {
        name(){return '农夫'},
        tooltip(){return '根据农田的基础产量生产食物<br>幸福不会降低农夫的产量'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(getBuildBase('farm', 'gain', 'food', 'add')).mul(12).mul(n(getEfficient('happiness')).max(1))},},
        ],
        unlocked(){return player.workshop.hoeWorkshop},
    },
    hunter: {
        name(){return '猎人'},
        tooltip(){return '你需要花些时间去训练猎人'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'power'},
                value(){return n(1).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'capped'},
                formula(){return 'add'},
                resource(){return 'power'},
                value(){return n(1000).mul(getEfficient('happiness'))},
            },
        ],
        unlocked(){return player.workshop.hunterWorkshop},
    },
    logger: {
        name(){return '伐木工'},
        tooltip(){return '根据伐木场的基础产量生产木材'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(getBuildBase('lumberyard', 'gain', 'wood', 'add')).mul(2).mul(getEfficient('happiness'))},
            },
        ],
        unlocked(){return player.workshop.lumberyardWorkshop},
    },
    stonecutter: {
        name(){return '采石工'},
        tooltip(){return '根据采石场的基础产量生产石材'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(getBuildBase('quarry', 'gain', 'stone', 'add')).mul(2).mul(getEfficient('happiness'))},
            },
        ],
        unlocked(){return player.workshop.quarryWorkshop},
    },
    metalworker: {
        name(){return '金属工人'},
        tooltip(){return '根据矿井的基础产量生产金属'},
        allocated: {
            unemployed(){return n(1)},
            mine(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'food'},
                value(){return n(2).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'copper'},
                value(){return n(getBuildBase('mine', 'gain', 'copper', 'add')).mul(2).mul(getEfficient('happiness'))},
            },
        ],
        unlocked(){return player.workshop.metalworkerWorkshop},
    },
    builder: {
        name(){return '建筑工'},
        tooltip(){return '这些人可以为你制造大型建筑,但遗憾的是除此之外他们什么也不会做'},
        allocated: {
            unemployed(){return n(1)}
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'food'},
                value(){return n(2.5).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'special'},
                side(){return 'buildingSpeed'},
                formula(){return 'add'},
                name(){return '建造速度'},
                display(){return ['+','/s']},
                value(){
                    let base = n(1)
                    return n(base)
                },
            },
            {
                type(){return 'adjustment'},
                main(){return 'civics'},
                submain(){return 'citizens'},
                target(){return 'builder'},
                side(){return ['special', 'buildingSpeed', 'value']},
                formula(){return 'addmul'},
                value(){return n(0.05)},
            },
        ],
        unlocked(){return player.workshop.builderWorkshop},
    },
    artist: {
        name(){return '艺术家'},
        allocated: {
            unemployed(){return n(1)},
            theater(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'idea'},
                value(){return n(3).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福'},
                display(){return ['+','%']},
                value(){
                    let base = n(2)
                    return n(base)
                },
            },
        ],
        unlocked(){return player.workshop.artistWorkshop},
    },
    scholar: {
        name(){return '学者'},
        tooltip(){return '智者虑未萌,愚者惑已成<hr>学者能散发更多思想,同时可以将思想变成思维'},
        unlocked(){return player.workshop.scholarWorkshop},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'idea'},
                value(){return n(5).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'knowledge'},
                value(){return n(0.1).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'food'},
                value(){return n(1).mul(getEfficient('happiness'))},
            },
        ],
    },
    artisan: {
        name(){return '工匠'},
        tooltip(){return '分配工匠后你可以进一步指派他们去进行锻造行为,工匠本身会提供锻造资源获取倍率'},
        allocated: {
            unemployed(){return n(1)},
            workshop(){return n(1)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'handicraft'},
                formula(){return 'add'},
                name(){return '制造资源获取'},
                display(){return ['+','%']},
                value(){return n(3)},
            }
        ],
        unlocked(){return player.workshop.artisanWorkshop},
    },
    artisanToCraftPlank: {
        name(){return '制作木板'},
        color(){return '#d90049'},
        tooltip(){return '根据制作木板的基础产量与消耗生产木板'},
        allocated: {
            artisan(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'wood'},
                value(){return n(getCraftCost('craftPlank')).mul(0.5).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'plank'},
                value(){return n(getCraftGain('craftPlank')).mul(0.5).mul(getEfficient('happiness'))},
            }
        ],
        unlocked(){return player.workshop.artisanWorkshop && getCraftUnlocked('craftPlank') && (n(getUnemployedJobs('artisan')).gte(1) || player.citizens.artisanToCraftPlank.gte(1))},
    },
    artisanToCraftBrick: {
        name(){return '制作石砖'},
        color(){return '#d90049'},
        tooltip(){return '根据制作石砖的基础产量与消耗生产石砖'},
        allocated: {
            artisan(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'stone'},
                value(){return n(getCraftCost('craftBrick')).mul(0.5).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'brick'},
                value(){return n(getCraftGain('craftBrick')).mul(0.5).mul(getEfficient('happiness'))},
            }
        ],
        unlocked(){return player.workshop.artisanWorkshop && getCraftUnlocked('craftBrick') && (n(getUnemployedJobs('artisan')).gte(1) || player.citizens.artisanToCraftBrick.gte(1))},
    },
    artisanToCraftLeather: {
        name(){return '制作皮革'},
        color(){return '#d90049'},
        tooltip(){return '根据制作皮革的基础产量与消耗生产皮革'},
        allocated: {
            artisan(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'fur'},
                value(){return n(getCraftCost('craftLeather')).mul(0.5).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'leather'},
                value(){return n(getCraftGain('craftLeather')).mul(0.5).mul(getEfficient('happiness'))},
            }
        ],
        unlocked(){return player.workshop.artisanWorkshop && getCraftUnlocked('craftLeather') && (n(getUnemployedJobs('artisan')).gte(1) || player.citizens.artisanToCraftLeather.gte(1))},
    },
    artisanToCraftPaper: {
        name(){return '制作纸'},
        color(){return '#d90049'},
        tooltip(){return '根据制作纸的基础产量与消耗生产纸'},
        allocated: {
            artisan(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'leather'},
                value(){return n(getCraftCost('craftPaper')).mul(0.5).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'paper'},
                value(){return n(getCraftGain('craftPaper')).mul(0.5).mul(getEfficient('happiness'))},
            }
        ],
        unlocked(){return player.workshop.artisanWorkshop && getCraftUnlocked('craftPaper') && (n(getUnemployedJobs('artisan')).gte(1) || player.citizens.artisanToCraftPaper.gte(1))},
    },
    artisanToCraftManuscript: {
        name(){return '制作手稿'},
        color(){return '#d90049'},
        tooltip(){return '根据制作手稿的基础产量与消耗生产手稿'},
        allocated: {
            artisan(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'paper'},
                value(){return n(getCraftCost('crafManuscript')[0]).mul(0.5).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'sub'},
                resource(){return 'knowledge'},
                value(){return n(getCraftCost('crafManuscript')[1]).mul(0.5).mul(getEfficient('happiness'))},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'manuscript'},
                value(){return n(getCraftGain('crafManuscript')).mul(0.5).mul(getEfficient('happiness'))},
            }
        ],
        unlocked(){return player.workshop.artisanWorkshop && getCraftUnlocked('crafManuscript') && (n(getUnemployedJobs('artisan')).gte(1) || player.citizens.artisanToCraftManuscript.gte(1))},
    },
    priest: {
        name(){return '牧师'},
        tooltip(){return '牧师能带来信仰<hr>信仰力量: '+format(getFaithPower())},
        unlocked(){return player.largeBuilding.temple.gte(1)},
        allocated: {
            unemployed(){return n(1)},
            temple(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'faith'},
                value(){return n(0.1).mul(getEfficient('happiness'))},
            },
        ],
    },
    priestToFaith: {
        name(){return '信仰'},
        tooltip(){return '使每信仰力量获得每秒获得0.1信仰<hr>信仰力量: '+format(getFaithPower())},
        color(){return '#d90049'},
        unlocked(){return (n(getUnemployedJobs('priest')).gte(1) || player.citizens.priestToFaith.gte(1))},
        allocated: {
            priest(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'faith'},
                value(){return n(0.1).mul(getFaithPower())},
            },
        ],
    },
    priestToPraise: {
        name(){return '颂赞'},
        tooltip(){return '使每信仰力量获得幸福提升0.5%<hr>信仰力量: '+format(getFaithPower())},
        color(){return '#d90049'},
        unlocked(){return (n(getUnemployedJobs('priest')).gte(1) || player.citizens.priestToPraise.gte(1))},
        allocated: {
            priest(){return n(1)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'happiness'},
                formula(){return 'add'},
                name(){return '幸福'},
                display(){return ['+','%']},
                value(){
                    let base = n(0.5).mul(getFaithPower())
                    return n(base)
                },
            },
        ],
    },
    priestToWorship: {
        name(){return '礼拜'},
        tooltip(){return '使每信仰力量获得稳定提升2.5%<hr>信仰力量: '+format(getFaithPower())},
        color(){return '#d90049'},
        unlocked(){return (n(getUnemployedJobs('priest')).gte(1) || player.citizens.priestToWorship.gte(1))},
        allocated: {
            priest(){return n(1)},
        },
        effect: [
            {
                type(){return 'special'},
                side(){return 'stability'},
                formula(){return 'add'},
                name(){return '稳定'},
                display(){return ['+','%']},
                value(){
                    let base = n(2.5).mul(getFaithPower())
                    return n(base)
                },
            },
        ],
    },
    priestToMission: {
        name(){return '传教'},
        tooltip(){return '使每信仰力量获得思想获取倍率提升2.5%<hr>信仰力量: '+format(getFaithPower())},
        color(){return '#d90049'},
        unlocked(){return player.workshop.religiousThoughtWorkshop && (n(getUnemployedJobs('priest')).gte(1) || player.citizens.priestToMission.gte(1))},
        allocated: {
            priest(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                resource(){return 'idea'},
                formula(){return 'addmul'},
                value(){return n(0.025).mul(getFaithPower())},
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
    mine: {
        name(){return '空闲矿井'},
        tooltip(){return '每两个矿井可以就业一名采石工'},
        amount(){return n(player.building.mine).div(2).ceil()},
    },
    theater: {
        name(){return '空闲剧院'},
        tooltip(){return '每个两个剧院需要一位艺术家'},
        amount(){return n(player.building.theater).div(2).ceil()},
    },
    workshop: {
        name(){return '空闲工坊'},
        tooltip(){return '每两个工坊可以就业一名工匠'},
        amount(){return n(player.building.workshop).div(2).ceil()},
    },
    artisan: {
        name(){return '空闲工匠'},
        tooltip(){return '分配他们自动进行锻造'},
        amount(){return n(player.citizens.artisan)},
        display(){return false}
    },
    temple: {
        name(){return '空闲神殿'},
        tooltip(){return '每个神殿能够容纳三位牧师'},
        amount(){return n(player.largeBuilding.temple).mul(3)}
    },
    priest: {
        name(){return '空闲牧师'},
        tooltip(){return '分配他们进行祈祷'},
        amount(){return n(player.citizens.priest)},
        display(){return false}
    },
}

var CitizensTip = function(){
    return formatWhole(player.resource.citizens)
}