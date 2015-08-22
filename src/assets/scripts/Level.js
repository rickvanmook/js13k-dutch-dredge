function Level(width, height, start, solution) {

	var _this = this;

	_this.show = function(){

		_cells.forEach(hideCell);

		for(_i = 0; _i < width; _i++) {

			for(_j = 0; _j < height; _j++) {

				showCell(getCell(_i,_j));
			}
		}
	};
}