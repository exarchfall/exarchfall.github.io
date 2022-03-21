var energy = 0;
var experience = 0;

var energyGainValue = 1;
var experienceGainValue = 1;

var energyGainGrade = 0;
var experienceGainGrade = 0;

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

var modeActive = 0;

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
}, 250);