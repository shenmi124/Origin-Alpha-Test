function nc(Decimal){
    return n(Decimal).mul(getEfficient('happiness'))
}

function getResourceUnlocked(res){
    return player['resource'][res].gt(0) || player['resource'][res+'Unlocked']
}

function getCitizensspecialEffect(citizens, effect){
    return n(tmp.civics.citizens[citizens].special[effect].value).mul(tmp.civics.citizens[citizens].amount)
}

function getTitleName(type, side){
	if(type=='resource' && side=='main'){
		return '资源'
	}else if(type=='main' && side=='building'){
		return '建筑'
	}else if(type=='civics' && side=='citizens'){
		return '居民'
	}else if(type=='civics' && side=='workshop'){
		return '工坊'
	}
}

function getAmount(type, side, id){
	if(type=='resource' && side=='main'){
		return player[type][id]
	}else if(type=='main' && side=='building'){
		return player[side][id+'Allocation'] ?? player[side][id]
	}else if(type=='civics' && side=='citizens'){
		return player[side][id+'Allocation'] ?? player[side][id]
	}else if(type=='civics' && side=='workshop'){
		return player[side][id] ? n(1) : n(0)
	}
}

function getOperator(target, display='normal'){
	let operator = '?'
	if(target=='add'){
		operator = '+'
	}else if(target=='addmul'){
		operator = '+<mul>×</mul>'
		if(display='effet' && player.setting.effectDisplay=='default'){
			operator = '+'
		}
	}else if(target=='mul'){
		operator = '<mul>×</mul>'
	}else if(target=='sub'){
		operator = '-'
	}else if(target=='div'){
		operator = '<mul>÷</mul>'
	}
	return operator
}

function setOperator(base, operator, value){
	if(operator=='add'){
		base = base.add(value)
	}else if(operator=='addmul' || operator=='mul'){
		base = base.mul(value)
	}else if(operator=='sub'){
		base = base.sub(value)
	}else if(operator=='div'){
		base = base.div(value)
	}
	return base
}

function getEffectValue(tmp, value=true){
    if(!value){
        return null
    }
    function add(){
        let value = n(0)
        if(tmp?.add==undefined){return value}
        for(let i in tmp.add){
            let base = tmp.add[i]
            value = value.add(base.value)
        }
        return value
    }
    function addmul(){
        let value = n(1)
        if(tmp?.addmul==undefined){return value}
        for(let i in tmp.addmul){
            let base = tmp.addmul[i]
            value = value.add(base.value)
        }
        return value
    }
    function mul(){
        let value = n(1)
        if(tmp?.mul==undefined){return value}
        for(let i in tmp.mul){
            let base = tmp.mul[i]
            value = value.mul(base.value)
        }
        return value
    }
    function sub(){
        let value = n(0)
        if(tmp?.sub==undefined){return value}
        for(let i in tmp.sub){
            let base = tmp.sub[i]
            value = value.add(base.value)
        }
        return value
    }
    function div(){
        let value = n(1)
        if(tmp?.div==undefined){return value}
        for(let i in tmp.div){
            let base = tmp.div[i]
            value = value.mul(base.value)
        }
        return value
    }
    return n(add()).mul(addmul()).mul(mul()).sub(sub()).div(div())
}

function nameCorrection(type, old, name){
    if(type=='building'){
        getByID(old+'BuildingButtonID', name)
    }
    if(type=='citiznes'){
        getByID(old+'CitizensNameID', name)
    }
}

function effectText(effect){
    let name = effect.name ?? ''
    let firstEffectDisplay = effect.firstEffectDisplay ?? ''
    let lastEffectDisplay = effect.lastEffectDisplay ?? ''
    let firstDisplay = effect.firstDisplay ?? ''
    let lastDisplay = effect.lastDisplay ?? ''
    let value = effect.value ?? n(0)
    let amount = effect.amount ?? n(0)
    let multiplication = effect.multiplication ?? true
    let operator = effect.operator ?? 'add'
    let Class = effect.Class ?? null

    let unique = ``
    let beginClass = ``
    let endClass = ``
    if(multiplication){
        unique = `<grey><li-hid>(`+firstDisplay+format(value)+lastDisplay+`)</grey>`
    }else{
        amount = n(1)
    }
    if(Class!==null){
        beginClass = `<`+Class+`>`
        endClass = `</`+Class+`>`
    }
    let total = n(0)
    if(operator=='add'){
        total = n(value).mul(amount)
    }else if(operator=='mul'){
        total = n(value).pow(amount)
    }
    return `<left><span>
                <div style="width: 80px; display: table-cell">`+name+`</div>
                <div style="width: 124px; display: table-cell">`+beginClass+firstEffectDisplay+firstDisplay+format(total)+lastDisplay+lastEffectDisplay+endClass+`</div>
                `+unique+`
            </span></left>`
}

