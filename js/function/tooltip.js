var TOOLTIPSEL

function loadTooltip(id, id2, onClick=`onclick='document.getElementById("tooltip").style.display="none"`, Class=``, id3='normal'){
	return `class="`+Class+`" onmouseenter='mouseLoad("`+id+`","`+id2+`","`+id3+`")' onmouseleave='document.getElementById("tooltip").style.display="none";window.clearInterval(TOOLTIPSEL);TOOLTIPSEL=undefined'`+onClick+`;window.clearInterval(TOOLTIPSEL);TOOLTIPSEL=undefined'`
}

function mouseLoad(id, id2, id3){
	document.getElementById("tooltip").style.display = ''
	tooltip(id, id2, id3)
	if(TOOLTIPSEL==undefined){
		TOOLTIPSEL = self.setInterval(function(){
			tooltip(id, id2, id3)
		},50)
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

	if(value.eq(0)){
		return ''
	}

    let unique = ``
    let beginClass = ``
    let endClass = ``
    if(multiplication){
        unique = `<grey><li-hid>( `+firstDisplay+format(value)+lastDisplay+` )</grey>`
    }else{
        amount = n(1)
    }
    if(Class!==null){
        beginClass = `<`+Class+`>`
        endClass = `</`+Class+`>`
    }
    let total = n(0)
    if(operator=='add' || operator=='sub'){
        total = n(value).mul(amount)
    }else if(operator=='addmul'){
        total = n(value).mul(amount)
    }else if(operator=='mul'){
        total = n(value).pow(amount)
    }
    return `<left><span>
                <div style="width: 80px; display: table-cell">`+name+`</div>
                <div style="width: 149px; display: table-cell">`+beginClass+firstEffectDisplay+firstDisplay+format(total)+lastDisplay+lastEffectDisplay+endClass+`</div>
                `+unique+`
            </span></left>`
}

function costText(name, res, cost, type){
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
        <span style="width: 80px; display: table-cell; color: rgb(31, 70, 71);">
                <div style="color: `+((n(getResourceCapped(res)).gte(cost) || RESOURCE['main'][res]['capped']==undefined) ? `` : `red` )+`">`+format(cost)+`</div>
        </span>
	</span>`+time+`<br>`
}

function getTitleName(type, side){
	if(type=='resource' && side=='main'){
		return '资源'
	}else if(type=='main' && side=='building'){
		return '建筑'
	}else if(type=='main' && side=='largeBuilding'){
		return '大型建筑'
	}else if(type=='civics' && side=='citizens'){
		return '居民'
	}else if(type=='civics' && side=='workshop'){
		return '工坊'
	}
}

function resourceTooltipDisplay(effect){
	let id = effect.id
	let realValue = effect.realValue
	let type = effect.type
	let side = effect.side
	let target = effect.target
	let amount = effect.amount
	let base = effect.base
	let value = effect.value
	let totalValue = effect.totalValue
	let tooltipOperator = effect.tooltipOperator
	let tooltipType = effect.tooltipType

	if(value.eq(0)){return ''}

	let negative = false
	if(RESOURCE['main'][id]['negative']!==undefined){
		negative = RESOURCE['main'][id]['negative']()
	}

	let operator = '?'
	let operatorDisplay = '?'
	let Class = ''
	if(tooltipOperator=='add'){
		operator = '<green>+</green>'
		operatorDisplay = '+'
		if(negative){
			Class = 'color: red'
			operator = '<red>+</red>'
		}
	}else if(tooltipOperator=='addmul' || tooltipOperator=='mul'){
		operator = '<green><mul>×</mul></green>'
		operatorDisplay = '<mul>×</mul>'
		if(negative){
			Class = 'color: red'
			operator = '<red><mul>×</mul></red>'
		}
	}else if(tooltipOperator=='sub'){
		operator = '<red>-</red>'
		operatorDisplay = '-'
		Class = 'color: red'
		if(negative){
			operator = '<green>-</green>'
			Class = ''
		}
	}else if(tooltipOperator=='div'){
		operator = '<red><mul>÷</mul></red>'
		operatorDisplay = '<mul>÷</mul>'
		Class = 'color: red'
		if(negative){
			operator = '<green><mul>÷</mul></green>'
			Class = ''
		}
	}

	let name = getTitleName(type, side)
	name += ': '+tmp[type][side][target]['name']
	if(id==target){
		name = '初始数值'
		if(tooltipType=='gain'){
			if(RESOURCE['main'][id]['gainTooltip']!==undefined){
				name = RESOURCE['main'][id]['gainTooltip']()
			}
		}
		if(tooltipType=='capped'){
			if(RESOURCE['main'][id]['cappedTooltip']!==undefined){
				name = RESOURCE['main'][id]['cappedTooltip']()
			}
		}
	}

	let amountDisplay = ` <mul>×</mul> `+formatWhole(amount)
	let brackets = ''
	if(n(amount.floor()).neq(amount)){
		amountDisplay = ` <mul>×</mul> `+format(amount)
	}
	if(amount.eq(0)){
		return ''
	}
	if(amount.eq(1)){
		amountDisplay = ''
	}
	if(tooltipOperator=='addmul'){
		brackets = '('
		amountDisplay += ' + 1)'
	}

	let total = formatA(totalValue)
	if(totalValue.lt(0)){
		total = '<red>'+formatA(totalValue)+'</red>'
	}else if(negative){
		total = '<red>'+formatA(totalValue)+'</red>'
	}
	if(n(regularFormat(realValue, 8)).eq(n(regularFormat(totalValue, 8)))){
		totalValue = n(regularFormat(totalValue, 8))
		total = '<u>'+formatA(totalValue)+'</u>'
		if(negative){total = '<u><red>'+formatA(totalValue)+'</red></u>'}
		if(totalValue.lt(0)){
			total = '<u><red>'+formatA(totalValue)+'</red></u>'
			if(negative){total = '<u>'+formatA(totalValue)+'</u>'}
		}
	}

	return `<left><span><span style="`+Class+`">
		<div style="width: 169px; display: table-cell">`+operator+` `+name+`</div>
		<div style="width: 160px; display: table-cell">`+operatorDisplay+brackets+format(base)+amountDisplay+`</div></span>`+total+`
	</span></left>`
}

function gainTooltipDisplay(effect){
	let main = effect.main
	let side = effect.side
	let target = effect.target
	let effectType = effect.effectType
	let resource = effect.resource
	let operator = effect.operator
	let multiplication = effect.multiplication ?? true

	let base = n(0)
	if(side=='building'){
		base = getBuildBase(target, effectType, resource, operator)
	}else if(side=='largeBuilding'){
		base = getLargeBuildingBase(target, effectType, resource, operator)
	}else if(side=='citizens'){
		base = getCitizensBase(target, effectType, resource, operator)
	}else if(side=='workshop'){
		base = tmp[main][side][target].effect[effectType][resource][operator].getValue()
		multiplication = false
	}
	let display = ''
	let effectDisplay = ''
	if(effectType=='gain'){
		if(operator=='add' || operator=='sub'){
			display = '/s'
		}else if(operator=='addmul'){
			effectDisplay += '获取'
		}
	}if(operator=='addmul' && player.setting.effectDisplay=='default'){
		effectDisplay += '乘数'
	}
	let color = null
	if(operator=='sub'){
		color = 'red'
	}
	let negative = false
	if(RESOURCE['main'][resource]['negative']!==undefined){
		negative = RESOURCE['main'][resource]['negative']()
	}
	if(negative){
		if(color==null){
			color = 'red'
		}else{
			color = null
		}
	}
	if(n(base).neq(0)){
		return effectText({
			name: getResourceText(resource), 
			firstDisplay: getOperator(operator, 'effect'),
			lastDisplay: display,
			lastEffectDisplay: effectDisplay,
			value: n(base).abs(),
			amount: tmp[main][side][target].amount,
			operator: operator,
			multiplication: multiplication,
			Class: color
		})
	}else{
		return ''
	}
}

function adjustmentTooltipDisplay(id, i, type, side, multiplication='true'){
	let temp = tmp[type][side][id].adjustment[i]
	let target = temp['target']
	let operator = temp['formula']

	let name = tmp[temp['main']][temp['submain']][target]['name']

	let Class = temp['Class'] ?? null

	let firstEffectDisplay = ''
	let lastEffectDisplay = ''
	if(temp['side'][0]=='gain' || temp['side'][0]=='capped'){
		lastEffectDisplay += getResourceColorText(temp['side'][1])

		if(temp['side'][0]=='gain'){
			lastEffectDisplay += '获取'
		}else{
			lastEffectDisplay += '储存'
		}
		if(temp['side'][2]=='addmul'){
			firstEffectDisplay += '效果'
			lastEffectDisplay += '乘数'
		}
		if(temp['side'][2]=='sub'){
			lastEffectDisplay += '消耗'
		}

		if(operator=='addmul' && player.setting.effectDisplay=='default'){
			lastEffectDisplay += '乘数'
		}
	}else if(temp['side'][0]=='special'){
		lastEffectDisplay += tmp[temp['main']][temp['submain']][target]['special'][temp['side'][1]]['name']
		
		if(operator=='addmul' && player.setting.effectDisplay=='default'){
			lastEffectDisplay += '乘数'
		}
	}

	return effectText({
		name: name,
		firstDisplay: getOperator(operator, 'effect'),
		firstEffectDisplay: firstEffectDisplay,
		lastEffectDisplay: lastEffectDisplay,
		value: temp['value'],
		amount: player[side][id+'Allocation'] ?? player[side][id],
		Class: Class,
		multiplication: multiplication,
	})
}

function specialTooltipDisplay(id, i, type, side, multiplication='true'){
	let temp = tmp[type][side][id].special[i]
	return effectText({
		name: temp['name'],
		firstDisplay: temp['display'][0],
		lastDisplay: temp['display'][1],
		value: temp['value'].getValue(),
		amount: getAmount(type, side, id),
		Class: temp['Class'] ?? null,
		multiplication: multiplication,
	})
}

let tooltipOperator = ['add', 'addmul', 'mul', 'div', 'sub']
function tooltip(id, id2, id3){
	if(id2=='LoadTooltipResource'){
		let tool = ''
		if(RESOURCE['main'][id]['tooltip']!=undefined){
			tool = '<hr>'+RESOURCE['main'][id]['tooltip']()
		}

		let effect = ''
		for(let type in tmp.resource.main[id].effect){
			if(type=='gain' || type=='capped'){
				let side = tmp.resource.main[id].effect[type]
				for(let target in side){
					if(target==id){continue}
					for(let operator in side[target]){
						let display = ''
						let name = ''
						let Class = null
						if(type=='capped'){
							name = '上限'
						}else{
							display = '/s'
						}
						if(operator=='sub'){
							Class = 'red'
						}
						effect += effectText({
							name: getResourceColorText(target),
							firstDisplay: getOperator(operator),
							lastDisplay: display,
							lastEffectDisplay: name,
							value: side[target][operator].getValue(),
							amount: tmp.resource.main[id].amount,
							Class: Class,
						})
					}
				}
			}
			if(type=='special'){
				for(let i in tmp.resource.main[id].special){
					effect += specialTooltipDisplay(id, i, 'resource', 'main')
				}
			}
		}
		if(effect!==''){
			effect = `<hr><a style='font-size: 14px'>影响</a>` + effect
		}

		let gain = ''
		let time = ''
		let totalGainValue = n(0)
		let gainValue = true
		if(RESOURCE['main'][id]['gain']!==undefined){
			for(let i in tooltipOperator){
				for(let target in tmpEffect.resource.main[id].gain?.[tooltipOperator[i]]){
					let effect = tmpEffect.resource.main[id].gain[tooltipOperator[i]][target]
					totalGainValue = setOperator(totalGainValue, tooltipOperator[i], effect['value'])
					if(totalGainValue.neq(0)){gainValue = false}
					gain += resourceTooltipDisplay({
						id: id,
						realValue: getResourceGain(id),
						type: effect['type'],
						side: effect['side'],
						target: effect['target'],
						amount: effect['amount'],
						base: effect['base'],
						value: effect['value'],
						totalValue: totalGainValue,
						tooltipOperator: tooltipOperator[i],
						tooltipType: 'gain',
					})
				}
			}
			gain = "<hr><a style='font-size: 14px'>资源生产</a>" + gain
			if(gainValue){
				gain = ''
			}
			if(RESOURCE['main'][id]['capped']!==undefined){
				if(player['resource'][id].gte(getResourceCapped(id))){
					time = '<hr>已抵达上限'
				}else if(RESOURCE['main'][id]['gain']!==undefined){
					if(n(getResourceGain(id)).gt(0)){
						time = '<hr>'+formatTime(n(getResourceCapped(id)).sub(player['resource'][id]).div(getResourceGain(id)))+'后抵达上限'
					}else if(n(getResourceGain(id)).lt(0) && !player['resource'][id].eq(0)){
						time = '<hr>'+formatTime(player['resource'][id].div(getResourceGain(id)).abs())+'后耗尽'
					}
				}
			}else if(RESOURCE['main'][id]['gain']!==undefined){
				if(n(getResourceGain(id)).lt(0) && !player['resource'][id].eq(0)){
					time = '<hr>'+formatTime(player['resource'][id].div(getResourceGain(id)).abs())+'后耗尽'
				}
			}
		}

		let capped = ''
		let totalCappedValue = n(0)
		let cappedValue = true
		if(RESOURCE['main'][id]['capped']!==undefined){
			for(let i in tooltipOperator){
				for(let target in tmpEffect.resource.main[id].capped?.[tooltipOperator[i]]){
					let effect = tmpEffect.resource.main[id].capped[tooltipOperator[i]][target]
					totalCappedValue = setOperator(totalCappedValue, tooltipOperator[i], effect['value'])
					if(totalCappedValue.neq(0)){cappedValue = false}
					capped += resourceTooltipDisplay({
						id: id,
						realValue: getResourceCapped(id),
						type: effect['type'],
						side: effect['side'],
						target: effect['target'],
						amount: effect['amount'],
						base: effect['base'],
						value: effect['value'],
						totalValue: totalCappedValue,
						tooltipOperator: tooltipOperator[i],
						tooltipType: 'capped',
					})
				}
			}
			capped = "<hr><a style='font-size: 14px'>资源储存</a>" + capped
			if(cappedValue){
				capped = ''
			}
		}

		let num = ''
		let numAmount = n(0)
		if(RESOURCE['main'][id]['amount']!==undefined){
			num += "<hr><a style='font-size: 14px'>资源数量</a>"
			numAmount = numAmount.add(RESOURCE['main'][id]['amount']())
			let now = format(numAmount)
			now = '<u>'+format(numAmount)+'</u>'
			if(numAmount.neq(0)){
				num += `<left><span>
					<div style="width: 169px; display: table-cell"><green>+</green></i> 基础</div>
					<div style="width: 160px; display: table-cell">+`+format(RESOURCE['main'][id]['amount']())+`</div>`+now+`
				</span></left>`
			}
			if(numAmount.eq(0)){
				num = ''
			}
		}
		return getTooltipID(getResourceColorText(id)+"<small>"+tool+effect+gain+capped+num+time+'</small>')
	}

	if(id2=='LoadTooltipAction'){
		let name = '未命名'
		if(MAIN['action'][id]['name']!=undefined){
			name = MAIN['action'][id]['name']()
		}
		let action = getActionAuto(id)
		if(hasActionClick(id)){
			let base = n(1)
			if(MAIN['action'][id]['player']!==undefined){
				base = MAIN['action'][id]['player']()
			}
			action = action.add(n(base).mul(getEfficient('action')))
		}
		let time = '<hr><left>'+format(player['action'][id+'Cooldown'])+' / '+format(getActionCooldown(id))+' | '+format(n(player['action'][id+'Cooldown']).div(getActionCooldown(id)).mul(100))+'% | '+format(n(getActionCooldown(id)).div(action))+'s | (+'+format(action)+'/s)</left>'
		if(isNaN(n(getActionCooldown(id)).div(action))){
			time = '<hr><left>'+format(player['action'][id+'Cooldown'])+' / '+format(getActionCooldown(id))+'</left>'
		}
		if(!forecastActionTime()){
			time = ''
		}
		if(MAIN['action'][id]['tooltip']!=undefined){
			return getTooltipID(name+'<hr><small>'+MAIN['action'][id]['tooltip']()+time)
		}else{
			return getTooltipID('未命名')
		}
    }

	if(id2=='LoadTooltipCraft'){
		let name = '未命名'
		if(MAIN['craft'][id]['name']!=undefined){
			name = MAIN['craft'][id]['name']()
		}
		let craft = getCraftAuto(id)
		if(hasCraftClick(id)){
			let base = n(1)
			if(MAIN['craft'][id]['player']!==undefined){
				base = MAIN['craft'][id]['player']()
			}
			craft = craft.add(n(base).mul(getEfficient('action')))
		}
		let time = '<hr><left>'+format(player['craft'][id+'Cooldown'])+' / '+format(getCraftCooldown(id))+' | '+format(n(player['craft'][id+'Cooldown']).div(getCraftCooldown(id)).mul(100))+'% | '+format(n(getCraftCooldown(id)).div(craft))+'s | (+'+format(craft)+'/s)</left>'
		if(isNaN(n(getCraftCooldown(id)).div(craft))){
			time = '<hr><left>'+format(player['craft'][id+'Cooldown'])+' / '+format(getCraftCooldown(id))+'</left>'
		}
		if(!forecastActionTime()){
			time = ''
		}
		if(MAIN['craft'][id]['tooltip']!=undefined){
			return getTooltipID(name+'<hr><small>'+MAIN['craft'][id]['tooltip']()+time)
		}else{
			return getTooltipID('未命名')
		}
	}

	if(id2=='LoadTooltipBuilding'){
		let name = '未命名'
		if(MAIN['building'][id]['name']!==undefined){
			name = MAIN['building'][id]['name']()
		}

		let tool = ''
		if(MAIN['building'][id]['tooltip']!==undefined){
			tool = '<hr>'+MAIN['building'][id]['tooltip']()
		}

		let cost = `<hr><a style='font-size: 14px'>需求</a><left>`
		if(MAIN['building'][id]['cost']!==undefined){
			for(let i in MAIN['building'][id]['cost']){
				let res = getBuildCost(id, i)
				if(res.neq(0)){
					cost += costText(getResourceColorText(i), i, res)
				}
			}
		}
		cost += '</left>'
	
		let multiplication = true
		if(MAIN['building'][id]['unique']?.()){
			multiplication = false
		}
		let gain = ''
		if(tmp.main.building[id].effect?.gain!==undefined){
			for(let resource in tmp.main.building[id].effect.gain){
				for(let operator in tmp.main.building[id].effect.gain[resource]){
					gain += gainTooltipDisplay({
						main: 'main',
						side: 'building',
						target: id,
						effectType: 'gain',
						resource: resource,
						operator: operator,
						multiplication: multiplication,
					})
				}
			}
			if(gain!==''){
				gain = `<hr><a style='font-size: 14px'>生产</a>` + gain
			}
		}

		let capped = ''
		if(tmp.main.building[id].effect?.capped!==undefined){
			for(let resource in tmp.main.building[id].effect.capped){
				for(let operator in tmp.main.building[id].effect.capped[resource]){
					capped += gainTooltipDisplay({
						main: 'main',
						side: 'building',
						target: id,
						effectType: 'capped',
						resource: resource,
						operator: operator,
						multiplication: multiplication
					})
				}
			}
			if(capped!==''){
				capped = `<hr><a style='font-size: 14px'>上限</a>` + capped
			}
		}

		let adjustment = ''
		if(tmp.main.building[id].adjustment!==undefined){
			for(let i in tmp.main.building[id].adjustment){
				adjustment += adjustmentTooltipDisplay(id, i, 'main', 'building')
			}
			if(adjustment!==''){
				adjustment = `<hr><a style='font-size: 14px'>修正</a>` + adjustment
			}
		}

		let special = ''
		if(tmp.main.building[id].special!==undefined){
			for(let i in tmp.main.building[id].special){
				special += specialTooltipDisplay(id, i, 'main', 'building')
			}
			if(special!==''){
				special = `<hr><a style='font-size: 14px'>特殊</a>` + special
			}
		}

		let amount = ''
		if(MAIN['building'][id]['allocation']!==undefined){
			if(MAIN['building'][id]['allocation']()){
				amount = '<hr>('+formatWhole(player['building'][id+'Allocation'],0)+' / '+formatWhole(player['building'][id],0)+')'
			}
		}

		return getTooltipID(name+'<small>'+amount+tool+cost+gain+capped+adjustment+special+'</samll>')
	}

	if(id2=='LoadTooltipLargeBuilding'){
		let name = '未命名'
		if(MAIN['largeBuilding'][id]['name']!==undefined){
			name = MAIN['largeBuilding'][id]['name']()
		}

		let tool = ''
		if(MAIN['largeBuilding'][id]['tooltip']!==undefined){
			tool = '<hr>'+MAIN['largeBuilding'][id]['tooltip']()
		}

		let cost = `<hr><a style='font-size: 14px'>需求</a><left>`
		if(MAIN['largeBuilding'][id]['cost']!==undefined){
			for(let i in MAIN['largeBuilding'][id]['cost']){
				let res = getLargeBuildingCost(id, i)
				if(res.neq(0)){
					cost += costText(getResourceColorText(i), i, res)
				}
			}
		}
		cost += '</left>'

		let build = ``
		build += `<hr><a style='font-size: 14px'>进度</a><left>`
		if(MAIN['largeBuilding'][id]['buildingTimes']!==undefined){
			build += `<span>
				<span>
					<div style="width: 80px; display: table-cell">备材次数</div>
					<div style="width: 55px; display: table-cell">`+formatWhole(player.largeBuilding[id+'Times'])+`</div>
				</span>
				<span style="width: 30px; display: table-cell; color: rgb(31, 70, 71);"> / 
				</span>
				<span style="width: 80px; display: table-cell; color: rgb(31, 70, 71);">
						<div>`+formatWhole(MAIN['largeBuilding'][id]['buildingTimes']())+`</div>
				</span>
			</span>`
			build += `<br><span>
				<span>
					<div style="width: 80px; display: table-cell">建造进度</div>
					<div style="width: 55px; display: table-cell">`+format(player.largeBuilding[id+'Building'])+`</div>
				</span>
				<span style="width: 30px; display: table-cell; color: rgb(31, 70, 71);"> / 
				</span>
				<span style="width: 80px; display: table-cell; color: rgb(31, 70, 71);">
					<div>`+format(n(MAIN['largeBuilding'][id]['buildingDifficulty']()).mul(n(player.largeBuilding[id+'Times']).div(MAIN['largeBuilding'][id]['buildingTimes']())))+`</div>
				</span>
			</span>
			<grey>( `+format(MAIN['largeBuilding'][id]['buildingDifficulty']())+` )</grey>`
		}
		build += '</left>'

		if(id3=='cost'){
			return getTooltipID(name+'<small>'+tool+cost+build+'</samll>')
		}

		if(player.largeBuilding[id].eq(0)){
			return getTooltipID(name+'<small>'+tool+'<hr>- 建造完成后揭露效果 -'+cost+build+'</samll>')
		}
	
		let multiplication = true
		if(MAIN['largeBuilding'][id]['unique']?.()){
			multiplication = false
		}
		let gain = ''
		if(tmp.main.largeBuilding[id].effect?.gain!==undefined){
			for(let resource in tmp.main.largeBuilding[id].effect.gain){
				for(let operator in tmp.main.largeBuilding[id].effect.gain[resource]){
					gain += gainTooltipDisplay({
						main: 'main',
						side: 'largeBuilding',
						target: id,
						effectType: 'gain',
						resource: resource,
						operator: operator,
						multiplication: multiplication,
					})
				}
			}
			if(gain!==''){
				gain = `<hr><a style='font-size: 14px'>生产</a>` + gain
			}
		}

		let capped = ''
		if(tmp.main.largeBuilding[id].effect?.capped!==undefined){
			for(let resource in tmp.main.largeBuilding[id].effect.capped){
				for(let operator in tmp.main.largeBuilding[id].effect.gain[resource]){
					capped += gainTooltipDisplay({
						main: 'main',
						side: 'largeBuilding',
						target: id,
						effectType: 'capped',
						resource: resource,
						operator: operator,
						multiplication: multiplication,
					})
				}
			}
			if(capped!==''){
				capped = `<hr><a style='font-size: 14px'>上限</a>` + capped
			}
		}

		let adjustment = ''
		if(tmp.main.largeBuilding[id].adjustment!==undefined){
			for(let i in tmp.main.largeBuilding[id].adjustment){
				adjustment += adjustmentTooltipDisplay(id, i, 'main', 'largeBuilding')
			}
			if(adjustment!==''){
				adjustment = `<hr><a style='font-size: 14px'>修正</a>` + adjustment
			}
		}

		let special = ''
		if(tmp.main.largeBuilding[id].special!==undefined){
			for(let i in tmp.main.largeBuilding[id].special){
				special += specialTooltipDisplay(id, i, 'main', 'largeBuilding')
			}
			if(special!==''){
				special = `<hr><a style='font-size: 14px'>特殊</a>` + special
			}
		}

		let amount = ''
		if(MAIN['largeBuilding'][id]['allocation']!==undefined){
			if(MAIN['largeBuilding'][id]['allocation']()){
				amount = '<hr>('+formatWhole(player['largeBuilding'][id+'Allocation'],0)+' / '+formatWhole(player['largeBuilding'][id],0)+')'
			}
		}

		let unlocked = ''
		if(MAIN['largeBuilding'][id]['unlockedDisplay']!==undefined){
			for(let i in MAIN['largeBuilding'][id]['unlockedDisplay']){
				unlocked += `<left><green>+</green> `+MAIN['largeBuilding'][id]['unlockedDisplay'][i]+`</left>`
			}
			if(unlocked!==''){
				unlocked = `<hr><a style='font-size: 14px'>解锁</a>` + unlocked
			}
		}
		return getTooltipID(name+'<small>'+amount+tool+cost+gain+capped+adjustment+special+unlocked+'</samll>')
	}

	if(id2=='LoadTooltipCitizens'){
		let too = ''
		if(CIVICS['citizens'][id]['tooltip']!==undefined){
			too += '<hr>'+CIVICS['citizens'][id]['tooltip']()
		}
		
		let action = ''
		for(let act of ['action', 'craft']){
			if(tmp.civics.citizens[id].effect?.[act]!==undefined){
				for(let it in tmp.civics.citizens[id].effect?.[act]){
					if(it=='auto'){
						for(let ia in tmp.civics.citizens[id].effect?.[act].auto){
							let operator = Object.keys(tmp.civics.citizens[id].effect[act].auto[ia])[0]
							action += effectText({
								name: MAIN[act][ia]['name'](),
								firstDisplay: getOperator(operator),
								lastDisplay: getOperator(operator)=='add' ? '/s' : '',
								firstEffectDisplay: '进度',
								value: getCitizensActionBase(id, act, it, ia, operator),
								amount: player['citizens'][id],
							})
						}
					}
				}
			}
		}
		if(action!==''){
			action = `<hr><a style='font-size: 14px'>行动</a>` + action
		}
		
		let gain = ''
		if(tmp.civics.citizens[id].effect?.gain!==undefined){
			for(let resource in tmp.civics.citizens[id].effect.gain){
				for(let operator in tmp.civics.citizens[id].effect.gain[resource]){
					gain += gainTooltipDisplay({
						main: 'civics',
						side: 'citizens',
						target: id,
						effectType: 'gain',
						resource: resource,
						operator: operator,
					})
				}
			}
			if(gain!==''){
				gain = `<hr><a style='font-size: 14px'>生产</a>` + gain
			}
		}

		let capped = ''
		if(tmp.civics.citizens[id].effect?.capped!==undefined){
			for(let resource in tmp.civics.citizens[id].effect.capped){
				for(let operator in tmp.civics.citizens[id].effect.capped[resource]){
					capped += gainTooltipDisplay({
						main: 'civics',
						side: 'citizens',
						target: id,
						effectType: 'capped',
						resource: resource,
						operator: operator,
					})
				}
			}
			if(capped!==''){
				capped = `<hr><a style='font-size: 14px'>上限</a>` + capped
			}
		}

		let adjustment = ''
		if(tmp.civics.citizens[id].adjustment!==undefined){
			for(let i in tmp.civics.citizens[id].adjustment){
				adjustment += adjustmentTooltipDisplay(id, i, 'civics', 'citizens')
			}
			if(adjustment!==''){
				adjustment = `<hr><a style='font-size: 14px'>修正</a>` + adjustment
			}
		}

		let special = ''
		if(tmp.civics.citizens[id].special!==undefined){
			for(let i in tmp.civics.citizens[id].special){
				special += specialTooltipDisplay(id, i, 'civics', 'citizens')
			}
			if(special!==''){
				special = `<hr><a style='font-size: 14px'>特殊</a>` + special
			}
		}

		return getTooltipID(CIVICS['citizens'][id]['name']()+'<small>'+too+action+gain+capped+special+adjustment+'</small>')
	}

	if(id2=='LoadTooltipCitizenJobs'){
		let too = ''
		if(CIVICS['jobs'][id]['tooltip']!==undefined){
			too += '<hr>'+CIVICS['jobs'][id]['tooltip']()
		}
		return getTooltipID(CIVICS['jobs'][id]['name']()+'<small>'+too+'</small>')
	}

	if(id2=='LoadTooltipWorkshop'){
		let too = ''
		if(CIVICS['workshop'][id]['tooltip']!==undefined){
			too = '<hr>'+CIVICS['workshop'][id]['tooltip']()
		}

		let keep = ''
		if(CIVICS['workshop'][id]['keep']!==undefined){
			if(CIVICS['workshop'][id]['keep']()){
				keep = '<righttip>文化遗传</righttip>'
			}
		}

		let cost = `<hr><a style='font-size: 14px'>需求</a><left>`
		if(CIVICS['workshop'][id]['cost']!==undefined){
			for(let i in CIVICS['workshop'][id]['cost']){
				cost += costText(getResourceColorText(i), i, CIVICS['workshop'][id]['cost'][i](), 'workshop')
			}
		}

		let gain = ''
		if(tmp.civics.workshop[id].effect?.gain!==undefined){
			for(let resource in tmp.civics.workshop[id].effect.gain){
				for(let operator in tmp.civics.workshop[id].effect.gain[resource]){
					gain += gainTooltipDisplay({
						main: 'civics',
						side: 'workshop',
						target: id,
						effectType: 'gain',
						resource: resource,
						operator: operator,
					})
				}
			}
			if(gain!==''){
				gain = `<hr><a style='font-size: 14px'>生产</a>` + gain
			}
		}

		let capped = ''
		if(tmp.civics.workshop[id].effect?.capped!==undefined){
			for(let resource in tmp.civics.workshop[id].effect.capped){
				for(let operator in tmp.civics.workshop[id].effect.capped[resource]){
					capped += gainTooltipDisplay({
						main: 'civics',
						side: 'workshop',
						target: id,
						effectType: 'capped',
						resource: resource,
						operator: operator,
					})
				}
			}
			if(capped!==''){
				capped = `<hr><a style='font-size: 14px'>上限</a>` + capped
			}
		}

		let action = ''
		for(let act of ['action', 'craft']){
			if(tmp.civics.workshop[id].effect?.[act]!==undefined){
				for(let it in tmp.civics.workshop[id].effect?.[act]){
					if(it=='auto'){
						for(let ia in tmp.civics.workshop[id].effect?.[act].auto){
							let operator = Object.keys(tmp.civics.workshop[id].effect[act].auto[ia])[0]
							action += effectText({
								name: MAIN[act][ia]['name'](),
								firstDisplay: getOperator(operator),
								lastDisplay: getOperator(operator)=='add' ? '/s' : '',
								multiplication: false,
								firstEffectDisplay: getOperator(operator)=='add' ? '进度' : '速度',
								value: tmp.civics.workshop[id].effect[act].auto[ia][operator].getValue(),
								amount: player['workshop'][id],
							})
						}
					}else if(it=='cooldown'){
						for(let ia in tmp.civics.workshop[id].effect?.[act].cooldown){
							let operator = Object.keys(tmp.civics.workshop[id].effect[act].cooldown[ia])[0]
							action += effectText({
								name: MAIN[act][ia]['name'](),
								firstDisplay: getOperator(operator),
								lastDisplay: '',
								multiplication: false,
								firstEffectDisplay: '冷却',
								value: tmp.civics.workshop[id].effect[act].cooldown[ia][operator].getValue(),
								amount: player['workshop'][id],
							})
						}
					}
				}
			}
		}
		if(action!==''){
			action = `<hr><a style='font-size: 14px'>行动</a>` + action
		}

		let adjustment = ''
		if(tmp.civics.workshop[id].adjustment!==undefined){
			for(let i in tmp.civics.workshop[id].adjustment){
				adjustment += adjustmentTooltipDisplay(id, i, 'civics', 'workshop', false)
			}
			if(adjustment!==''){
				adjustment = `<hr><a style='font-size: 14px'>修正</a>` + adjustment
			}
		}

		let special = ''
		if(tmp.civics.workshop[id].special!==undefined){
			for(let i in tmp.civics.workshop[id].special){
				special += specialTooltipDisplay(id, i, 'civics', 'workshop', false)
			}
			if(special!==''){
				special = `<hr><a style='font-size: 14px'>特殊</a>` + special
			}
		}

		let unlocked = ''
		if(CIVICS['workshop'][id]['unlockedDisplay']!==undefined){
			for(let i in CIVICS['workshop'][id]['unlockedDisplay']){
				unlocked += `<left><green>+</green> `+CIVICS['workshop'][id]['unlockedDisplay'][i]+`</left>`
			}
			if(unlocked!==''){
				unlocked = `<hr><a style='font-size: 14px'>解锁</a>` + unlocked
			}
		}
		cost += '</left>'
		return getTooltipID(CIVICS['workshop'][id]['name']()+keep+'<small>'+too+cost+gain+capped+action+adjustment+special+unlocked+'</samll>')
	}

	if(id2=='efficient'){
		let name = ''
		let too = ''
		for(let i in efficient[id]){
			if(i=='name'){
				name = efficient[id]['name']()
				continue
			}
			if(i=='tooltip'){
				too += efficient[id]['tooltip']()+'<hr>'
				continue
			}
			if(i=='unlocked'){
				continue
			}
			let act = true
			if(efficient[id][i]['active']!==undefined){
				act = efficient[id][i]['active']()
			}
			if(act){
				if(n(efficient[id][i]['effect']()).lt(0)){
					too += `<red><left><span>
						<span style="width: 100px; display: table-cell"><red>-</red> `+efficient[id][i]['name']()+`:</span>
						<span>`+formatScientific(n(efficient[id][i]['effect']()), 1)+`%</span>
					</span></left></red>`
				}else if(n(efficient[id][i]['effect']()).gt(0)){
					too += `<left><span>
						<span style="width: 100px; display: table-cell"><green>+</green> `+efficient[id][i]['name']()+`:</span>
						<span>`+formatScientific(n(efficient[id][i]['effect']()), 1)+`%</span>
					</span></left>`
				}
			}
		}
		return getTooltipID(name+'<hr><small>'+too+'<left><li-hid>-> 总计: '+formatScientific(n(getEfficient(id)).mul(100), 1)+'%</left></small>')
	}
}