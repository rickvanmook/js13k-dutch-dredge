var levels = [
	'      '+
	' 1111 '+
	' 1111 '+
	' 1111 '+
	' 1111 '+
	'      '
	,

	'      '+
	' 0111 '+
	' 1111 '+
	' 0100 '+
	'      '+
	'      '
	,

	'      '+
	' 0001 '+
	' 0010 '+
	' 0100 '+
	' 1000 '+
	'      '
	,

	'      '+
	' 1100 '+
	' 1110 '+
	' 0111 '+
	' 0011 '+
	'      '
	,

	'101110'+
	'011001'+
	'011101'+
	'010111'+
	'111111'+
	'010010'

];

// because 'click' event has a MouseEvent parameter 'newLevel' will think it has the 'isReset' Boolean
R.addEventListener('click', newLevel);

newLevel();