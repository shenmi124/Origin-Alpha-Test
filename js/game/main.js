var TABBUTTON = {
    main: {
        name(){return "主页"},
        subtab: {
            action: {
                name(){return "行动"},
                unlocked(){return false}
            },
        }
    },
    civics: {
        name(){return '村庄'},
        subtab: {
            allocation: {
                name(){return "调配"},
                unlocked(){return true}
            },
            workshop: {
                name(){return "开发"},
                unlocked(){return true}
            },
            network: {
                name(){return "网状图"},
                unlocked(){return player.setting.network}
            },
        },
        unlocked(){return getResourceUnlocked('citizens')}
    },
    setting: {
        name(){return "其他"},
        subtab: {
            setting: {
                name(){return "设置"},
            },
            tips: {
                name(){return "记录"},
            },
            stats: {
                name(){return "统计"},
                unlocked(){return false}
            },
            information: {
                name(){return "信息"},
            },
            donate: {
                name(){return "捐助"},
            },
        }
    },
}

var RESOURCE = {
    main: ResourceMain,
}

var MAIN = {
    action: MainAction,
    building: MainBuilding,
    craft: MainCraft,
}

var CIVICS = {
    citizens: CivicsCitizens,
    jobs: CivicsJobs,
    workshop: CivicsWorkshop,
}

var GAME = {
    RESOURCE,
    MAIN,
    CIVICS
}

var MainActionData = {
    action: {
        name(){return '行动'},
        id(){return 'action'},
    },
    building: {
        name(){return '建筑'},
        id(){return 'building'},
    },
    craft: {
        name(){return '行为'},
        id(){return 'craft'},
    },
}
