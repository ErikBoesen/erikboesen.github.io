const main = document.getElementsByTagName('main')[0],
      projects = document.getElementsByClassName('project');

const numColumns = Math.floor(main.innerWidth / 400);
let columns = [];
for (let columnNumber = 0; columnNumber < numColumns; columnNumber++) {
    let element = document.createElement('div');
    element.className = 'column';
    main.appendChild(element);
    columns.push({
        element,
        height: 0,
        items: [],
    });
}
for (let project of projects) {
    // Find shortest column
    let shortestColumn = null;
    for (let column of columns) {
        if (shortestColumn === null || column.height < shortestColumn.height) {
            shortestColumn = column;
        }
    }
    shortestColumn.element.appendChild(project);
    shortestColumn.height = shortestColumn.element.innerHeight;
}

