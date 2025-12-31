function getWorldTime(){
    if(getResourceUnlocked('citizens')){
        return '城市革命'
    }
    return ''
}

function getGametime(){
    let time = player.game.time.mul(600)
    let year = n(time).div(31104000)
    let month = n(time).div(2592000)
    let day = n(time).div(86400)
    let hour = n(time).div(3600)
    let minute = n(time).div(60)
    let logYear = ''
    let logMonth = ''
    let logDay = n(day).floor()+' 天 '
    let logHour = ''
    let logMinute = ''
    let night = true
    if(false){
        logMinute = n(minute%60).floor()+' 分 '
    }
    if(false){
        logHour = n(hour%24).floor()+' 时 '
    }
    if(false){
        logMonth = n(month).floor()+' 月 '
        logDay = n(day%30).floor()+' 天 '
    }
    if(false){
        logYear = n(year).floor()+' 年 '
        logMonth = n(month%12).floor()+' 月 '
    }
    if(n(hour%24).floor().gte(18) || n(hour%24).floor().lte(5)){
        night = true
    }else{
        night = false
    }
    if(false){
        let logTime = ''
        if(night){
            logTime = ' <grey>(夜晚)</grey>'
        }else{
            logTime = ''
        }
        getByID('logTime', '<small><grey>'+getWorldTime()+'</grey><br>'+logYear+logMonth+logDay+logHour+logMinute+logTime+'</small>')
        document.title = '起源 - '+logYear+logMonth+logDay
    }
    getByID('logTime', '<small><grey>'+getWorldTime()+'</grey></small>')
    return [logYear+logMonth+logDay+logHour, night]
}

function getStage(){
	if(player.stage.explore.gte(1)){
		document.getElementById("loadResource").style.visibility = ''
        setTimeout(function(){
			document.getElementById("loadResource").style.opacity = 1
        },100)
	}
	if(getResourceUnlocked('citizens')){
		document.getElementById("tabButton").style.visibility = ''
		document.getElementById("subtabButton").style.visibility = ''
        setTimeout(function(){
			document.getElementById("tabButton").style.opacity = 1
			document.getElementById("subtabButton").style.opacity = 1
        },100)

		document.getElementById("bottomTab").style.visibility = ''
        setTimeout(function(){
			document.getElementById("bottomTab").style.opacity = 1
        },100)
	}
}

function getBodyOnclick(){
    player.data.click = player.data.click.add(1)
}