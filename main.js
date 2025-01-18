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
const burnpot = document.getElementById("burnpot")
const burntrn = document.getElementById("burntrn")

const defense = document.getElementById("defense")
const dodge = document.getElementById("dodge")

const corpres = document.getElementById("corpres")
const swgeres = document.getElementById("swgeres")
const sodares = document.getElementById("sodares")
const absrres = document.getElementById("absrres")
const minmres = document.getElementById("minmres")

const bleedres = document.getElementById("bleedres")
const poisonres = document.getElementById("poisonres")
const burnres = document.getElementById("burnres")

const results = document.getElementById("results")

const extra = document.getElementById("extra")

const overlay = document.getElementById("overlay")

const types = [corp, swge, soda, absr, minm]
const typesres = [corpres, swgeres, sodares, absrres, minmres]

let selectedUnit = ""
let skillsShown = false
let savedSkillsShown = false
let total
let enemyData

let savedEnemyData = []

axios.get('https://raw.githubusercontent.com/nefarkitti/mustardskillcreator/refs/heads/main/enemies.json').then(res => { //https://raw.githubusercontent.com/nefarkitti/mustardskillcreator/refs/heads/main/enemies.json
    let jsonData = res.data // should be json by default

    enemyData = jsonData

    console.log(jsonData)

    /*setSkill(0,0)
    skillsShown = true
    loadSkills(0)*/
    loadUnit(0)
    setSkill(0,0)

}).catch(console.error)

function setSkill(unitIndex, skillIndex) {

    let unit = enemyData[unitIndex]
    let skill = unit.skills[skillIndex]

    skillName.value = skill.name

   // attackPower.value = unit.attackpower

    baseDamage.value = skill.basedamage
    accuracy.value = skill.accuracy
    targets.value = skill.targets
    multihit.value = skill.multihit
    revs.value = skill.revs
    cooldown.value = skill.cooldown

    corp.value = skill.corp
    swge.value = skill.swge
    soda.value = skill.soda
    absr.value = skill.absr
    minm.value = skill.minm

    bleedpot.value = skill.bleedApplication.potency
    bleedtrn.value = skill.bleedApplication.turns

    poisonpot.value = skill.poisonApplication.potency
    poisontrn.value = skill.poisonApplication.turns

    burnpot.value = skill.burnApplication.potency
    burntrn.value = skill.burnApplication.turns

    extra.value = skill.extra

    closeDatabase()

    calculate()

}

function setSavedSkill(unitIndex, skillIndex) {

    let unit = savedEnemyData[unitIndex]
    let skill = unit.skills[skillIndex]

    skillName.value = skill.name

   // attackPower.value = unit.attackpower

    baseDamage.value = skill.basedamage
    accuracy.value = skill.accuracy
    targets.value = skill.targets
    multihit.value = skill.multihit
    revs.value = skill.revs
    cooldown.value = skill.cooldown

    corp.value = skill.corp
    swge.value = skill.swge
    soda.value = skill.soda
    absr.value = skill.absr
    minm.value = skill.minm

    bleedpot.value = skill.bleedApplication.potency
    bleedtrn.value = skill.bleedApplication.turns

    poisonpot.value = skill.poisonApplication.potency
    poisontrn.value = skill.poisonApplication.turns

    burnpot.value = skill.burnApplication.potency
    burntrn.value = skill.burnApplication.turns

    extra.value = skill.extra

    closeDatabase()

    calculate()

}

function loadUnit(index) {

    let unit = enemyData[index]

        document.getElementById("victimname").value = unit.name

       // attackPower.value = unit.attackpower
       // accMod.value = unit.accmod

        defense.value = unit.defense
        dodge.value = unit.dodge
       // critChance.value = unit.critchance
    
        corpres.value = unit.corpres
        swgeres.value = unit.swgeres
        sodares.value = unit.sodares
        absrres.value = unit.absrres
        minmres.value = unit.minmres
    
        bleedres.value = unit.bleedres
        poisonres.value = unit.poisonres
        burnres.value = unit.burnres

        closeDatabase()

        calculate()


}
function loadSavedUnit(index) {

    let unit = savedEnemyData[index]

        document.getElementById("victimname").value = unit.name

       // attackPower.value = unit.attackpower
       // accMod.value = unit.accmod
       // critChance.value = unit.critchance

        defense.value = unit.defense
        dodge.value = unit.dodge
    
        corpres.value = unit.corpres
        swgeres.value = unit.swgeres
        sodares.value = unit.sodares
        absrres.value = unit.absrres
        minmres.value = unit.minmres
    
        bleedres.value = unit.bleedres
        poisonres.value = unit.poisonres
        burnres.value = unit.burnres

        closeDatabase()

        calculate()


}

