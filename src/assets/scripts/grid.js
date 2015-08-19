var doc = document,
	TRANSFORM = 'rotateX(-25deg) rotateY(-45deg) translate3d(Apx,Bpx,0)',
	appendChild = 'appendChild',
	wrap = doc.body[appendChild](createDiv('wrap')),
	cells = [],
	x = 0,
	y,
	OFFSET_X = 0,
	OFFSET_Y = 0,
	ROWS = 6,
	COLUMNS = 6;





for(x; x < ROWS; x++) {

	for(y = 0; y < COLUMNS; y++) {

		cells.push(createCell(x,y));
	}
}

function createCell(x,y) {

	var sides = ['front','back','top','bottom','left','right'],
		container = wrap[appendChild](createDiv('cube cube-'+x+y));

	container.x = x;
	container.y = y;

	var _x = x*59.5 - y*59;
	var _y = y*39;

	var transform = TRANSFORM.replace('A',_x).replace('B',_y);
	console.log('x: ' + x + ', y: ' + y, transform);
	container.style.transform = transform;

	while(sides.length) {
		container[appendChild](createDiv(sides.shift()));
	}

	return container;
}

/**
 *
 * @param className
 * @returns {Element}
 */
function createDiv(className) {

	var div = doc.createElement('div');
	div.className = className;

	return div;
}
