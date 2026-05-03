function getEvent(){
    getCiviznesLeaveEvent()
    getMineEvent()
}

function getCiviznesLeaveEvent(){
    if(n(getEfficient('stability')).lt(1) && player.resource.citizens.gte(1)){
        let leave = Math.floor(Math.random() * (1 / Number(DIFF)) * 60 * 20)
        if(leave<=(Number(player.resource.citizens.root(2)))){
            let sta = Math.random()
            if(n(sta).gt(getEfficient('stability'))){
                player.resource.citizens = player.resource.citizens.sub(1)
                CitizensFix()
                addLog('一位居民离开了你','#888')
            }
        }
    }
}

function getMineEvent(){
    if(player.resource.gold.lt(getResourceCapped('gold')) && player.building.mine.gte(1) && player.citizens.metalworker.gte(1)){
        let gold = Math.floor(Math.random() * (1 / Number(DIFF)) * 1800)
        if(gold<=0){
            let amount = player.building.mine.add(1).mul(player.citizens.metalworker.add(1)).mul(n(1).add(Math.random()))
            gainResource('gold', n(amount))
            addLog('你的金属工人在矿井中发现了'+format(amount)+getResourceColorText('gold'),'#888')
        }
    }
}