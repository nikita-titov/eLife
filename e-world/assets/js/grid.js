	// Клетки определяются координатами x и y. Конструктор.
	function Vector(x, y) {
		this.x = x;
		this.y = y;
	}

	// Новый метод Vector.plus
	Vector.prototype.plus = function(other) {
		return new Vector(this.x + other.x, this.y + other.y);
	};

	// Сетка – часть мира. Объект Grid с методами.
	function Grid(width, height) {
		this.space = new Array(width * height);
		this.width = width;
		this.height = height;
	}

	Grid.prototype.isInside = function(vector) {
		return vector.x >= 0 && vector.x < this.width &&
		vector.y >= 0 && vector.y < this.height;
	};

	Grid.prototype.get = function(vector) {
		return this.space[vector.x + this.width * vector.y];
	};

	Grid.prototype.set = function(vector, value) {
		this.space[vector.x + this.width * vector.y] = value;
	};

	// При вызове метода act ему даётся объект view, который позволяет существу изучить прилегающую местность.
	var directions = {
		"n": new Vector( 0, -1),
		"ne": new Vector( 1, -1),
		"e": new Vector( 1, 0),
		"se": new Vector( 1, 1),
		"s": new Vector( 0, 1),
		"sw": new Vector(-1, 1),
		"w": new Vector(-1, 0),
		"nw": new Vector(-1, -1)
	};

	function randomElement(array) {
		return array[Math.floor(Math.random() * array.length)];
	}