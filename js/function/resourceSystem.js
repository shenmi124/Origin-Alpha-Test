function gainResource(res, gain){
    if(isNaN(player['resource'][res])){
        player['resource'][res] = n(0)
        console.log(res+' 资源变成了NaN')
    }
    if(gain.gte(0)){
        if(getResourceCapped(res)!==null){
            gain = gain.min(n(getResourceCapped(res)).sub(player['resource'][res]))
        }
        player['resource'][res] = player['resource'][res].add(gain)
        player['resource'][res+'Total'] = player['resource'][res+'Total'].add(gain)
        player['resource'][res+'Best'] = player['resource'][res+'Best'].max(player['resource'][res])
    }else{
        player['resource'][res] = player['resource'][res].add(gain).max(0)
    }
}

function getResourceTitleID(id, res){
	let Class = ''
	if(RESOURCE['main'][res]['Class']!==undefined){
		Class = RESOURCE['main'][res]['Class']()
	}
	if(RESOURCE['main'][res]['type']!==undefined){
        if(RESOURCE['main'][res]['type']()=='node'){
            getByID(id+'TitleID', `
                <div class="resourceTitle resourceName `+Class+`" style="position: relative; visibility: hidden;">null</div>`
            )
            getByID(id+'BorderID', `<div class="resourceBorder" id="`+res+`BorderID" style="background: `+colorText(res)[0]+`; z-index: -1; transition-duration: 0.2s; clip-path: inset(0% 100% 0% 0%);"></div>`)
            return null
        }
    }
	getByID(id+'TitleID', `
		<tooltip `+loadTooltip(res, 'LoadTooltipResource', null)+` style="cursor: help;">
			<div class="resourceTitle resourceName `+Class+`" style="color: `+colorText(res)[0]+`; position: relative;">
			    `+i18n(RESOURCE['main'][res]['name']())+`
            </div>
        </tooltip>`
	)
	getByID(id+'BorderID', `<div class="resourceBorder" id="`+res+`BorderID" style="background: `+colorText(res)[0]+`; z-index: -1; transition-duration: 0.2s; clip-path: inset(0% 0% 0% 0%);"></div>`)
}

function getResourceDoc(id){
	getByID(id+'ID', format(player['resource'][id]))
	if(RESOURCE['main'][id]['capped']!==undefined){
		getByID(id+'CappedID', format(getResourceCapped(id)))
		document.getElementById(id+"slashID").style.display = ''
	}else{
		document.getElementById(id+"slashID").style.display = 'none'
	}
	if(RESOURCE['main'][id]['gain']!==undefined){
		if(!getResourceGain(id).eq(0)){
            let negative = false
            if(RESOURCE['main'][id]['negative']!==undefined){
                negative = RESOURCE['main'][id]['negative']()
            }
            if(negative){
                if(getResourceGain(id).gt(0)){
                    getByID(id+'GainID','<red>(+ '+format(getResourceGain(id))+' /s)</red>')
                }else{
                    getByID(id+'GainID','(- '+format(n(getResourceGain(id)).abs())+' /s)')
                }
            }else{
                if(getResourceGain(id).gt(0)){
                    getByID(id+'GainID','(+ '+format(getResourceGain(id))+' /s)')
                }else{
                    getByID(id+'GainID','<red>(- '+format(n(getResourceGain(id)).abs())+' /s)</red>')
                }
            }
		}
	}
}

function resourceUnlocked(res){
    let unlocked = false
    if(RESOURCE['main'][res]['unlocked']!==undefined){
		if(RESOURCE['main'][res]['unlocked']!==undefined){
			unlocked = RESOURCE['main'][res]['unlocked']()
		}
		if(unlocked){
            RESOURCEUNLOCKEDTIMES += 1
			document.getElementById(res+"LoadResourceTitleID").style.display = ''
			document.getElementById(res+"LoadResourceID").style.display = ''
			document.getElementById(res+"BorderID").style.display = ''
			if(unlocked && player['resource'][res+'Unlocked']==false){
				if(RESOURCE['main'][res]['unlockAction']!==undefined){
					RESOURCE['main'][res]['unlockAction']()
				}
			}
			player['resource'][res+'Unlocked'] = true
		}else{
			document.getElementById(res+"LoadResourceTitleID").style.display = 'none'
			document.getElementById(res+"LoadResourceID").style.display = 'none'
			document.getElementById(res+"BorderID").style.display = 'none'
		}
    }else{
        RESOURCEUNLOCKEDTIMES += 1
		document.getElementById(res+"LoadResourceTitleID").style.display = ''
		document.getElementById(res+"LoadResourceID").style.display = ''
		player['resource'][res+'Unlocked'] = true
	}
    if(RESOURCE['main'][res]['type']!==undefined){
        if(RESOURCE['main'][res]['type']()=='node'){
            if(unlocked){
                RESOURCEUNLOCKEDTIMES = 0
            }
        }
    }
    if(!(RESOURCEUNLOCKEDTIMES%2)){
        if(RESOURCE['main'][res]['type']!==undefined){
            if(RESOURCE['main'][res]['type']()=='node'){
                document.getElementById(res+"LoadResourceBackground").style.background = ''
            }else{
                document.getElementById(res+"LoadResourceBackground").style.background = '#dfdfdf55'
            }
        }else{
            document.getElementById(res+"LoadResourceBackground").style.background = '#dfdfdf55'
        }
    }else{
        document.getElementById(res+"LoadResourceBackground").style.background = ''
    }
}

function getResourceID(res){
	if(RESOURCE['main'][res]['type']!==undefined){
        if(RESOURCE['main'][res]['type']()=='node'){
            resourceUnlocked(res)
            return null
        }
    }
	getByID(res+'LoadResourceID',`
		<div class="resourceTitle" id="`+res+`ID" style="width: 90px;"></div>
		<div class="resourceTitle" style="width: 12px;">
			<div class="resourceTitle" style="width: 12px; color: #888" id="`+res+`slashID">/</div>
		</div>
		<div class="resourceTitle" style="width: 90px;">
			<div class="resourceTitle" style="color: #888; width: 90px;" id="`+res+`CappedID"></div>
		</div>
		<div class="resourceTitle" style="width: 130px;">
			<div class="resourceTitle" id="`+res+`GainID" style="width: 140px;"></div>
		</div>
		`
	)
    resourceUnlocked(res)
	if(RESOURCE['main'][res]['capped']!==undefined){
		let border = n(100).sub(player['resource'][res].div(n(getResourceCapped(res)).max(0.01)).mul(100))
		document.getElementById(res+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
	}else{
		document.getElementById(res+"BorderID").style.clipPath = 'inset(0% 100% 0% 0%)'
	}
	getResourceDoc(res)
}

function resourceUpdate(id){
	if(RESOURCE['main'][id]['amount']!==undefined){
		player['resource'][id] = n(RESOURCE['main'][id]['amount']())
	}else{
		if(getResourceGain(id)!==null){
            gainResource(id, n(getResourceGain(id)).mul(DIFF))
		}
	}
	player['resource'][id+'Best'] = player['resource'][id+'Best'].max(player['resource'][id])
}

function getResourceGain(res){
    return getEffectValue(tmpEffect.resource.main[res]?.gain, RESOURCE['main'][res]['gain']!==undefined)
}

function getResourceCapped(res){
    return getEffectValue(tmpEffect.resource.main[res]?.capped, RESOURCE['main'][res]['capped']!==undefined)
}

function getResourceBaseNumber(res){
    let num = n(0)
    if(RESOURCE['main'][res]['num']!==undefined){
        num = num.add(RESOURCE['main'][res]['num']())
    }
    return num
}