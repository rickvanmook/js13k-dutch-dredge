var doc = document,
	TRANSFORM = 'rotateX(-25deg) rotateY(-45deg) translate3d(Apx,Bpx,0)',
	ACTIVE_CLASS = appendChild = 'appendChild',
	wrap = doc.body[appendChild](createDiv('wrap')),
	hoverCss='',
	cells = {},
	x = 0,
	y,
	OFFSET_X = 0,
	OFFSET_Y = 0,
	ROWS = 6,
	COLUMNS = 6;


for(x; x < ROWS; x++) {

	for(y = 0; y < COLUMNS; y++) {

		cells[ACTIVE_CLASS+x+y] = createCell(x,y);
	}
}

var styleEl = doc.getElementsByTagName('style')[0];
styleEl.innerHTML = hoverCss;

function createCell(x,y) {

	var sides = ['front','back','top','bottom','left','right'],
		className = ACTIVE_CLASS+x+y,
		container = wrap[appendChild](createDiv('cube ' + className));

	container.x = x;
	container.y = y;


	hoverCss+= '.' + className + '{transform:'+positionCell(container)+'}';
	hoverCss+= '.' + className + '.'+ACTIVE_CLASS+'{transform:'+positionCell(container,1)+'}';

	while(sides.length) {
		container[appendChild](createDiv(sides.shift()));
	}

	container.addEventListener('mouseover',activateCells);
	container.addEventListener('mouseout', deactivateCells);

	return container;
}

function activateCells() {
	cellsAction(this, 'add');
}

function deactivateCells() {
	cellsAction(this, 'remove');
}

function cellsAction(cell, method) {

	getCell(cell.x,cell.y);
	getCell(cell.x-1,cell.y);
	getCell(cell.x+1,cell.y);
	getCell(cell.x,cell.y-1);
	getCell(cell.x,cell.y+1);

	function getCell(x,y){
		var actualCell = cells[ACTIVE_CLASS+x+y];
		if(actualCell && actualCell.b != method) {
			actualCell.b=method;
			actualCell.classList[method](ACTIVE_CLASS);
		}
	}
}


function positionCell(cell, isActive, isRotated) {

	var _x = cell.x*59.5 - cell.y*59;
	var _y = cell.y*39;

	if(isActive) {

		_y-=15;
	}

	return TRANSFORM.replace('A',_x).replace('B',_y);
}

/**
 * @param className
 * @returns {Element}
 */
function createDiv(className) {

	var div = doc.createElement('div');
	div.className = className;

	return div;
}
