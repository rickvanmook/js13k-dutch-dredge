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

	cellEl.s = 0;
	cellEl.style.display = 'none';
}

/**
 * @param {Element} cellEl
 */
function showCell(cellEl) {

	cellEl.s = 1;
	cellEl.style.display = '';
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

	var method = (cellEl.f = !cellEl.f) ? 'add' : 'remove';
	cellEl.classList[method](CSS_CLASS + CSS_CLASS);
}