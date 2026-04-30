var MainAction = {
    wakeUp: {
        name(){return '醒来'},
        onClick(){
            player.stage.wakeUp = true
            addLog('头痛欲裂,我好像缺失了一些记忆')
            addLog('我应该先探索一下我所处的环境')
        },
        tooltip(){return '我在哪...<hr>- 帮助 -<br>点击进行行动<br><grey>你可以在标签页“其他-记录”中再次查看你所见过的帮助</grey>'},
        unlocked(){return !player.stage.wakeUp},
        cooldown(){return n(2)},
    },
    explore: {
        name(){return '探索'},
        max(){
            let max = n(3)
            if(player.workshop.mapWorkshop){
                max = max.add(1)
            }
            if(player.workshop.shipWorkshop){
                max = max.add(1)
            }
            if(player.workshop.wheelSpokeWorkshop){
                max = max.add(1)
            }
            return max
        },
        onClick(){
            if(player.stage.explore.eq(0)){
                addLog('意识逐渐清醒,随之而来的是强烈的饥饿')
                addLog('这好像是一片平原')
                addLog('我的附近有一些我从未见过的动物,但以我目前的状态靠近它们不是一个理智的行为')
                addLog('好在我的周围有一些浆果,我可以用它们来解决饥饿感')
            }
            if(player.stage.explore.eq(1)){
                addLog('解决饥饿感后我仔细观察了这片区域')
                addLog('一望无际的平原,零星也有一些树木与石块')
                addLog('不过这些资源目前对我貌似并没有什么用')
                addLog('或许我应该先安定下来')
            }
            if(player.stage.explore.eq(2)){
                addLog('我看见了一些“人”,他们徘徊,游荡,看似毫无目的,貌似是这里的“原住民”')
                addLog('无论如何我需要人们去帮助我,如果我提供充足的食物与住所也许他们会追随我')
                addLog('我需要和他们进行交谈')
            }
            if(player.stage.explore.eq(3)){
                addLog('随着探索距离的增加,我找到了一条河')
                addLog('河边不时有一些金属粒被冲到河边')
                addLog('还有一些黏土,可以烧成陶用于建筑')
            }
            if(player.stage.explore.eq(4)){
                addLog('利用交通工具,我在更远的地方发现了其他文明的存在,或许我们可以进行一些交流与贸易')
                addLog('注:当前版本“贸易”功能尚未完善,所以你无法进行贸易,但是贸易系统并不会影响残局前的平衡性,你仍然可以正常游戏直到残局', 'red')
            }
            if(player.stage.explore.eq(5)){
                addLog('在更远处我们发现了露天的金属矿床,这意味着我们可以进行煤炭与铁的采集了')
                addLog('注:已达残局', 'red')
            }

            player.stage.explore = player.stage.explore.add(1)

            getStage()
        },
        tooltip(){
            let hint = ''
            if(player.stage.explore.eq(0)){
                hint = '<hr>- 帮助 -<br>日志记录了一些事件<br><grey>你可以在标签页“其他-记录”中再次查看你所见过的帮助</grey>'
            }
            if(player.stage.explore.eq(1)){
                hint = '<hr>- 帮助 -<br>你可以选择一项你想要进行的行为,随后行为将自动进行<br>初始情况下你只能同时进行一项行为,多次点击可以切换你想要进行的行为(亦或是什么也不干)<br>保持足够的食物可以获得速度的加成,将鼠标移动到画面左上角的“效率”可以查看更加详细的说明<br><grey>你可以在标签页“其他-记录”中再次查看你所见过的帮助</grey>'
            }
            if(player.stage.explore.eq(2)){
                hint = '<hr>- 帮助 -<br>将鼠标移动到资源的名字上可以看见其详细的计算<br><grey>你可以在标签页“其他-记录”中再次查看你所见过的帮助</grey>'
            }

            let cost = ''
            if(player.stage.explore.eq(1)){
                cost = '<br>'+format(player.resource.food)+' / 1 '+getResourceColorText('food')
            }
            if(player.stage.explore.eq(2)){
                cost = '<br>'+format(player.resource.food)+' / 10 '+getResourceColorText('food')
            }
            if(player.stage.explore.eq(3)){
                cost = '<br>'+format(player.resource.food)+' / 640 '+getResourceColorText('food')
            }
            if(player.stage.explore.eq(4)){
                cost = '<br>'+format(player.resource.food)+' / 1000 '+getResourceColorText('food')
            }
            if(player.stage.explore.eq(5)){
                cost = '<br>'+format(player.resource.food)+' / 1600 '+getResourceColorText('food')
            }

            let explore = '( '+formatWhole(player.stage.explore.add(1))+' / '+formatWhole(n(this.max()).add(1))+' )'
            let display = player.stage.explore.gte(this.max()) ? '暂时不需要探索了<br>' : '周边还有不少可以探索的东西<br>'
            return player.stage.explore.gte(this.max()) ? display+explore+hint : display+explore+cost+hint
        },
        handoff(){
            if(player.stage.explore.eq(1)){
                gainResource('food', n(-1))
            }
            if(player.stage.explore.eq(2)){
                gainResource('food', n(-10))
            }
            if(player.stage.explore.eq(3)){
                gainResource('food', n(-640))
            }
            if(player.stage.explore.eq(4)){
                gainResource('food', n(-1000))
            }
            if(player.stage.explore.eq(5)){
                gainResource('food', n(-1600))
            }
        },
        canClick(){
            if(player.action.exploreClick){
                return true
            }
            if(player.stage.explore.gte(this.max())){
                return false
            }
            if(player.stage.explore.eq(1)){
                return player.resource.food.gte(1)
            }
            if(player.stage.explore.eq(2)){
                return player.resource.food.gte(10)
            }
            if(player.stage.explore.eq(3)){
                return player.resource.food.gte(640)
            }
            if(player.stage.explore.eq(4)){
                return player.resource.food.gte(1000)
            }
            if(player.stage.explore.eq(5)){
                return player.resource.food.gte(1600)
            }
            return true
        },
        unlocked(){return player.stage.wakeUp},
        cooldown(){return n(2).pow(player.stage.explore.add(1))},
    },
    hunting: {
        name(){return '打猎'},
        onClick(){
            useHunting()
        },
        tooltip(){return '消耗全部'+getResourceColorText('power')+'进行打猎,'+getResourceColorText('power')+'越高带回来的东西就越好'},
        unlocked(){return player.workshop.hunterWorkshop},
        canClick(){return player.resource.power.gt(0)},
        cooldown(){return n(1)},
    },

    ideaOfPlant: {
        name(){return '种植的想法'},
        tooltip(){return format(player.resource.idea)+' / 2 '+getResourceColorText('idea')+'<hr>思考如何种植<hr>解锁建筑: 农田'},
        onClick(){
            gainResource('idea', n(-2))
            player.action.ideaOfPlant.study = true
            addLog('<darkblue>已学习: 种植的想法</darkblue>')
        },
        data: {
            study(){return false}
        },
        unlocked(){return !player.action.ideaOfPlant.study && player.stage.explore.gte(2)},
        canClick(){return player.resource.idea.gte(2)},
        cooldown(){return n(10)},
    },
    ideaOfCabin: {
        name(){return '居住的想法'},
        tooltip(){return format(player.resource.idea)+' / 5 '+getResourceColorText('idea')+'<hr>建造小屋提供住所<hr>解锁建筑: 小屋'},
        onClick(){
            gainResource('idea', n(-5))
            player.action.ideaOfCabin.study = true
            addLog('<darkblue>已学习: 居住的想法</darkblue>')
        },
        data: {
            study(){return false}
        },
        unlocked(){return !player.action.ideaOfCabin.study && player.stage.explore.gte(3)},
        canClick(){return player.resource.idea.gte(5)},
        cooldown(){return n(10)},
    },
}

function forecastActionTime(){
    return player.workshop.mathWorkshop
}