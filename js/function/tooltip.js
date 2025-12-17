var TOOLTIPSEL

function loadTooltip(id,id2,onClick=`onclick='document.getElementById("tooltip").style.display="none"`,Class=``){
	return `class="`+Class+`" onmouseenter='mouseLoad("`+id+`","`+id2+`")' onmouseleave='document.getElementById("tooltip").style.display="none";window.clearInterval(TOOLTIPSEL);TOOLTIPSEL=undefined'`+onClick+`;window.clearInterval(TOOLTIPSEL);TOOLTIPSEL=undefined'`
}

function mouseLoad(id,id2){
	document.getElementById("tooltip").style.display = ''
	tooltip(id,id2)
	if(TOOLTIPSEL==undefined){
		TOOLTIPSEL = self.setInterval(function(){
			tooltip(id, id2)
		},50)
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
	}

	let amountDisplay = ` <mul>×</mul> `+formatWhole(amount)
	if(n(amount.floor()).neq(amount)){
		amountDisplay = ` <mul>×</mul> `+format(amount)
	}
	if(amount.eq(1)){
		amountDisplay = ''
	}

	let total = formatA(totalValue)
	if(totalValue.lt(0)){
		total = '<red>'+formatA(totalValue)+'</red>'
	}else if(negative){
		total = '<red>'+formatA(totalValue)+'</red>'
	}
	if(n(formatScientific(realValue, 8)).eq(n(formatScientific(totalValue, 8)))){
		total = '<u>'+formatA(totalValue)+'</u>'
		if(negative){total = '<u><red>'+formatA(totalValue)+'</red></u>'}
		if(totalValue.lt(0)){
			total = '<u><red>'+formatA(totalValue)+'</red></u>'
			if(negative){total = '<u>'+formatA(totalValue)+'</u>'}
		}
	}

	return `<left><span><span style="`+Class+`">
		<div style="width: 160px; display: table-cell">`+operator+` `+name+`</div>
		<div style="width: 160px; display: table-cell">`+operatorDisplay+format(base)+amountDisplay+`</div></span>`+total+`
	</span></left>`
}

function gainTooltipDisplay(effect){
	let main = effect.main
	let side = effect.side
	let target = effect.target
	let effectType = effect.effectType
	let i = effect.i
	let multiplication = true

	let operator = Object.keys(tmp[main][side][target].effect[effectType][i])[0]
	let base = n(0)
	if(side=='building'){
		base = getBuildBase(target, effectType, i, operator)
	}else if(side=='citizens'){
		base = getCitizensBase(target, effectType, i, operator)
	}else if(side=='workshop'){
		base = tmp[main][side][target].effect[effectType][i][operator].getValue()
		multiplication = false
	}
	let display = ''
	if(effectType=='gain'){
		if(operator=='add' || operator=='sub'){
			display = '/s'
		}
	}
	let color = null
	if(operator=='sub'){
		color = 'red'
	}
	let negative = false
	if(RESOURCE['main'][i]['negative']!==undefined){
		negative = RESOURCE['main'][i]['negative']()
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
			name: getResourceColorText(i), 
			firstDisplay: getOperator(operator),
			lastDisplay: display,
			value: n(base).abs(),
			amount: tmp[main][side][target].amount,
			multiplication: multiplication,
			Class: color
		})
	}
}

function adjustmentTooltipDisplay(id, i, type, side, multiplication='true'){
	let temp = tmp[type][side][id].adjustment[i]
	let target = temp['target']
	let operator = temp['formula']

	let name = tmp[temp['main']][temp['submain']][target]['name']

	let Class = temp['Class'] ?? null

	let lastEffectDisplay = ''
	if(temp['side'][0]=='gain'){
		lastEffectDisplay += getResourceColorText(temp['side'][1])

		if(temp['side'][2]=='add'){
			lastEffectDisplay += '获取'
		}
		if(temp['side'][2]=='sub'){
			lastEffectDisplay += '消耗'
		}

		if(operator=='addmul' && player.setting.effectDisplay=='default'){
			lastEffectDisplay += '乘数'
		}
	}

	return effectText({
		name: name,
		firstDisplay: getOperator(operator, 'effect'),
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
		value: temp['value'],
		amount: getAmount(type, side, id),
		multiplication: multiplication,
	})
}

