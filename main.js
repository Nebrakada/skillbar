const skillBar = document.querySelector(".skill-bar");
const skillBarElems = document.querySelectorAll(".skill-bar > *");
const cooldownCounterDiv = document.querySelector(".cooldown-counter");
const combatLog = document.querySelector(".combat-log");

const skillType = { attack: "attack", defence: "defence" };

class Skill {
  constructor(name, skillType, cooldown, url) {
    this.name = name;
    this.skillType = skillType;
    this.cooldown = cooldown;
    this.url = url;
  }
}

const skills = [
  new Skill(
    "lightning strike",
    skillType.attack,
    2,
    "./images/SpellBook01_13.png"
  ),
  new Skill("fireblast", skillType.attack, 1, "./images/SpellBook01_17.png"),
  new Skill("frost", skillType.attack, 4, "./images/SpellBook01_78.png"),
  new Skill("blizzard", skillType.attack, 5, "./images/SpellBook01_87.png"),
  new Skill("poison", skillType.attack, 2, "./images/SpellBook01_95.png"),
];

function addBackgroundImage(element, index) {
  const url = skills[index].url;
  element.style.backgroundImage = `url('${url}')`;
  element.dataset.index = index;
}

const printSkillUse = (skill) => {
  combatLog.textContent = `Casting ${skill.name}...`;
};

function skillClicked(e) {
  const skill = e.target;
  const usedSkill = skills[skill.dataset.index];
  printSkillUse(usedSkill);
  const cooldown = usedSkill.cooldown;
  const createdCoolDownDiv = addCooldownEffect(skill, cooldown);
  const cooldownCounter = createdCoolDownDiv.parentElement.querySelector(
    ".cooldown-counter"
  );
  removeCooldownEffect(createdCoolDownDiv, cooldownCounter, cooldown);
}

skillBarElems.forEach((skill, indx) => {
  addBackgroundImage(skill, indx);
  skill.addEventListener("click", skillClicked);
});

/* CoolDown */
function addCooldownEffect(element, cooldown) {
  const div = document.createElement("div");
  addCoolDownOverlay(div, cooldown);
  element.append(div);
  return div;
}

const removeCooldownEffect = async (element, cooldownCounter, cooldownTime) => {
  let timer = cooldownTime;
  for (let i = 0; i < cooldownTime; i++) {
    timer--;
    printCoolDown(cooldownCounter, timer+1);
    await sleep(1000);
  }
  cooldownCounter.textContent = "";
  element.remove();
};

function printCoolDown(cooldownCounter, timeLeft) {
  cooldownCounter.textContent = timeLeft;
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function addCoolDownOverlay(element, coolDownTime) {
  element.style.position = "absolute";
  element.style.top = "0";
  element.style.left = "0";
  element.style.width = "100%";
  element.style.height = "100%";
  element.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  element.style.animation = `coolDownAnimation ${coolDownTime}s linear`;
}
