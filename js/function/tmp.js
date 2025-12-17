var tmp = {}
var tmpAjustment = {}
var tmpEffect = {}

class Values {
    constructor(dec=0){
        dec = n(dec)
        this.add = dec
        this.addmul = n(1)
        this.mul = n(1)

        Values.prototype.setAdd = function(value){
            this.add = this.add.add(value)
            return this
        }
        Values.prototype.setAddmul = function(value){
            this.addmul = this.addmul.add(value)
            return this
        }
        Values.prototype.setMul = function(value){
            this.mul = this.mul.mul(value)
            return this
        }

        Values.prototype.getValue = function(){
            return this.add.mul(this.addmul).mul(this.mul)
        }
    }
}

function v(dec){
    return new Values(dec)
}

function getAjustmentTmp(temp, it, i, main){
    main.adjustment ??= []
    main.adjustment.push({
        target: temp[it]['target'](),
        main: temp[it]['main'](),
        submain: temp[it]['submain'](),
        side: temp[it]['side'](),
        value: temp[it]['value'](),
        formula: temp[it]['formula'](),
        amount: main.amount,
        Class: temp[it]['Class']?.(),
    })

    tmpAjustment[temp[it]['main']()] ??= {}
    tmpAjustment[temp[it]['main']()][temp[it]['submain']()] ??= {}
    tmpAjustment[temp[it]['main']()][temp[it]['submain']()][temp[it]['target']()] ??= []
    let tmpSide = tmpAjustment[temp[it]['main']()][temp[it]['submain']()][temp[it]['target']()]
    tmpSide.push({
        target: temp[it]['target'](),
        main: temp[it]['main'](),
        submain: temp[it]['submain'](),
        side: temp[it]['side'](),
        value: temp[it]['value'](),
        formula: temp[it]['formula'](),
        amount: main.amount,
        Class: temp[it]['Class']?.(),
    })
}

function getSpecialTmp(temp, it, i, main){
    main.special ??= {}
    main.special[temp[it]['side']()] = {
        name: temp[it]['name']?.(),
        side: temp[it]['side'](),
        display: temp[it]['display'](),
        value: temp[it]['value'](),
    }
}

