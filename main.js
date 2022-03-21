var autosaveIntervalCurrent = 0;
var autosaveInterval = 7200;

var modeActive = 0;

var energy = 0;
var experience = 0;

var energyGainValue = 1;
var experienceGainValue = 1;

var energyGainGrade = 0;
var experienceGainGrade = 0;



function saveData()
{
	var save = {
	modeActive: modeActive,
	energy: energy,
	experience: experience,
	energyGainValue: energyGainValue,
	experienceGainValue: experienceGainValue,
	energyGainGrade: energyGainGrade,
	experienceGainGrade: experienceGainGrade
	};
	localStorage.setItem('save', JSON.stringify(save));
}

function newGame()
{
	
}

function loadGame()
{
	var save1 = JSON.parse(localStorage.getItem('save'));
	if(typeof save1.modeActive !== 'undefined') modeActive = save1.modeActive;
	if(typeof save1.energy !== 'undefined') energy = save1.energy;
	if(typeof save1.experience !== 'undefined') experience = save1.experience;
	if(typeof save1.energyGainValue !== 'undefined') energyGainValue = save1.energyGainValue;
	if(typeof save1.experienceGainValue !== 'undefined') experienceGainValue = save1.experienceGainValue;
	if(typeof save1.energyGainGrade !== 'undefined') energyGainGrade = save1.energyGainGrade;
	if(typeof save1.experienceGainGrade !== 'undefined') experienceGainGrade = save1.experienceGainGrade;
}

function gainEnergy(value)
{
	energy = energy + value;
	document.getElementById("energy").innerHTML = energy;
}

function gainExperience(value)
{
	experience = experience + value;
	document.getElementById("experience").innerHTML = experience;
}

function upgradeEnergyGain(value)
{
	var condenseCost = Math.floor(10*Math.pow(1.1, energyGainGrade));
	if(energy >= condenseCost)
	{
		energyGainGrade = energyGainGrade + 1;
		energy = energy - condenseCost;
		energyGainValue = energyGainValue + 1;
		document.getElementById("energy").innerHTML = energy;
		document.getElementById("energyGainGrade").innerHTML = energyGainGrade;
	}
	var condenseNewCost = Math.floor(10*Math.pow(1.1, energyGainGrade));
	document.getElementById("energyGainUpgradeCost").innerHTML = condenseNewCost;
}

function mainCycle()
{
	switch(modeActive)
	{
		case 0:
			break;
		case 1:
			gainEnergy(energyGainValue);
			break;
		case 2:
			gainExperience(experienceGainValue);
			break;
		default:
			break;
	}
}

function changeAction(newAction)
{
	switch(newAction)
	{
		case 'cultivate':
			modeActive = 1;
			break;
		case 'fight':
			modeActive = 2;
			break;
		default:
			modeActive = 0;
			break;
	}
}



window.setInterval(
function(){
	mainCycle();
	if(autosaveInterval >= autosaveIntervalCurrent)
	{
		autosaveIntervalCurrent++;
	} else{
		saveData();
		autosaveIntervalCurrent=0;
	}
}, 250);