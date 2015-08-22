var // this is the generic transform for the _cells, values A,B and C are dynamically replaced later
	TRANSFORM = 'rotateX(-25deg) rotateY(-45deg) translate3d(Apx,Bpx,0) rotateX(Cdeg)',
	CSS_CLASS = 'cssClass',
	appendChild = 'appendChild',
	_cells = [],
	_i=0,
	_j;


// 6 is a magic number representing the max number of cells on each sides
for(_i; _i < 6; _i++) {

	for(_j = 0; _j < 6; _j++) {

		createCell(_i,_j);
	}
}


function createCell(x,y) {

	var sides = ['front','back','top','bottom','left','right'],
		className = CSS_CLASS + x + y,

		// W is a reference to the wrapper div in the HTML file
		hitfieldEl = W[appendChild](createDiv('cube ' + className)),
		animationEl = W[appendChild](createDiv('cube no ' + className));


	hitfieldEl.x = animationEl.x = x;
	hitfieldEl.y = animationEl.y = y;
	hitfieldEl.f = animationEl.f = 0;



	// P is the id of the <style> tag (elements with an ID are globally accessible)
	P.innerHTML+=

	// hitfield
	'.' + className +'{transform:'+composeTransform(hitfieldEl,1)+'}'+

	// normal
	'.' + className + '.no{transform:'+composeTransform(hitfieldEl)+'}'+

	// flipped
	'.' + className + '.'+CSS_CLASS+CSS_CLASS+'.no{transform:'+composeTransform(hitfieldEl,0,1)+'}'+

	// flipped hover
	'.' + className + '.'+CSS_CLASS+CSS_CLASS+'.'+CSS_CLASS+'.no{transform:'+composeTransform(hitfieldEl,1,1)+'}'+

	// normal hover
	'.' + className + '.' + CSS_CLASS+'.no{transform:'+composeTransform(hitfieldEl,1)+'}';


	sides.forEach(function(side){

		animationEl[appendChild](createDiv(side))
	});


	hitfieldEl.innerHTML = animationEl.innerHTML;

	hitfieldEl.addEventListener('mouseover',onMouseOver);
	hitfieldEl.addEventListener('mouseout', onMouseOut);
	hitfieldEl.addEventListener('click', onClick);

	_cells.push(animationEl);
}

function onClick() {
	cellsAction(getCell(this.x,this.y), flipCell);
}

function onMouseOver() {

	cellsAction(getCell(this.x,this.y), hoverCell);
}

function onMouseOut() {

	cellsAction(getCell(this.x,this.y), idleCell);
}

function cellsAction(cell, method) {

	if(cell.s) {

		method(getCell(cell.x,cell.y));
		method(getCell(cell.x-1,cell.y));
		method(getCell(cell.x+1,cell.y));
		method(getCell(cell.x,cell.y-1));
		method(getCell(cell.x,cell.y+1));
	}
}


function composeTransform(cell, isHover, isFlipped) {

	var B = cell.y * 39;

	if(isHover) {

		B -= 10;
	}

	// these numbers are all magic numbers to make the cells fit our grid system
	return TRANSFORM.replace('A', cell.x * 59.5 - cell.y * 59)

		// multiplying with a boolean makes it go '* 1' for true or '* 0' for false
		.replace('B', B)
		.replace('C', !!isFlipped * 180);
}