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

	hoverCell(cellEl);

	// h is the hitField element corresponding with this cell
	cellEl.h.classList.add('no');

	// s stands for 'shown' so we can check whether or not this cell is in the level
	cellEl.s = cellEl.style.opacity = 0;
}

/**
 * @param {Element} cellEl
 */
function showCell(cellEl, delay) {

	cellEl.f = 0;
	cellEl.classList.remove(CSS_CLASS + CSS_CLASS);

	// h is the hitField element corresponding with this cell
	cellEl.h.classList.remove('no');

	setTimeout(function(){

		// s stands for 'shown' so we can check whether or not this cell is in the level
		cellEl.s = cellEl.style.opacity = 1;
		idleCell(cellEl);
	}, delay);


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
	cellEl.opacity = 1;
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
 * @param {Boolean} isResetAndCell
 */
function newLevel(isResetAndCell) {

	// isResetAndCell is used twice so we don't have to waste 4 chars declaring a local 'var '
	if(!isResetAndCell) {

		// start is a 36 character strings which hide, show and flip the cells for the start of a level
		_isPlaying = _start = levels.shift() || randomLevel();

		_cells.forEach(hideCell);
	}


	for (_y = 0; _y < _start.length; _y++) {

		if ((_x = _start[_y]) != ' ') {

			isResetAndCell = showCell(_cells[_y], 300 + _y*20);

			if(+_x) {
				flipCell(isResetAndCell);
			}
		}
	}
}

/**
 *
 */
function checkSolution() {

	for(var i = 0; i < _cells.length; i++) {


		if(_start[i] != ' ' && _cells[i].f != '0') {

			return
		}
	}

	celebrate();
}

function celebrate() {

	_x = _isPlaying = 0;


	for(_x; _x < _cells.length; _x++) {


		_y = _cells[_x];

		if(_y.s) {

			liftCell(_y, _x * 20);
		}
	}

	// 1200 is the total delay of all the timeouts from liftCell. _x *20 is the biggest delay from the loop.
	// it's ugly, I know... Nobody said it was going to be pretty
	setTimeout(newLevel, 1200 + _x * 20);

	function liftCell(cellEl, delay) {

		// wait until we have lowered the last clicked tiles
		setTimeout(function() {

			idleCell(cellEl);

			// lift all the cells with a little delay
			setTimeout(function() {

				hoverCell(cellEl);

				// lift all the cells with a little delay
				setTimeout(function() {

					// lower and fade out all the cells
					idleCell(cellEl);
					cellEl.style.opacity = 0;

				}, 300);
			}, delay + 300);
		}, 300);
	}
}

function randomLevel() {


	for(_x='',_y=0;_y<36;_y++){
		_x+=Math.round(Math.random());
	}

	return _x;
}