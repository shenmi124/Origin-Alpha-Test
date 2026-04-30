function nc(Decimal){
    return n(Decimal).mul(getEfficient('happiness'))
}

function getResourceUnlocked(res){
    return player['resource'][res].gt(0) || player['resource'][res+'Unlocked']
}

function getCitizensspecialEffect(citizens, effect){
    return n(tmp.civics.citizens[citizens].special[effect].value).mul(tmp.civics.citizens[citizens].amount)
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
		operator = '+'
		if(display=='effect' && player.setting.effectDisplay=='short'){
		    operator = '+<mul>×</mul>'
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
	}else if(operator=='addmul'){
		base = base.mul(n(value).add(1))
    }else if(operator=='mul'){
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
    return n(add()).mul(addmul()).mul(mul()).div(div()).sub(sub())
}

function nameCorrection(type, old, name){
    if(type=='building'){
        getByID(old+'BuildingButtonID', name)
    }
    if(type=='citiznes'){
        getByID(old+'CitizensNameID', name)
    }
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
	return "<a style='color:"+color+"' class='"+Class+"'>"+Text+"</a>"
}

function getResourceText(id, find=false){
    if(find){
        return getResourceColorText(id)
    }
    if(RESOURCE['main'][id]['unlocked']!==undefined){
        if(!RESOURCE['main'][id]['unlocked']()){
            return '<gery>???</gery>'
        }
    }
	return getResourceColorText(id)
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

function getCraftName(id){
    return MAIN['craft'][id]['name']()
}

function getUpdateContent(lastContent=null){
	let resourceAmount = -3
	for(let i in RESOURCE['main']){
		if(RESOURCE['main'][i]['type']==undefined){
			resourceAmount++
			continue
		}
		if(RESOURCE['main'][i]['type']!=='node'){
			continue
		}
	}

    console.log('资源种类:', resourceAmount)
    console.log('行动种类:', Object.keys(MAIN['action']).length)
    console.log('行为种类:', Object.keys(MAIN['craft']).length)
    console.log('建筑种类:', Object.keys(MAIN['building']).length)
    console.log('大型建筑种类:', Object.keys(MAIN['largeBuilding']).length)
    console.log('职业种类:', Object.keys(CIVICS['citizens']).length)
    console.log('研究种类:', Object.keys(CIVICS['workshop']).length)

	if(lastContent!==null){
		console.log('新增了'+(resourceAmount - lastContent[0])+'种资源')
		console.log('新增了'+(Object.keys(MAIN['action']).length - lastContent[1])+'种行动')
		console.log('新增了'+(Object.keys(MAIN['craft']).length - lastContent[2])+'种行为')
		console.log('新增了'+(Object.keys(MAIN['building']).length - lastContent[3])+'种建筑')
		console.log('新增了'+(Object.keys(MAIN['largeBuilding']).length - lastContent[4])+'种大型建筑')
		console.log('新增了'+(Object.keys(CIVICS['citizens']).length - lastContent[5])+'种职业')
		console.log('新增了'+(Object.keys(CIVICS['workshop']).length - lastContent[6])+'种研究')
	}

	return [
		resourceAmount,
		Object.keys(MAIN['action']).length,
		Object.keys(MAIN['craft']).length,
		Object.keys(MAIN['building']).length,
		Object.keys(MAIN['largeBuilding']).length,
		Object.keys(CIVICS['citizens']).length,
		Object.keys(CIVICS['workshop']).length,
	]
}