function costText(name,res,cost,type){
    let time = ''
    if(player['resource'][res].lt(cost)){
        if((n(getResourceGain(res)).gt(0)) && (n(getResourceCapped(res)).gte(cost) || getResourceCapped(res)==null)){
            time = '( '+formatTime(n(cost).sub(player['resource'][res]).div(getResourceGain(res)))+' )'
        }else if(n(getResourceCapped(res)).lt(cost) && getResourceCapped(res)!==null){
            time = '<grey>( '+format(n(getResourceCapped(res)).sub(cost))+' )</grey>'
        }
    }
    if(RESOURCE['main'][res]['unlocked']!==undefined){
        if(!RESOURCE['main'][res]['unlocked']()){
            name = '<gery>???</gery>'
            time = ''
        }
    }
    if(type=="workshop" && WORKSHOPBOUGHT){
        return `<span>
            <div style="width: 80px; display: table-cell">`+name+`</div>
            <div style="width: 55px; display: table-cell; color: rgb(31, 70, 71)">`+format(cost)+`</div>
        </span><br>`
    }
    return `<span>
        <span>
            <div style="width: 80px; display: table-cell">`+name+`</div>
            <div style="width: 55px; display: table-cell; color: `+(player['resource'][res].gte(cost) ? `rgb(31, 70, 71)` : `red` )+`">`+format(player['resource'][res])+`</div>
        </span>
        <span style="width: 30px; display: table-cell; color: rgb(31, 70, 71);"> / 
        </span>
        <span style="width: 55px; display: table-cell; color: rgb(31, 70, 71);">
                <div style="color: `+((n(getResourceCapped(res)).gte(cost) || RESOURCE['main'][res]['capped']==undefined) ? `` : `red` )+`">`+format(cost)+`</div>
        </span>
	</span>`+time+`<br>`
}

function getResourceColorText(id){
	let color = '#c3c3c3'
	let Text = '未命名'
	let Class = ''
	for(let resourceColor in RESOURCE['main']){
		if(id==resourceColor){
			if(RESOURCE['main'][resourceColor]['color']!==undefined){
				color = RESOURCE['main'][resourceColor]['color']()
			}
			if(RESOURCE['main'][resourceColor]['name']!==undefined){
				Text = RESOURCE['main'][resourceColor]['name']()
			}
			if(RESOURCE['main'][resourceColor]['Class']!==undefined){
				Class = RESOURCE['main'][resourceColor]['Class']()
			}
		}
	}
	if(id=='none'){
		return ['#888',"<a style='color: #888'>未知</a>",'rgba(136, 136, 136, 0.5)']
	}
	return "<a style='color:"+color+"' class='"+Class+"'>"+Text+"</a>"
}

function colorText(id){
	let color = '#c3c3c3'
	let Text = '未命名'
	let Class = ''
	for(let resourceColor in RESOURCE['main']){
		if(id==resourceColor){
			if(RESOURCE['main'][resourceColor]['color']!==undefined){
				color = RESOURCE['main'][resourceColor]['color']()
			}
			if(RESOURCE['main'][resourceColor]['name']!==undefined){
				Text = RESOURCE['main'][resourceColor]['name']()
			}
			if(RESOURCE['main'][resourceColor]['Class']!==undefined){
				Class = RESOURCE['main'][resourceColor]['Class']()
			}
		}
	}
	if(id=='none'){
		return ['#888',"<a style='color: #888'>未知</a>",'rgba(136, 136, 136, 0.5)']
	}
	let color2 = tinycolor(color).setAlpha(.5);
	return [color,"<a style='color:"+color+"' class='"+Class+"'>"+Text+"</a>",color2]
}