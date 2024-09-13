import {Queue, MinHeap} from './dataStructures.js';
import {d, rows, columns, verticalWalls, horizontalWalls, showPath} from './main.js';

export function dfsSolver(initial, goal) {
    let stack = [];
    let visited = [];
    let current;
    let stop = false, skip = false;
    let k, ni, nj, u, v;
    
    for(let i = 0; i < rows; i++) {
        let visitedRow = [];
        for(let j = 0; j < columns; j++) visitedRow.push(false);
        visited.push(visitedRow);       
    }

    visited[initial[0]][initial[1]] = true;
    stack.push(initial);

    while(stack.length != 0 && !stop) {
        current = stack[stack.length - 1];

        if(current[0] == goal[0] && current[1] == goal[1])
            stop = true;

        skip = false;
        k = 0;

        while(k < 4 && !skip && !stop) {
            ni = current[0] + d[k];
            nj = current[1] + d[k + 1];
            
            u = Math.floor((current[0] + ni)/2);
            v = Math.floor((current[1] + nj)/2);

            if(d[k] == 0 && ni >= 0 && nj >= 0 && ni < rows && nj < columns && !verticalWalls[u][v] &&!visited[ni][nj]) {
                visited[ni][nj] = true;
                stack.push([ni, nj]);
                skip = true;
            }

            else if(d[k + 1] == 0 && ni >= 0 && nj >= 0 && ni < rows && nj < columns && !horizontalWalls[u][v] && !visited[ni][nj]) {
                visited[ni][nj] = true;
                stack.push([ni, nj]);
                skip = true;
            }

            k++;
        }

        if(!skip && !stop) {stack.pop();}
    }

    showPath(stack, 0);
}

export function aStarSolver(initial, goal) {
    let heap = new MinHeap(); 
    let visited = [];
    let prev = [];
    let currentCell, current;
    let stop;
    let k, ni, nj, u, v;
      
    for(let i = 0; i < rows; i++) {
        let visitedRow = [];
        let prevRow = [];
        for(let j = 0; j < columns; j++) {
            visitedRow.push(false);
            prevRow.push([]);
        }    
        visited.push(visitedRow);
        prev.push(prevRow);
    }

    prev[initial[0]][initial[1]].push(initial[0]);
    prev[initial[0]][initial[1]].push(initial[1]);
    visited[initial[0]][initial[1]] = true;
    heap.insert({
        indices: [initial[0], initial[1]],
        distance: 0,
        priority: Math.abs(initial[0] - initial[0]) + Math.abs(initial[1] - goal[1]) + 0
    });
    
    while(heap.getSize() != 0 && !stop) {
        currentCell = heap.remove();
        current = currentCell.indices;

        if(current[0] == goal[0] && current[1] == goal[1]) {
            stop = true;
        }

        for(k = 0; k < 4; k++) {
            ni = current[0] + d[k];
            nj = current[1] + d[k + 1];

            u = Math.floor((current[0] + ni)/2);
            v = Math.floor((current[1] + nj)/2);

            if(d[k] == 0 && ni >= 0 && nj >= 0 && ni < rows && nj < columns && !verticalWalls[u][v] && !visited[ni][nj]) {
                visited[ni][nj] = true;
                heap.insert({
                    indices: [ni, nj],
                    distance: current.distance + 1,
                    priority: Math.abs(current[0] - goal[0]) + Math.abs(current[1] - goal[1]) + current.distance + 1
                });
                prev[ni][nj].push(current[0]);
                prev[ni][nj].push(current[1]); 
            }
            
            else if(d[k + 1] == 0 && ni >= 0 && nj >= 0 && ni < rows && nj < columns && !horizontalWalls[u][v] && !visited[ni][nj]) {
                visited[ni][nj] = true;
                heap.insert({
                    indices: [ni, nj],
                    distance: current.distance + 1,
                    priority: Math.abs(current[0] - goal[0]) + Math.abs(current[1] - goal[1]) + current.distance + 1
                });
                prev[ni][nj].push(current[0]);
                prev[ni][nj].push(current[1]); 
            }
        }

    }
            
    showPath(createPath(prev, initial, goal), 0);       
}

export function bfsSolver(initial, goal) {
    let queue = new Queue();     
    let visited = [];
    let prev = [];
    let distance = 0;
    let current;
    let stop = false;
    let n, k, ni, nj, u, v;

    for(let i = 0; i < rows; i++) {
        let visitedRow = [];
        let prevRow = [];
        for(let j = 0; j < columns; j++) {
            visitedRow.push(false);
            prevRow.push([]);
        }    
        visited.push(visitedRow);
        prev.push(prevRow);
    }

    prev[initial[0]][initial[1]].push(initial[0]);
    prev[initial[0]][initial[1]].push(initial[1]);
    visited[initial[0]][initial[1]] = true;
    queue.enqueue(initial);

    while(queue.size() != 0 && !stop) {
        n = queue.size();
        
        while(n-- && !stop) {
            current = queue.dequeue();

            if(current[0] == goal[0] && current[1] == goal[1]) {
                stop = true;
            }

            for(k = 0; k < 4; k++) {
                ni = current[0] + d[k];
                nj = current[1] + d[k + 1];

                u = Math.floor((current[0] + ni)/2);
                v = Math.floor((current[1] + nj)/2);

                if(ni >= 0 && nj >= 0 && ni < rows && nj < columns) { 
                    if(d[k] == 0 && !verticalWalls[u][v] && !visited[ni][nj]) {
                        visited[ni][nj] = true;
                        queue.enqueue([ni, nj]);
                        prev[ni][nj].push(current[0]);
                        prev[ni][nj].push(current[1]); 
                    }

                    else if(d[k + 1] == 0 && !horizontalWalls[u][v] && !visited[ni][nj]) {
                        visited[ni][nj] = true;
                        queue.enqueue([ni, nj]);
                        prev[ni][nj].push(current[0]);
                        prev[ni][nj].push(current[1]); 
                    }
                }  
            }
        }

        distance++;
    }

   
    showPath(createPath(prev, initial, goal), 0);
}

function createPath(prev, initial, goal) {
    
    let reversePath = [];
    let currentCell = [goal[0], goal[1]];
    let previousCell = [prev[currentCell[0]][currentCell[1]][0], prev[currentCell[0]][currentCell[1]][1]];

    reversePath.push(goal);

    while(previousCell[0] != currentCell[0] || previousCell[1] != currentCell[1]) {
        reversePath.push([previousCell[0], previousCell[1]]);
        currentCell[0] = previousCell[0];
        currentCell[1] = previousCell[1];
        previousCell[0] = prev[currentCell[0]][currentCell[1]][0];
        previousCell[1] = prev[currentCell[0]][currentCell[1]][1];
    }

    let path = new Array(reversePath.length);

    for(let i = 0; i < reversePath.length; i++) {
        path[i] = reversePath[reversePath.length - 1 - i];
    }

    return path;
}