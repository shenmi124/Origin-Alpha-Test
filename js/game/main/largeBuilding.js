var MainLargeBuilding = {
    temple: {
        name(){
            return '神殿'
        },
        tooltip(){
            return '让人们相信神的存在'
        },
        cost: {
            ceramic(){return n(5)},
            brick(){return n(10)},
        },
        costIncrease(){return n(10)},
        buildingTimes(){return n(10).mul(player.largeBuilding.temple.add(1))},
        buildingDifficulty(){return n(500).mul(n(2).pow(player.largeBuilding.temple))},
        effect: [
            {
                type(){return 'gain'},
                resource(){return 'faith'},
                formula(){return 'mul'},
                value(){return n(2)},
            },
            {
                type(){return 'capped'},
                resource(){return 'faith'},
                formula(){return 'add'},
                value(){return n(50)},
            },
            {
                type(){return 'capped'},
                resource(){return 'faith'},
                formula(){return 'mul'},
                value(){return n(2)},
            },
        ],
        unlockedDisplay: [
            '解锁职业: 牧师',
            '解锁后续研究',
        ],
        onBuy(){
            CitizensFix()
        },
        unlocked(){return player.workshop.builderWorkshop}
    }
}