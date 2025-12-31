var CivicsCitizens = {
    WastePicker: {
        name(){return '拾荒者'},
        tooltip(){return '<grey>拾荒者没有自己的专职,所以所以他们会根据效率被动的进行采集</grey><joker>噬谎者??</joker>'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: [
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'food'},
                value(){return n(getCraftEfficiency('collectFood')).mul(0.1)},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'wood'},
                value(){return n(getCraftEfficiency('collectWood')).mul(0.1)},
            },
            {
                type(){return 'gain'},
                formula(){return 'add'},
                resource(){return 'stone'},
                value(){return n(getCraftEfficiency('collectStone')).mul(0.1)},
            },
        ],
    },
}

var CivicsJobs = {
    unemployed: {
        name(){return '无业游民'},
        amount(){return n(player.resource.citizens)},
        display(){return false}
    },
}

var CitizensTip = function(){
    return formatWhole(player.resource.citizens)
}