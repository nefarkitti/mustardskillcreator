//ia

const attackPower = document.getElementById("attackpower")
const accMod = document.getElementById("accmod")
const critChance = document.getElementById("critchance")

const skillName = document.getElementById("name")
const baseDamage = document.getElementById("basedamage")
const accuracy = document.getElementById("accuracy")
const targets = document.getElementById("targets")
const multihit = document.getElementById("multihit")
const revs = document.getElementById("revs")
const cooldown = document.getElementById("cooldown")

const corp = document.getElementById("corp")
const swge = document.getElementById("swge")
const soda = document.getElementById("soda")
const absr = document.getElementById("absr")
const minm = document.getElementById("minm")

const bleedpot = document.getElementById("bleedpot")
const bleedtrn = document.getElementById("bleedtrn")
const poisonpot = document.getElementById("poisonpot")
const poisontrn = document.getElementById("poisontrn")

const defense = document.getElementById("defense")
const dodge = document.getElementById("dodge")

const corpres = document.getElementById("corpres")
const swgeres = document.getElementById("swgeres")
const sodares = document.getElementById("sodares")
const absrres = document.getElementById("absrres")
const minmres = document.getElementById("minmres")

const bleedres = document.getElementById("bleedres")
const poisonres = document.getElementById("poisonres")

const results = document.getElementById("results")

const extra = document.getElementById("extra")

const types = [corp, swge, soda, absr, minm]
const typesres = [corpres, swgeres, sodares, absrres, minmres]

let total

function janeDefault() {

    defense.value = 0.8
    dodge.value = 0.1

    corpres.value = 1.3
    swgeres.value = 1
    sodares.value = 0.5
    absrres.value = 0.8
    minmres.value = 1.15

    bleedres.value = 0.9
    poisonres.value = 1.0

}

function calculate() {

    baseDamage.value = Math.ceil(baseDamage.value)

    bleedpot.value = Math.round(bleedpot.value)
    bleedtrn.value = Math.round(bleedtrn.value)
    poisonpot.value = Math.round(poisonpot.value)
    poisontrn.value = Math.round(poisontrn.value)

    if (bleedpot.value >= 1 && bleedtrn.value == 0) {
        bleedtrn.value = 1
    }
    if (poisonpot.value >= 1 && poisontrn.value == 0) {
        poisontrn.value = 1
    }

    let damage = baseDamage.value
    let finalDamage = 0

    let bleedDamage = 0
    let bleedPotency = bleedpot.value
    let bleedTurns = bleedtrn.value

    for (let i = 0; i < bleedTurns;i++) {


        bleedDamage += Number(bleedPotency)

        bleedPotency = Math.ceil(bleedPotency / 3)

    }

    let poisonDamage = 0
    let poisonPotency = poisonpot.value
    let poisonTurns = poisontrn.value

    for (let i = 0; i < poisonTurns;i++) {


        poisonDamage += Number(poisonPotency)

        poisonPotency = Math.ceil(poisonPotency / 3)

    }


    damage = Math.ceil(damage * attackPower.value)
    damage = Math.ceil(damage * defense.value)

    finalDamage = damage

    for (let i = 0; i < 5; i++) {
        
        let type = types[i]
        let typeres = typesres[i]

        let typeDamage = Math.ceil(damage * type.value)
        let resistanceDamage = Math.ceil(typeDamage * typeres.value)

        finalDamage += resistanceDamage

    }

    let critDamage = finalDamage * 2

    results.innerHTML = `
    <span>TOTAL DAMAGE</span>
    <h1>${finalDamage} (${critDamage} CRIT)</h1>
    <h3 class="bleed">+${bleedDamage} BLD total (${0}% chance to apply)</h3>
    <h3 class="poison">+${poisonDamage} PSN total (${0}% chance to apply)</h3>
    `

    console.log(finalDamage)

    createClipboardString()

}

function createClipboardString() {

    let str = `
\`\`\`lua
module.info = {

    --[[ INFO ]]--
    ["name"] = "${skillName.value}",
    ["baseDamage"] = ${baseDamage.value},
    ["accuracy"] = ${accuracy.value},
    ["targets"] = ${targets.value},
    ["multihit"] = ${multihit.value},
    ["revsCost"] = ${revs.value},
    ["cooldown"] = ${cooldown.value},

    --[[ TYPES ]]--
    ["corp"] = ${corp.value},
    ["swge"] = ${swge.value},
    ["soda"] = ${soda.value},
    ["absr"] = ${absr.value},
    ["minm"] = ${minm.value},

    --[[ DOTS ]]--
    ["bleedpot"] = ${bleedpot.value},
    ["bleedtrn"] = ${bleedtrn.value},
    ["poisonpot"] = ${poisonpot.value},
    ["poisontrn"] = ${poisontrn.value},
}

--[[
${extra.value}
]]--

\`\`\`
    `

    navigator.clipboard.writeText(str)

}

janeDefault()
calculate()