function loadSkills(index) {

    skillsShown = true
    let skills = document.getElementById("overlay-skills")

    skills.innerHTML = ``

    let unit = enemyData[index]

    for (let i = 0; i < unit.skills.length;i++) {

        let skill = unit.skills[i]

        skills.innerHTML += `
        <div class="unit" onclick="setSkill(${index}, ${i})">
        <span class="unit-name">${skill.name}</span>
        </div>
        `

    }

}

function loadSavedSkills(index) {

    savedSkillsShown = true
    let skills = document.getElementById("overlay-skills")

    skills.innerHTML = ``

    let unit = savedEnemyData[index]

    for (let i = 0; i < unit.skills.length;i++) {

        let skill = unit.skills[i]

        skills.innerHTML += `
        <div class="unit" onclick="setSavedSkill(${index}, ${i})">
        <span class="unit-name">${skill.name}</span>
        </div>
        `

    }

}

function openDatabase() {

    overlay.style.display = ``

    let units = document.getElementById("overlay-units")
    let skills = document.getElementById("overlay-skills")

    skills.innerHTML = ``
    skillsShown = false
    savedSkillsShown = false

    units.innerHTML = ``

    for (let i = 0; i < enemyData.length;i++) {

        let unit = enemyData[i]

        units.innerHTML += `
        <div class="unit" ondblclick="loadUnit(${i})" onclick="loadSkills(${i})">
        <span class="unit-name">${unit.name}</span>
        </div>
        `


    }

    if (savedEnemyData.length >= 1) {

        units.innerHTML += `
                    <div class="divider">
                        <hr>
                        <span>SAVED</span>
                    </div>
        `

        for (let i = 0; i < savedEnemyData.length;i++) {

            let unit = savedEnemyData[i]
    
            units.innerHTML += `
            <div class="unit"  ondblclick="loadSavedUnit(${i})" onclick="loadSavedSkills(${i})">
            <span class="unit-name">${unit.name}</span>
            </div>
            `
    
        }

    }

}

function closeDatabase() {

    overlay.style.display = `none`
    skillsShown = false

}

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
    if (burnpot.value >= 1 && burntrn.value == 0) {
        burntrn.value = 1
    }

    let damage = baseDamage.value
    let finalDamage = 0

    let bleedDamage = 0
    let bleedPotency = bleedpot.value
    let bleedTurns = bleedtrn.value

    for (let i = 0; i < bleedTurns;i++) {


        bleedDamage += Number(bleedPotency)

        bleedPotency = Math.ceil(bleedPotency / 2)

    }

    let poisonDamage = 0
    let poisonPotency = poisonpot.value
    let poisonTurns = poisontrn.value

    for (let i = 0; i < poisonTurns;i++) {


        poisonDamage += Number(poisonPotency)

        poisonPotency = Math.ceil(poisonPotency / 3)

    }

    let burnDamage = 0
    let burnPotency = burnpot.value
    let burnTurns = burntrn.value

    for (let i = 0; i < burnTurns;i++) {


        burnDamage += Number(burnPotency)

        burnPotency = Math.ceil(burnPotency / 1.5)

    }


    let damage3 = Math.round(Math.ceil(damage * attackPower.value) * defense.value)

    //finalDamage = damage

    for (let i = 0; i < 5; i++) {
        
        let type = types[i]
        let typeres = typesres[i]

        let typeDamage = Math.round(damage3 * ((type.value * 1) * ((typeres.value * 1) - 1)))

        finalDamage += typeDamage

    }

    //finalDamage = Math.ceil(damage * defense.value)

    finalDamage += damage3

    finalDamage = Math.round(finalDamage) // THIS IS FOR YOU 1NNING

    let critDamage = finalDamage * 2

    results.innerHTML = `
    <span>TOTAL DAMAGE</span>
    <h1>${finalDamage} (${critDamage} CRIT) <span class="smaller">(${Math.round((Math.round(((1-dodge.value) * accuracy.value)*100))*accMod.value)}% chance to land)</span></h1>
    <h3 class="bleed">+${bleedDamage} BLD total (${Math.floor(bleedres.value*100)}% chance to apply)</h3>
    <h3 class="poison">+${poisonDamage} PSN total (${Math.floor(poisonres.value*100)}% chance to apply)</h3>
    <h3 class="burn">+${burnDamage} BRN total (${Math.floor(burnres.value*100)}% chance to apply)</h3>
    `

    console.log(finalDamage)

    //createClipboardString(finalDamage)

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
    ["burnpot"] = ${burnpot.value},
    ["burntrn"] = ${burntrn.value},
}

