var MainAction = {
    wakeUp: {
        name(){return '醒来'},
        onClick(){
            player.stage.wakeUp = true
            addLog('头痛欲裂,我好像缺失了一些记忆')
            addLog('我想我应该先探索一下我所处的环境')
        },
        tooltip(){return '我在哪...<hr>- 帮助1 -<br>点击进行行动<br><grey>你可以在右侧“其他-记录”中再次查看你所见过的帮助</grey>'},
        unlocked(){return !player.stage.wakeUp},
        cooldown(){return n(2)},
    },
    explore: {
        name(){return '探索'},
        onClick(){
            if(player.stage.explore.eq(0)){
                addLog('意识逐渐清醒,随之而来的是强烈的饥饿')
                addLog('这好像是一片平原')
                addLog('四周未见活物,但好在我看见了有不少的浆果可以采集')
            }
            if(player.stage.explore.eq(1)){
                gainResource('food', n(-10))

                addLog('我用浆果解决了我的饥饿感')
                addLog('老实说我也不确定这些浆果是否有毒,不过当下的条件我也想不了那么多了,起码我现在没事,不是吗?')
                addLog('饱腹之后,我想我应该去采集一些其他资源')
            }
            if(player.stage.explore.eq(2)){
                gainResource('food', n(-20))

                addLog('很可惜,这次的探索并没有带来什么有价值的东西')
                addLog('看来附近已经没有什么新鲜的东西了,我可能需要探索到更远的地方')
                addLog('在此之前我可以先在此处安定下来并想一下我下一步的行动')
            }
            if(player.stage.explore.eq(3)){
                gainResource('food', n(-60))

                addLog('我看见了一些“人”,他们徘徊,游荡,看似毫无目的,貌似是这里的“原住民”')
                addLog('无论如何我需要人们去帮助我,如果我提供充足的食物与住所也许他们会追随我')
                addLog('我去和他们进行交谈,即使我并不能保证这一定能成功')
            }

            player.stage.explore = player.stage.explore.add(1)

            getStage()
        },
        tooltip(){
            let hint = ''
            if(player.stage.explore.eq(0)){
                hint = '<hr>- 帮助2 -<br>日志记录了一些事件<br><grey>你可以在右侧“其他-记录”中再次查看你所见过的帮助</grey>'
            }
            if(player.stage.explore.eq(1)){
                hint = '<hr>- 帮助3 -<br>你可以选择一项你想要进行的行为,随后行为将自动进行<br>但注意你同时只能进行一项行为,多次点击可以切换你想要进行的行为(亦或是什么也不干)<br>保持足够的食物可以获得速度的加成,左上角的效率对其有更加详细说明<br><grey>你可以在右侧“其他-记录”中再次查看你所见过的帮助</grey>'
            }
            if(player.stage.explore.eq(2)){
                hint = '<hr>- 帮助4 -<br>将鼠标移动到资源的名字上可以看见其详细的计算<br><grey>你可以在右侧“其他-记录”中再次查看你所见过的帮助</grey>'
            }
            if(player.stage.explore.eq(3)){
                hint = ''
            }

            let cost = ''
            if(player.stage.explore.eq(1)){
                cost = '<br>'+format(player.resource.food)+' / 10 '+getResourceColorText('food')
            }
            if(player.stage.explore.eq(2)){
                cost = '<br>'+format(player.resource.food)+' / 20 '+getResourceColorText('food')
            }
            if(player.stage.explore.eq(3)){
                cost = '<br>'+format(player.resource.food)+' / 60 '+getResourceColorText('food')
            }

            let explore = '( '+formatWhole(player.stage.explore.add(1))+' / 5 )'
            let display = player.stage.explore.eq(4) ? '暂时不需要探索了<br>' : '周边还有不少可以探索的东西<br>'
            return display+explore+cost+hint
        },
        canClick(){
            if(player.stage.explore.eq(1)){
                return player.resource.food.gte(10)
            }
            if(player.stage.explore.eq(2)){
                return player.resource.food.gte(20)
            }
            if(player.stage.explore.eq(3)){
                return player.resource.food.gte(60)
            }
            if(player.stage.explore.eq(4)){
                return false
            }
            return true
        },
        unlocked(){return player.stage.wakeUp},
        cooldown(){return n(2).mul(player.stage.explore.pow(2).add(1))},
    },

    ideaOfPlant: {
        name(){return '种植的想法'},
        tooltip(){return format(player.resource.idea)+' / 2 '+getResourceColorText('idea')+'<hr>思考如何种植<hr>允许购买建筑: 农田'},
        onClick(){
            gainResource('idea', n(-2))
            player.action.ideaOfPlant.study = true
            addLog('<darkblue>已学习: 种植的想法</darkblue>')
        },
        data: {
            study(){return false}
        },
        unlocked(){return !player.action.ideaOfPlant.study && player.stage.explore.gte(3)},
        canClick(){return player.resource.idea.gte(2)},
        cooldown(){return n(10)},
    },
    ideaOfCabin: {
        name(){return '居住的想法'},
        tooltip(){return format(player.resource.idea)+' / 10 '+getResourceColorText('idea')+'<hr>建造小屋提供住所<hr>允许购买建筑: 小屋'},
        onClick(){
            gainResource('idea', n(-10))
            player.action.ideaOfCabin.study = true
            addLog('<darkblue>已学习: 居住的想法</darkblue>')
        },
        data: {
            study(){return false}
        },
        unlocked(){return !player.action.ideaOfCabin.study && player.stage.explore.gte(4)},
        canClick(){return player.resource.idea.gte(10)},
        cooldown(){return n(10)},
    },
    ideaOfTool: {
        name(){return '工具的想法'},
        tooltip(){return format(player.resource.idea)+' / 20 '+getResourceColorText('idea')+'<hr>学习一些关键技术用于加工燧石并尝试制造工具<hr>在工坊中解锁有关工具的研究'},
        onClick(){
            gainResource('idea', n(-20))
            player.action.ideaOfTool.study = true
            addLog('<darkblue>已学习: 工具的想法</darkblue>')
        },
        data: {
            study(){return false}
        },
        unlocked(){return !player.action.ideaOfTool.study && player.stage.explore.gte(4) && getResourceUnlocked('citizens')},
        canClick(){return player.resource.idea.gte(20)},
        cooldown(){return n(20)},
    },
    /*
    ideaOfTime: {
        name(){return '时间的想法'},
        tooltip(){return format(player.resource.idea)+' / 200 '+getResourceColorText('idea')+'<hr>设法观测时间<hr>在日志下方记录游戏时'},
        onClick(){
            gainResource('idea', n(-200))
            player.action.ideaOfTime.study = true
            addLog('<darkblue>已学习: 时间的想法</darkblue>')
        },
        data: {
            study(){return false}
        },
        unlocked(){return !player.action.ideaOfTime.study && player.stage.explore.gte(3)},
        canClick(){return player.resource.idea.gte(200)},
        cooldown(){return n(10)},
    },
    ideaOfMath: {
        name(){return '数学的想法'},
        tooltip(){return format(player.resource.idea)+' / 800 '+getResourceColorText('idea')+'<hr>计算所需'},
        onClick(){
            gainResource('idea', n(-800))
            player.action.ideaOfEfficiency.study = true
            addLog('<darkblue>已学习: 效率的想法</darkblue>')
        },
        data: {
            study(){return false}
        },
        unlocked(){return !player.action.ideaOfEfficiency.study && player.stage.explore.gte(3)},
        cooldown(){return n(10)},
    },
    ideaOfEfficiency: {
        name(){return '效率的想法'},
        tooltip(){return format(player.resource.idea)+' / 2000 '+getResourceColorText('idea')+'<hr>反思行动的效率'},
        onClick(){
            gainResource('idea', n(-2000))
            player.action.ideaOfEfficiency.study = true
            addLog('<darkblue>已学习: 效率的想法</darkblue>')
        },
        data: {
            study(){return false}
        },
        unlocked(){return !player.action.ideaOfEfficiency.study && player.stage.explore.gte(3)},
        cooldown(){return n(10)},
    },*/
}

var ForecastActionTime = false