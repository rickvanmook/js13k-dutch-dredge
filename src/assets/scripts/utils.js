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
	var start = params[0],
		solution = params[1],
		cell;

	_cells.forEach(hideCell);

	for(var i = 0; i < start.length; i++) {

		if((_x = start[i]) != ' ') {

			cell = showCell(_cells[i]);

			if(_x == '0') {
				flipCell(cell);
			}
		}
	}
}