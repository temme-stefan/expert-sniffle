import {lines} from "./5-data.js";

const testdata = [
    {from: {x: 0, y: 9}, to: {x: 5, y: 9}},
    {from: {x: 8, y: 0}, to: {x: 0, y: 8}},
    {from: {x: 9, y: 4}, to: {x: 3, y: 4}},
    {from: {x: 2, y: 2}, to: {x: 2, y: 1}},
    {from: {x: 7, y: 0}, to: {x: 7, y: 4}},
    {from: {x: 6, y: 4}, to: {x: 2, y: 0}},
    {from: {x: 0, y: 9}, to: {x: 2, y: 9}},
    {from: {x: 3, y: 4}, to: {x: 1, y: 4}},
    {from: {x: 0, y: 0}, to: {x: 8, y: 8}},
    {from: {x: 5, y: 5}, to: {x: 8, y: 2}},

];
const data = lines;

function getIntersections(cellLines) {
    const cellLineSets = cellLines.map(line => new Set(line.map(([x, y]) => `(${x}|${y})`)));

    let intersections = new Set();

    for (let i = 0; i < cellLineSets.length; i++) {
        for (let j = i + 1; j < cellLineSets.length; j++) {
            [...cellLineSets[i]].filter(cell => cellLineSets[j].has(cell)).forEach(c => intersections.add(c));
        }
    }
    return intersections;
}
const cellLines = data.map(x=> toCells(x)).filter(x => x.length > 0);
let intersections = getIntersections(cellLines);
console.log(`There are ${[...intersections].length} intersections of horizontal and vertical lines`);

const cellLines2 = data.map(x=> toCells(x,true)).filter(x => x.length > 0);
let intersections2 = getIntersections(cellLines2);
console.log(`There are ${[...intersections2].length} intersections of horizontal, vertical and diagonal lines`);

function toCells(line,withDiagonals=false) {
    const dirX = Math.sign(line.to.x-line.from.x);
    const dirY = Math.sign(line.to.y-line.from.y);
    const length = Math.max(Math.abs(line.to.x-line.from.x),Math.abs(line.to.y-line.from.y))+1;

    if (!withDiagonals && dirX != 0 && dirY != 0){
        return [];
    }
    return Array.from({length},(_,i)=>[line.from.x+i*dirX,line.from.y+i*dirY]);
}


