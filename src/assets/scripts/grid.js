var // this is the generic transform for the cells, values A,B and C are dynamically replaced later
	TRANSFORM = 'rotateX(-25deg) rotateY(-45deg) translate3d(Apx,Bpx,0) rotateX(Cdeg)',
	ACTIVE_CLASS = 'cssClass',
	appendChild = 'appendChild',
	injectCss='',
	cells = {},
	x = 0,
	y,
	ROWS = 6,
	COLUMNS = 6;


for(x; x < ROWS; x++) {

	for(y = 0; y < COLUMNS; y++) {

		cells[ACTIVE_CLASS+x+y] = createCell(x,y);
	}
}


// P is the id of the <style> tag (elements with an ID are globally accesable)
P.innerHTML=injectCss;

function createCell(x,y) {


	var sides = ['front','back','top','bottom','left','right'],
		className = ACTIVE_CLASS+x+ y,

		// W is a reference to the wrapper div in the HTML file
		hitfieldEl = W[appendChild](createDiv('cube ' + className)),
		animationEl = W[appendChild](createDiv('cube no ' + className));


	hitfieldEl.x = animationEl.x = x;
	hitfieldEl.y = animationEl.y = y;
	hitfieldEl.f = animationEl.f = 0;


	// hitfield
	injectCss+= '.' + className +'{transform:'+positionCell(hitfieldEl,1)+'}';

	// normal
	injectCss+= '.' + className + '.no{transform:'+positionCell(hitfieldEl)+'}';

	// flipped
	injectCss+= '.' + className + '.'+ACTIVE_CLASS+ACTIVE_CLASS+'.no{transform:'+positionCell(hitfieldEl,0,1)+'}';

	// flipped hover
	injectCss+= '.' + className + '.'+ACTIVE_CLASS+ACTIVE_CLASS+'.'+ACTIVE_CLASS+'.no{transform:'+positionCell(hitfieldEl,1,1)+'}';


	// normal hover
	injectCss+= '.' + className + '.' + ACTIVE_CLASS+'.no{transform:'+positionCell(hitfieldEl,1)+'}';



	while(sides.length) {
		animationEl[appendChild](createDiv(sides.shift()));
	}


	hitfieldEl.innerHTML = animationEl.innerHTML;

	hitfieldEl.addEventListener('mouseover',activateCells);
	hitfieldEl.addEventListener('mouseout', deactivateCells);
	hitfieldEl.addEventListener('click', flipCells);

	return animationEl;
}

function flipCells() {
	cellsAction(this, 1);
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

		if(actualCell) {
			if (method == 1) {

				actualCell.f = !actualCell.f;
				actualCell.classList[(actualCell.f) ? 'add' : 'remove'](ACTIVE_CLASS + ACTIVE_CLASS);

			} else if (actualCell.b != method) {


				actualCell.b = method;
				actualCell.classList[method](ACTIVE_CLASS);
			}
		}
	}
}


function positionCell(cell, isActive, isRotated) {

	var _x = cell.x*59.5 - cell.y*59;
	var _y = cell.y*39;
	var _z = isRotated ? 180 : 0;

	if(isActive) {

		_y-=10;
	}

	return TRANSFORM.replace('A',_x).replace('B',_y).replace('C',_z);
}

/**
 * @param className
 * @returns {Element}
 */
function createDiv(className) {

	var div = document.createElement('div');
	div.className = className;

	return div;
}
