export class DisjointSets {
    constructor() {
        this.noOfSets = 0;   
        this.arr = [];    
    }

    create(n) {
        this.noOfSets = n;
        for(let i = 0; i < n; i++) {
            this.arr.push({
                parent : i,
                size: 1 
            });
        }
    }

    find(i) {
        let current = i;
    
        while(this.arr[current].parent != current) {
            current = this.arr[current].parent;
        }

        return current;
    }

    union(i, j) {
        let temp;

        i = this.find(i);
        j = this.find(j);

        if(i == j) 
            return;

        if(this.arr[i].size < this.arr[j].size) {
            temp = i;
            i = j;
            j = temp;
        }

        this.arr[j].parent = i;
        this.arr[i].size += this.arr[j].size;
        this.noOfSets--;
    }
}

export class Queue {

    constructor() {
      this.first = 0;
      this.last = 0;
      this.storage = {};
    }
  
    enqueue(value) {
      this.storage[this.last] = value;
      this.last++;
    }
  
    dequeue() {
      if (this.last > this.first) {
        var value = this.storage[this.first];
        this.first++;
        return value;
      } else {
        return 0;
      }
    }

    front() {
        return this.storage[this.first];
    }
  
    size() {
      return this.last - this.first;
    }
  
  }

export class MinHeap {

    constructor () {
        this.heap = [null]  
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    getMin () {
        return this.heap[1]
    }
    
    insert (node) {

        this.heap.push(node)
        this.size++;

        if (this.heap.length > 1) {
            let current = this.heap.length - 1

            while (current > 1 && compare(this.heap[Math.floor(current/2)], this.heap[current])) {

                [this.heap[Math.floor(current/2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current/2)]]
                current = Math.floor(current/2)
            }
        }
    }
    
    remove() {
        
        if(this.size >= 1) {this.size--;}
        
        let smallest = this.heap[1];

        if (this.heap.length > 2) {
            this.heap[1] = this.heap[this.heap.length-1];
            this.heap.splice(this.heap.length - 1);

            if (this.heap.length === 3) {
                if (compare(this.heap[1], this.heap[2])) {
                    [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]];
                }
                return smallest;
            }

            let current = 1;
            let leftChildIndex = current * 2;
            let rightChildIndex = current * 2 + 1;

            while (this.heap[leftChildIndex] &&
                    this.heap[rightChildIndex] &&
                    (compare(this.heap[current], this.heap[leftChildIndex]) ||
                        compare(this.heap[current], this.heap[rightChildIndex]))) {
                if (compare(this.heap[rightChildIndex], this.heap[leftChildIndex])) {
                    [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]];
                    current = leftChildIndex;
                } else {
                    [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]];
                    current = rightChildIndex;
                }

                leftChildIndex = current * 2;
                rightChildIndex = current * 2 + 1;
            }
        }

        else if (this.heap.length === 2) {
            this.heap.splice(1, 1);
        } else {
            return null;
        }

        return smallest;
    }
}

function compare(node1, node2) {
    return (node1.priority > node2.priority);
}