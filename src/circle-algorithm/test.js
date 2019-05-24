var Graph = require("graph-data-structure");

var graph = Graph()

var users = [
    { username: 'alon', edgeIn: 'e', edgeOut: 'a'},
    { username: 'sean', edgeIn: 'a', edgeOut: 'b'},
    { username: 'xx', edgeIn: 'o', edgeOut: 'i'},
    { username: 'ss', edgeIn: 'y', edgeOut: 'b'},
    { username: 'ff', edgeIn: 'a', edgeOut: 'u'},
    { username: 'bb', edgeIn: 'a', edgeOut: 'b'},
    { username: 'eliran', edgeIn: 'b', edgeOut: 'c'},
    { username: 'tom', edgeIn: 'c', edgeOut: 'e'},
    { username: 'moshe', edgeIn: 'c', edgeOut: 'q'},

]
users.forEach( node => {
    graph.addNode(node.username)
})

users.forEach( source => {
    users.forEach( destention => {
        console.log('source',source)
        console.log('destention',destention)
        if(source.username !== destention.username){
            if(source.edgeIn === destention.edgeOut){
                console.log('add edge')
                graph.addEdge(destention.username, source.username)
            }
        }
    })
})


console.log(graph.cycleDetection(['bb']))

