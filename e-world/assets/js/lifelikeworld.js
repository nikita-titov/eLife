	// Новый конструктор. Наследует с помощью prototype объект World.
	function LifelikeWorld(map, legend) {
		World.call(this, map, legend);
	}

	LifelikeWorld.prototype = Object.create(World.prototype);

	var actionTypes = Object.create(null);

	LifelikeWorld.prototype.letAct = function(critter, vector) {
		var action = critter.act(new View(this, vector));
		var handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);
		if (!handled) {
			critter.energy -= 0.2;
			if (critter.energy <= 0)
				this.grid.set(vector, null);
		}
	};

	// Рост
	actionTypes.grow = function(critter) {
	  critter.energy += 0.5;
	  return true;
	};

	// Движение
	actionTypes.move = function(critter, vector, action) {
		var dest = this.checkDestination(action, vector);
		if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null)
			return false;
		critter.energy -= 1;
		this.grid.set(vector, null);
		this.grid.set(dest, critter);
		return true;
	};

	// Поедание
	actionTypes.eat = function(critter, vector, action) {
		var dest = this.checkDestination(action, vector);
		var atDest = dest != null && this.grid.get(dest);
		if (!atDest || atDest.energy == null)
			return false;
		critter.energy += atDest.energy;
		this.grid.set(dest, null);
		return true;
	};

	// Размножение
	actionTypes.reproduce = function(critter, vector, action) {
		var baby = elementFromChar(this.legend, critter.originChar);
		var dest = this.checkDestination(action, vector);
		if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null)
			return false;
		critter.energy -= 2 * baby.energy;
		this.grid.set(dest, baby);
		return true;
	};