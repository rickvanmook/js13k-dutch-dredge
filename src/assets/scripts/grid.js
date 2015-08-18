var doc = document,
	appendChild = 'appendChild',
	wrap = doc.body[appendChild](createDiv('wrap')),
	cells = [],
	i = 1;


for(i; i <= 2;i++) {

	cells.push(createCell('cube-' + i));
}

function createCell(cubeName) {

	var sides = ['front','back','top','bottom','left','right'],
		container = wrap[appendChild](createDiv('cube ' + cubeName));

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
