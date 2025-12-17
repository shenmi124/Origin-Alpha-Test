function citizensAllocate(type,allocate){
    let canAllocate = true
    for(let i in CIVICS['citizens'][type]['allocated']){
        if(n(getUnemployedJobs(i)).sub(n(CIVICS['citizens'][type]['allocated'][i]()).mul(allocate)).lt(0)){
            canAllocate = false
        }
    }
    if(canAllocate){
        player['citizens'][type] = player['citizens'][type].add(allocate).max(0)
        if(CIVICS['citizens'][type]['active']!==undefined){
            CIVICS['citizens'][type]['active']()
        }
    }else{
        addLog('*无人任职','#888')
    }
    CitizensFix()
    intervalID()
}

function getUnemployedJobs(job){
    let num = n(CIVICS['jobs'][job]['amount']())
    for(let i in CIVICS['citizens']){
        if(CIVICS['citizens'][i]['allocated']!==undefined){
            if(CIVICS['citizens'][i]['allocated'][job]!==undefined){
                num = num.sub(n(player['citizens'][i]).mul(CIVICS['citizens'][i]['allocated'][job]()))
            }
        }
    }
    return num
}

function switchWorkshopBought(){
    WORKSHOPBOUGHT = !WORKSHOPBOUGHT
	for(let i in CIVICS['workshop']){
		let unlocked = true
		let bought = !player['workshop'][i]
		if(CIVICS['workshop'][i]['unlocked']!==undefined){
			unlocked = CIVICS['workshop'][i]['unlocked']()
		}
		if(WORKSHOPBOUGHT){
			bought = !bought
		}
		unlockedLoad(i+'LoadWorkshop', unlocked && bought)
	}
}

function getNetwork(){
    let networkNodes = []
    let networkEdges = []

    for(let i in CIVICS['workshop']){
        let color = '#000'
        if(CIVICS['workshop'][i]['keep']!==undefined){
            if(CIVICS['workshop'][i]['keep']()){
                color = 'rgb(186, 0, 192)'
            }
        }
        networkNodes.push({id: i, label: CIVICS['workshop'][i]['name'](), color: {border: color}})

        if(CIVICS['workshop'][i]['preliminary']!==undefined){
            for(let ip in CIVICS['workshop'][i]['preliminary']()){
                networkEdges.push({from: CIVICS['workshop'][i]['preliminary']()[ip], to: i})
            }
        }
    }

    var nodes = new vis.DataSet(networkNodes)
    var edges = new vis.DataSet(networkEdges)

    var container = document.getElementById("network");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {
        nodes: {
            shape: 'dot',
            size: 10,
            color: {
                border: '#000',
                background: '#fff',
                highlight: {
                    border: '#000',
                    background: '#fff',
                }
            },
            mass: 2,
        },
        edges:{
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.8,
                },
            },
        },
    }
    var network = new vis.Network(container, data, options);
}

function Upgrade(id){
    if(!WORKSHOPBOUGHT){
        let canbuy = true
        let logs = '缺少资源'
        for(i in CIVICS['workshop'][id]['cost']){
            let res = n(CIVICS['workshop'][id]['cost'][i]())
            if(n(player['resource'][i]).lt(res)){
                let name = getResourceColorText(i)
                canbuy = false
                if(RESOURCE['main'][i]['unlocked']!==undefined){
                    if(!RESOURCE['main'][i]['unlocked']()){
                        name = '<gery>???</gery>'
                    }
                }
                logs += '<br><li-hid>'+format(n(res).sub(player['resource'][i]))+name
            }
        }
        if(canbuy){
            for(i in CIVICS['workshop'][id]['cost']){
                let res = n(CIVICS['workshop'][id]['cost'][i]())
                player['resource'][i] = player['resource'][i].sub(res)
            }
            player['workshop'][id] = true
            if(CIVICS['workshop'][id]['onBuy']!==undefined){
                CIVICS['workshop'][id]['onBuy']()
            }
        }else{
            addLog(logs, '#888')
        }
    }else{
        addLog('已购买', '#888')
    }
    intervalID()
    componentWorkshop(id)
}

function getCitizensBase(citizen, type, res, operator){
    if(tmp.civics.citizens[citizen].effect[type][res][operator]==undefined){
        return n(0)
    }
    if(operator=='add'){
        return tmp.civics.citizens[citizen].effect[type][res][operator].getValue()
    }else if(operator=='sub'){
        return tmp.civics.citizens[citizen].effect[type][res][operator].getValue().neg()
    }
}

function getCitizensActionBase(citizen, type, effect, action, operator){
    if(tmp.civics.citizens[citizen].effect[type][effect][action][operator]==undefined){
        return n(0)
    }
    if(operator=='add'){
        return tmp.civics.citizens[citizen].effect[type][effect][action][operator].getValue()
    }else if(operator=='sub'){
        return tmp.civics.citizens[citizen].effect[type][effect][action][operator].getValue().neg()
    }
}