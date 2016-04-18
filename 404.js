var angle = 0;
var c = [
    [0, 136, 122],
    [86, 199, 201]
];
setInterval(function() {
    document.body.style.background = 'linear-gradient(' + angle + 'deg, rgb(' + c[0][0] + ',' + c[0][1] + ',' + c[0][2] + '), rgb(' + c[1][0] + ',' + c[1][1] + ',' + c[1][2] + ')';
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 3; j++) {
            c[i][j] = c[i][j] + (Math.ceil(Math.random() * 61) - 31);
        }
    }
    angle += 1;
}, 10);