function getTmpValue(){
    tmp.resource = {}
    tmp.resource.main = {}
    for(let i in RESOURCE['main']){
        if(RESOURCE['main'][i]['type']?.()!=='node'){
            tmp.resource.main[i] = {}
            tmp.resource.main[i].amount = player.resource[i]
            tmp.resource.main[i].name = RESOURCE['main'][i]['name']?.() ?? ''

            if(RESOURCE['main'][i]['gain']!==undefined){
                tmp.resource.main[i].effect ??= {}
                tmp.resource.main[i].effect.gain ??= {}
                tmp.resource.main[i].effect.gain[i] ??= {}
                tmp.resource.main[i].effect.gain[i].add = v(RESOURCE['main'][i]['gain']())
            }
            if(RESOURCE['main'][i]['gainMul']!==undefined){
                tmp.resource.main[i].effect ??= {}
                tmp.resource.main[i].effect.gain ??= {}
                tmp.resource.main[i].effect.gain[i] ??= {}
                tmp.resource.main[i].effect.gain[i].mul = v(RESOURCE['main'][i]['gainMul']())
            }
            if(RESOURCE['main'][i]['gainCost']!==undefined){
                tmp.resource.main[i].effect ??= {}
                tmp.resource.main[i].effect.gain ??= {}
                tmp.resource.main[i].effect.gain[i] ??= {}
                tmp.resource.main[i].effect.gain[i].sub = v(RESOURCE['main'][i]['gainCost']())
            }
            if(RESOURCE['main'][i]['capped']!==undefined){
                tmp.resource.main[i].effect ??= {}
                tmp.resource.main[i].effect.capped ??= {}
                tmp.resource.main[i].effect.capped[i] ??= {}
                tmp.resource.main[i].effect.capped[i].add = v(RESOURCE['main'][i]['capped']())
            }
            if(RESOURCE['main'][i]['cappedMul']!==undefined){
                tmp.resource.main[i].effect ??= {}
                tmp.resource.main[i].effect.capped ??= {}
                tmp.resource.main[i].effect.capped[i] ??= {}
                tmp.resource.main[i].effect.capped[i].mul = v(RESOURCE['main'][i]['cappedMul']())
            }
            if(RESOURCE['main'][i]['cappedCost']!==undefined){
                tmp.resource.main[i].effect ??= {}
                tmp.resource.main[i].effect.capped ??= {}
                tmp.resource.main[i].effect.capped[i] ??= {}
                tmp.resource.main[i].effect.capped[i].sub = v(RESOURCE['main'][i]['cappedCost']())
            }
            if(RESOURCE['main'][i]['effect']!==undefined){
                tmp.resource.main[i].effect = {}

                let temp = RESOURCE['main'][i]['effect']
                for(let it in temp){
                    tmp.resource.main[i].effect[temp[it]['type']()] ??= {}

                    if(temp[it]['type']()=='gain' || temp[it]['type']()=='capped'){
                        tmp.resource.main[i].effect[temp[it]['type']()][temp[it]['resource']()] ??= {}
                        tmp.resource.main[i].effect[temp[it]['type']()][temp[it]['resource']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                    }

                    if(temp[it]['type']()=='special'){
                        getSpecialTmp(temp, it, i, tmp.resource.main[i])
                    }

                    if(temp[it]['type']()=='adjustment'){
                        getAjustmentTmp(temp, it, i, tmp.resource.main[i])
                    }
                }
            }
        }
    }

    tmp.main = {}
    tmp.main.action = {}
    for(let i in MAIN['action']){
        tmp.main.action[i] = {}
        tmp.main.action[i].name = MAIN['action'][i]['name']?.() ?? ''

        if(MAIN['action'][i]['cooldown']!==undefined){
            tmp.main.action[i].effect ??= {}
            tmp.main.action[i].effect.action ??= {}
            tmp.main.action[i].effect.action.cooldown ??= {}
            tmp.main.action[i].effect.action.cooldown[i] ??= {}
            tmp.main.action[i].effect.action.cooldown[i].add = v(MAIN['action'][i]['cooldown']())
        }
    }
    tmp.main.craft = {}
    for(let i in MAIN['craft']){
        tmp.main.craft[i] = {}
        tmp.main.craft[i].name = MAIN['craft'][i]['name']?.() ?? ''

        if(MAIN['craft'][i]['cooldown']!==undefined){
            tmp.main.craft[i].effect ??= {}
            tmp.main.craft[i].effect.craft ??= {}
            tmp.main.craft[i].effect.craft.cooldown ??= {}
            tmp.main.craft[i].effect.craft.cooldown[i] ??= {}
            tmp.main.craft[i].effect.craft.cooldown[i].add = v(MAIN['craft'][i]['cooldown']())
        }
    }
    tmp.main.building = {}
    for(let i in MAIN['building']){
        tmp.main.building[i] = {}
        tmp.main.building[i].amount = player.building[i+'Allocation'] ??= player.building[i]
        tmp.main.building[i].name = MAIN['building'][i]['name']?.() ?? ''

        if(MAIN['building'][i]['effect']!==undefined){
            tmp.main.building[i].effect = {}

            let temp = MAIN['building'][i]['effect']
            for(let it in temp){
                tmp.main.building[i].effect[temp[it]['type']()] ??= {}

                if(temp[it]['type']()=='gain' || temp[it]['type']()=='capped'){
                    tmp.main.building[i].effect[temp[it]['type']()][temp[it]['resource']()] ??= {}
                    tmp.main.building[i].effect[temp[it]['type']()][temp[it]['resource']()][temp[it]['formula']()] ??= v(n(temp[it]['value']()))
                }

                if(temp[it]['type']()=='resource'){
                    tmp.main.building[i].effect[temp[it]['type']()][temp[it]['side']()] ??= {}
                    tmp.main.building[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['resource']()] ??= {}
                    tmp.main.building[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['resource']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                }

                if(temp[it]['type']()=='citizens'){
                    tmp.main.building[i].effect[temp[it]['type']()][temp[it]['target']()] ??= {}
                    tmp.main.building[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()] ??= {}
                    tmp.main.building[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['formula']()] ??= {}
                    if(temp[it]['side']()=='effect'){
                        tmp.main.building[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['formula']()]['effect'] ??= v(temp[it]['value']())
                    }
                    if(temp[it]['type']()=='gain' || temp[it]['type']()=='capped'){
                        tmp.main.building[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['resource']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                    }
                }

                if(temp[it]['type']()=='special'){
                    getSpecialTmp(temp, it, i, tmp.main.building[i])
                }

                if(temp[it]['type']()=='adjustment'){
                    getAjustmentTmp(temp, it, i, tmp.main.building[i])
                }
            }
        }
    }

    tmp.civics = {}
    tmp.civics.citizens = {}
    for(let i in CIVICS['citizens']){
        tmp.civics.citizens[i] = {}
        tmp.civics.citizens[i].amount = player.citizens[i]
        tmp.civics.citizens[i].name = CIVICS['citizens'][i]['name']?.() ?? ''

        if(CIVICS['citizens'][i]['effect']!==undefined){
            tmp.civics.citizens[i].effect = {}

            let temp = CIVICS['citizens'][i]['effect']
            for(let it in temp){
                tmp.civics.citizens[i].effect[temp[it]['type']()] ??= {}

                if(temp[it]['type']()=='gain' || temp[it]['type']()=='capped'){
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['resource']()] ??= {}
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['resource']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                }
                
                if(temp[it]['type']()=='action' || temp[it]['type']()=='craft'){
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['side']()] ??= {}
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['target']()] ??= {}
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['target']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                }

                if(temp[it]['type']()=='resource'){
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['side']()] ??= {}
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['resource']()] ??= {}
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['resource']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                }

                if(temp[it]['type']()=='citizens'){
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['target']()] ??= {}
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()] ??= {}
                    tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['formula']()] ??= {}
                    if(temp[it]['side']()=='effect'){
                        tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['formula']()]['effect'] ??= v(temp[it]['value']())
                    }
                    if(temp[it]['side']()=='gain' || temp[it]['side']()=='capped'){
                        tmp.civics.citizens[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['formula']()][temp[it]['resource']()] ??= v(temp[it]['value']())
                    }
                }

                if(temp[it]['type']()=='special'){
                    getSpecialTmp(temp, it, i, tmp.civics.citizens[i])
                }

                if(temp[it]['type']()=='adjustment'){
                    getAjustmentTmp(temp, it, i, tmp.civics.citizens[i])
                }
            }
        }
    }
    tmp.civics.workshop = {}
    for(let i in CIVICS['workshop']){
        tmp.civics.workshop[i] = {}
        tmp.civics.workshop[i].bought = player.workshop[i]
        tmp.civics.workshop[i].amount = n(0)
        tmp.civics.workshop[i].name = CIVICS['workshop'][i]['name']?.() ?? ''
        if(player.workshop[i]){
            tmp.civics.workshop[i].amount = n(1)
        }

        if(CIVICS['workshop'][i]['effect']!==undefined){
            tmp.civics.workshop[i].effect = {}

            let temp = CIVICS['workshop'][i]['effect']
            for(let it in temp){
                tmp.civics.workshop[i].effect[temp[it]['type']()] ??= {}

                if(temp[it]['type']()=='gain' || temp[it]['type']()=='capped'){
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['resource']()] ??= {}
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['resource']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                }
                
                if(temp[it]['type']()=='action' || temp[it]['type']()=='craft'){
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['side']()] ??= {}
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['target']()] ??= {}
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['target']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                }

                if(temp[it]['type']()=='resource'){
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['side']()] ??= {}
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['resource']()] ??= {}
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['side']()][temp[it]['resource']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                }
                
                if(temp[it]['type']()=='building'){
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['target']()] ??= {}
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()] ??= {}
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                }

                if(temp[it]['type']()=='citizens'){
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['target']()] ??= {}
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()] ??= {}
                    tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['formula']()] ??= {}
                    if(temp[it]['side']()=='effect'){
                        tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['formula']()]['effect'] ??= v(temp[it]['value']())
                    }
                    if(temp[it]['type']()=='gain' || temp[it]['type']()=='capped'){
                        tmp.civics.workshop[i].effect[temp[it]['type']()][temp[it]['target']()][temp[it]['side']()][temp[it]['resource']()][temp[it]['formula']()] ??= v(temp[it]['value']())
                    }
                }

                if(temp[it]['type']()=='special'){
                    getSpecialTmp(temp, it, i, tmp.civics.workshop[i])
                }

                if(temp[it]['type']()=='adjustment'){
                    getAjustmentTmp(temp, it, i, tmp.civics.workshop[i])
                }
            }
        }
    }

    getTmpAjustment()
}

