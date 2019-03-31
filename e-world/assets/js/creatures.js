	// Растения "*". Трава - служит едой для травоядных, умеет размножаться.
	function Plant() {
		this.energy = 3 + Math.random() * 4;
	}

	Plant.prototype.act = function(context) {
		if (this.energy > 15) {
			var space = context.find(" ");
		if (space)
			return {type: "reproduce", direction: space};
		}
		if (this.energy < 20)
			return {type: "grow"};
	};

	// Травоядные "O". Травоядное существо, умеет ходить в любом направлении, "есть" траву, размножаться.
	function PlantEater() {
		this.energy = 20;
	}

	PlantEater.prototype.act = function(context) {
		var space = context.find(" ");
		if (this.energy > 60 && space)
			return {type: "reproduce", direction: space};
		var plant = context.find("*");
		if (plant)
			return {type: "eat", direction: plant};
		if (space)
			return {type: "move", direction: space};
	};

	// Хищники "@". Хищное существо, поедает травоядных, не ест траву, умеет размножаться.
	function Predators() {
		this.energy = 60;
	}

	Predators.prototype.act = function(context) {
		var space = context.find(" ");
		if (this.energy > 120 && space)
			return {type: "reproduce", direction: space};
		var kill = context.find("O");
		if (kill)
			return {type: "eat", direction: kill};
		if (space)
			return {type: "move", direction: space};
	};