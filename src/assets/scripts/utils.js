// P is the id of the <style> tag (elements with an ID are globally accesable)
// we're using it as a dummy when we can't find a requested cell
P.b=P.f=0;

/**
 * @param {string} className
 * @returns {Element}
 */
function createDiv(className) {

	var div = document.createElement('div');
	div.className = className;

	return div;
}

/**
 * @param {int} x
 * @param {int} y
 * @returns {Element}
 */
function getCell(x,y){

	return _cells.filter(function(cellEl){
		return cellEl.x == x && cellEl.y == y
	})[0] || P
}

/**
 * @param {Element} cellEl
 */
function hideCell(cellEl) {

	// s stands for 'shown' so we can check whether or not this cell is in the level
	cellEl.s = 0;
	cellEl.f = 0;

	// h is the hitField element corresponding with this cell
	cellEl.h.style.display =
	cellEl.style.display = 'none';
}

/**
 * @param {Element} cellEl
 */
function showCell(cellEl) {

	// s stands for 'shown' so we can check whether or not this cell is in the level
	cellEl.s = 1;

	// h is the hitField element corresponding with this cell
	cellEl.h.style.display =
	cellEl.style.display = '';
	return cellEl
}

/**
 * @param {Element} cellEl
 */
function hoverCell(cellEl) {

	cellEl.classList.add(CSS_CLASS);
}

/**
 * @param {Element} cellEl
 */
function idleCell(cellEl) {

	cellEl.classList.remove(CSS_CLASS);
}

/**
 * @param {Element} cellEl
 */
function flipCell(cellEl) {

	// f stands for flipped.
	var method = (cellEl.f = !cellEl.f) ? 'add' : 'remove';
	cellEl.classList[method](CSS_CLASS + CSS_CLASS);
}

/**
 * @param {Array} params
 */
function newLevel(params) {

	// start and solution are 36 character strings which hide, show and flip the cells for the start of a level
	var cell;

	_start = params[0];
	_solution = params[1];

	_cells.forEach(hideCell);

	for(_y = 0;_y < _start.length; _y++) {

		if((_x = _start[_y]) != ' ') {

			cell = showCell(_cells[_y]);

			if(+_x > 0) {
				flipCell(cell);
			}
		}
	}
}

/**
 *
 */
function checkSolution() {

	for(var i = 0; i < _cells.length; i++) {


		if(_solution[i] != ' ' && _cells[i].f != _solution[i]) {

			return
		}
	}

	if(levels.length) {

		celebrate();
	}
}

function celebrate() {

	_x = _isPlaying = 0;


	for(_x; _x < _cells.length; _x++) {


		_y = _cells[_x];

		if(_y.s) {

			liftCell(_y, _x * 20);
		}
	}

	function liftCell(cell, delay) {

		idleCell(cell);

		setTimeout(function() {

			hoverCell(cell);

			setTimeout(function() {

				idleCell(cell);
				liftCell(cell, 380);
			}, 380);
		}, delay);
	}
}