--[[
${extra.value}
]]--

\`\`\`
    `

    navigator.clipboard.writeText(str)

}

function updateSelect() {

    const unitselect = document.getElementById("unit-select")

    unitselect.innerHTML = ``

    for (let i = 0;i<savedEnemyData.length;i++) {

        unitselect.innerHTML += `
        <option value="${i}">
        ${savedEnemyData[i].name}
        </option>
        `
        console.log("hi")

    }

}

function saveUnit() {

    let victimName = document.getElementById("victimname")

    if (victimName.length <= 3) return;
    if (victimName.length <= 0) return;

    let findClone = false

    for (let i=0;i < savedEnemyData.length;i++) {

        if (savedEnemyData[i].name == victimName.value) {

            let savedenemylol = savedEnemyData[i]

            savedenemylol.name = victimName.value

            savedenemylol.defense = defense.value
            savedenemylol.dodge = dodge.value

            savedenemylol.attackpower = attackPower.value
            savedenemylol.accmod = accMod.value

            savedenemylol.corpres = corpres.value
            savedenemylol.swgeres = swgeres.value
            savedenemylol.sodares = sodares.value
            savedenemylol.absrres = absrres.value
            savedenemylol.minmres = minmres.value

            savedenemylol.bleedres = bleedres.value
            savedenemylol.poisonres = poisonres.value
            savedenemylol.burnres = burnres.value

            findClone = true
            break
        }

    }
    if (findClone == true) return;

    savedEnemyData.push({

        "name": victimName.value,

        "defense": defense.value,
        "dodge": dodge.value,

        "attackpower": attackPower.value,
        "accmod": accMod.value,

        "corpres": corpres.value,
        "swgeres": swgeres.value,
        "sodares": sodares.value,
        "absrres": absrres.value,
        "minmres": minmres.value,

        "bleedres": bleedres.value,
        "poisonres": poisonres.value,
        "burnres": burnres.value,

        "skills": []

    })

    updateSelect()

    saveEverything()

}

function saveSkill() {

    const unitselect = document.getElementById("unit-select")

    if (!unitselect.value) return;

    if (skillName.value.length <= 3) return;

    let dupe = false

    for (let i=0;i<savedEnemyData[unitselect.value].skills.length;i++) {

        if (savedEnemyData[unitselect.value].skills[i].name == skillName.value) {

            let savedSkillData = savedEnemyData[unitselect.value].skills[i]

            savedSkillData.name = skillName.value

            savedSkillData.basedamage = baseDamage.value
            savedSkillData.accuracy = accuracy.value
            savedSkillData.targets = targets.value
            savedSkillData.multihit = multihit.value
            savedSkillData.revs = revs.value
            savedSkillData.cooldown = cooldown.value

            savedSkillData.corp = corp.value
            savedSkillData.swge = swge.value
            savedSkillData.soda = soda.value
            savedSkillData.absr = absr.value
            savedSkillData.minm = minm.value

            savedSkillData.bleedApplication = {
                "potency": bleedpot.value,
                "turns": bleedtrn.value
            },
            savedSkillData.poisonApplication = {
                "potency": poisonpot.value,
                "turns": poisontrn.value
            },
            savedSkillData.burnApplication = {
                "potency": burnpot.value,
                "turns": burntrn.value
            },

            savedSkillData.extra = extra.value

            dupe = true
            break

        }

    }

    if (dupe == true) return;

    savedEnemyData[unitselect.value].skills.push({
        "name": skillName.value,

        "basedamage": baseDamage.value,
        "accuracy": accuracy.value,
        "targets": targets.value,
        "multihit": multihit.value,
        "revs": revs.value,
        "cooldown": cooldown.value,

        "corp": corp.value,
        "swge": swge.value,
        "soda": soda.value,
        "absr": absr.value,
        "minm": minm.value,

        "bleedApplication": {
            "potency": bleedpot.value,
            "turns": bleedtrn.value
        },
        "poisonApplication": {
            "potency": poisonpot.value,
            "turns": poisontrn.value
        },
        "burnApplication": {
            "potency": burnpot.value,
            "turns": burntrn.value
        },

        "extra": extra.value
    })

    saveEverything()

}

function load() {

    const getSave = localStorage.getItem("skillcreator_savedEnemyData");

    try {

        if (getSave != null) {
            savedEnemyData = JSON.parse(getSave); // magic things!
        }

        updateSelect()
        
    } catch (e) {

    }

}
function saveEverything() {
    localStorage.setItem("skillcreator_savedEnemyData", JSON.stringify(savedEnemyData));
}

load()