function getTmpAjustment(){
    for(let type in tmpAjustment){
        for(let side in tmpAjustment[type]){
            for(let target in tmpAjustment[type][side]){
                let tmpSide = tmpAjustment[type][side][target]
                for(let i in tmpSide){
                    let adjustment = tmp[type][side][target]['effect']
                    let amount = tmpSide[i]['amount'] ??= n(0)
                    for(let effect of tmpSide[i]['side']){
                        adjustment = adjustment[effect]
                    }
                    if(tmpSide[i]['formula']=='add'){
                        adjustment.setAdd(n(tmpSide[i]['value']).mul(amount))
                    }else if(tmpSide[i]['formula']=='addmul'){
                        adjustment.setAddmul(n(tmpSide[i]['value']).mul(amount))
                    }else if(tmpSide[i]['formula']=='mul'){
                        adjustment.setMul(n(tmpSide[i]['value']).pow(amount))
                    }
                }
            }
        }
    }
    tmpAjustment = {}
    getTmpEffectValue()
}

function getTmpEffectValue(){
    for(let type in tmp){
        tmpEffect[type] ??= {}
        for(let side in tmp[type]){
            tmpEffect[type][side] ??= {}
            for(let target in tmp[type][side]){
                tmpEffect[type][side][target] ??= {}
                if(tmp[type][side][target]?.['effect']!==undefined){
                    let effect = tmp[type][side][target]['effect']
                    let amount = tmp[type][side][target]['amount'] ??= n(0)

                    if(effect['gain']!==undefined){
                        for(let i in effect['gain']){
                            for(let operator in effect['gain'][i]){
                                let value = effect['gain'][i][operator].getValue()
                                if(target==i){amount = n(1)}
                                tmpEffect.resource.main[i] ??= {}
                                tmpEffect.resource.main[i]['gain'] ??= {}
                                tmpEffect.resource.main[i]['gain'][operator] ??= {}
                                tmpEffect.resource.main[i]['gain'][operator][target] = {value: value.mul(amount), base: value, amount: amount, type: type, side: side, target: target}
                            }
                        }
                    }

                    if(effect['capped']!==undefined){
                        for(let i in effect['capped']){
                            for(let operator in effect['capped'][i]){
                                let value = effect['capped'][i][operator].getValue()
                                if(target==i){amount = n(1)}
                                tmpEffect.resource.main[i] ??= {}
                                tmpEffect.resource.main[i]['capped'] ??= {}
                                tmpEffect.resource.main[i]['capped'][operator] ??= {}
                                tmpEffect.resource.main[i]['capped'][operator][target] = {value: value.mul(amount), base: value, amount: amount, type: type, side: side, target: target}
                            }
                        }
                    }
                    
                    if(effect['action']!==undefined){
                        if(effect['action']['auto']!==undefined){
                            for(let i in effect['action']['auto']){
                                for(let operator in effect['action']['auto'][i]){
                                    let value = effect['action']['auto'][i][operator].getValue()
                                    if(target==i){amount = n(1)}
                                    tmpEffect.main.action[i] ??= {}
                                    tmpEffect.main.action[i]['auto'] ??= {}
                                    tmpEffect.main.action[i]['auto'][operator] ??= {}
                                    tmpEffect.main.action[i]['auto'][operator][target] = {value: value.mul(amount), base: value, amount: amount, type: type, side: side, target: target}
                                }
                            }
                        }
                        if(effect['action']['cooldown']!==undefined){
                            for(let i in effect['action']['cooldown']){
                                for(let operator in effect['action']['cooldown'][i]){
                                    let value = effect['action']['cooldown'][i][operator].getValue()
                                    if(target==i){amount = n(1)}
                                    tmpEffect.main.action[i] ??= {}
                                    tmpEffect.main.action[i]['cooldown'] ??= {}
                                    tmpEffect.main.action[i]['cooldown'][operator] ??= {}
                                    tmpEffect.main.action[i]['cooldown'][operator][target] = {value: value.mul(amount), base: value, amount: amount, type: type, side: side, target: target}
                                }
                            }
                        }
                    }
                    
                    if(effect['craft']!==undefined){
                        if(effect['craft']['auto']!==undefined){
                            for(let i in effect['craft']['auto']){
                                for(let operator in effect['craft']['auto'][i]){
                                    let value = effect['craft']['auto'][i][operator].getValue()
                                    if(target==i){amount = n(1)}
                                    tmpEffect.main.craft[i] ??= {}
                                    tmpEffect.main.craft[i]['auto'] ??= {}
                                    tmpEffect.main.craft[i]['auto'][operator] ??= {}
                                    tmpEffect.main.craft[i]['auto'][operator][target] = {value: value.mul(amount), base: value, amount: amount, type: type, side: side, target: target}
                                }
                            }
                        }
                        if(effect['craft']['cooldown']!==undefined){
                            for(let i in effect['craft']['cooldown']){
                                for(let operator in effect['craft']['cooldown'][i]){
                                    let value = effect['craft']['cooldown'][i][operator].getValue()
                                    if(target==i){amount = n(1)}
                                    tmpEffect.main.craft[i] ??= {}
                                    tmpEffect.main.craft[i]['cooldown'] ??= {}
                                    tmpEffect.main.craft[i]['cooldown'][operator] ??= {}
                                    tmpEffect.main.craft[i]['cooldown'][operator][target] = {value: value.mul(amount), base: value, amount: amount, type: type, side: side, target: target}
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}