let tooltipOperator = ['add', 'addmul', 'mul', 'sub', 'div']
function tooltip(id,id2){
	if(id2=='LoadTooltipResource'){
		let tool = ''
		if(RESOURCE['main'][id]['tooltip']!=undefined){
			tool = '<hr>'+RESOURCE['main'][id]['tooltip']()
		}

		let effect = ''
		for(let i in RESOURCE['main'][id]['effect']){
			let target = RESOURCE['main'][id]['effect'][i]
			if(target['type']()=='gain' || target['type']()=='capped'){
				let type = ''
				let operator = target['formula']()
				let name = ''
				let Class = null
				if(target['type']()=='capped'){
					name = '上限'
				}else{
					type = '/s'
				}
				if(operator=='sub'){
					Class = 'red'
				}
				effect += effectText({
					name: getResourceColorText(target['resource']()),
					firstDisplay: getOperator(operator),
					lastDisplay: type,
					lastEffectDisplay: name,
					value: target['value'](),
					amount: player['resource'][id],
					Class: Class,
				})
			}
			if(target['type']()=='special'){
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
		if(RESOURCE['main'][id]['gain']!==undefined){
			for(let i in tooltipOperator){
				for(let target in tmpEffect.resource.main[id].gain?.[tooltipOperator[i]]){
					let effect = tmpEffect.resource.main[id].gain[tooltipOperator[i]][target]
					totalGainValue = setOperator(totalGainValue, tooltipOperator[i], effect['value'])
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
						tooltipOperator: tooltipOperator[i]
					})
				}
			}
			gain = "<hr><a style='font-size: 14px'>资源生产</a>" + gain
			if(totalGainValue.eq(0)){
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
		if(RESOURCE['main'][id]['capped']!==undefined){
			for(let i in tooltipOperator){
				for(let target in tmpEffect.resource.main[id].capped?.[tooltipOperator[i]]){
					let effect = tmpEffect.resource.main[id].capped[tooltipOperator[i]][target]
					totalCappedValue = setOperator(totalCappedValue, tooltipOperator[i], effect['value'])
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
						tooltipOperator: tooltipOperator[i]
					})
				}
			}
			capped = "<hr><a style='font-size: 14px'>资源储存</a>" + capped
			if(totalCappedValue.eq(0)){
				capped = ''
			}
		}

		let num = ''
		let numAmount = n(0)
		if(RESOURCE['main'][id]['amount']!==undefined){
			num += "<hr><a style='font-size: 14px'>资源数量</a>"
			numAmount = numAmount.add(RESOURCE['main'][id]['amount']())
			let now = format(numAmount)
			if(numAmount.eq(getResourceBaseNumber(id))){
				now = '<u>'+format(numAmount)+'</u>'
			}
			if(numAmount.neq(0)){
				num += `<left><span>
					<div style="width: 160px; display: table-cell"><green>+</green></i> 基础</div>
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
		let time = '<hr><left>'+format(player['action'][id+'Cooldown'])+' / '+format(getActionCooldown(id))+' | '+format(n(player['action'][id+'Cooldown']).div(getActionCooldown(id)).mul(100))+'% | '+format(n(getActionCooldown(id)).div(action))+'s | (+'+format(getActionAuto(id))+'/s)</left>'
		if(isNaN(n(getActionCooldown(id)).div(action))){
			time = '<hr><left>'+format(player['action'][id+'Cooldown'])+' / '+format(getActionCooldown(id))+'</left>'
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
		let time = '<hr><left>'+format(player['craft'][id+'Cooldown'])+' / '+format(getCraftCooldown(id))+' | '+format(n(player['craft'][id+'Cooldown']).div(getCraftCooldown(id)).mul(100))+'% | '+format(n(getCraftCooldown(id)).div(craft))+'s</left>'
		if(isNaN(n(getCraftCooldown(id)).div(craft))){
			time = '<hr><left>'+format(player['craft'][id+'Cooldown'])+' / '+format(getCraftCooldown(id))+'</left>'
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
				cost += costText(getResourceColorText(i), i, res)
			}
		}
		cost += '</left>'
	
		let gain = ''
		if(tmp.main.building[id].effect?.gain!==undefined){
			for(let i in tmp.main.building[id].effect.gain){
				gain += gainTooltipDisplay({
					main: 'main',
					side: 'building',
					target: id,
					effectType: 'gain',
					i: i,
				})
			}
			if(gain!==''){
				gain = `<hr><a style='font-size: 14px'>生产</a>` + gain
			}
		}

		let capped = ''
		if(tmp.main.building[id].effect?.capped!==undefined){
			for(let i in tmp.main.building[id].effect.capped){
				capped += gainTooltipDisplay({
					main: 'main',
					side: 'building',
					target: id,
					effectType: 'capped',
					i: i,
				})
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
			for(let i in tmp.civics.citizens[id].effect.gain){
				gain += gainTooltipDisplay({
					main: 'civics',
					side: 'citizens',
					target: id,
					effectType: 'gain',
					i: i,
				})
			}
			if(gain!==''){
				gain = `<hr><a style='font-size: 14px'>生产</a>` + gain
			}
		}

		let capped = ''
		if(tmp.civics.citizens[id].effect?.capped!==undefined){
			for(let i in tmp.civics.citizens[id].effect.capped){
				capped += gainTooltipDisplay({
					main: 'civics',
					side: 'citizens',
					target: id,
					effectType: 'capped',
					i: i,
				})
			}
			if(capped!==''){
				capped = `<hr><a style='font-size: 14px'>生产</a>` + capped
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
		return getTooltipID(CIVICS['citizens'][id]['name']()+'<small>'+too+action+gain+capped+special+'</small>')
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
			for(let i in tmp.civics.workshop[id].effect.gain){
				gain += gainTooltipDisplay({
					main: 'civics',
					side: 'workshop',
					target: id,
					effectType: 'gain',
					i: i,
				})
			}
			if(gain!==''){
				gain = `<hr><a style='font-size: 14px'>生产</a>` + gain
			}
		}

		let capped = ''
		if(tmp.civics.workshop[id].effect?.capped!==undefined){
			for(let i in tmp.civics.workshop[id].effect.capped){
				capped += gainTooltipDisplay({
					main: 'civics',
					side: 'workshop',
					target: id,
					effectType: 'capped',
					i: i,
				})
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
		if(CIVICS['workshop'][id]['effect']?.['unlocked']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['unlocked']){
				unlocked += `<left><green>+</green> `+CIVICS['workshop'][id]['effect']['unlocked'][i]()+`</left>`
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
						<span>`+formatScientific(n(efficient[id][i]['effect']()),1)+`%</span>
					</span></left></red>`
				}else if(n(efficient[id][i]['effect']()).gt(0)){
					too += `<left><span>
						<span style="width: 100px; display: table-cell"><green>+</green> `+efficient[id][i]['name']()+`:</span>
						<span>`+formatScientific(n(efficient[id][i]['effect']()),1)+`%</span>
					</span></left>`
				}
			}
		}
		return getTooltipID(name+'<hr><small>'+too+'<left><li-hid>-> 总计: '+formatScientific(n(getEfficient(id)).mul(100),1)+'%</left></small>')
	}
}