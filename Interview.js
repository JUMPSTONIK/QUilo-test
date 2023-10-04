

class Node
{
    constructor({ id, name, parentId })
    {
        this.id = id;
        this.name = name;
        this.parentId = parentId
        this.left = null;
        this.right = null;
        this.parent = null
    }

    setNode(node){
        if(!this.left){
            this.left = node
        }else{
            this.right = node
        }
    }

    get left(){
        return this._left
    }

    set left(node){
        this._left = node
        if(node){
            node.parent = this
        }
    }

    get right(){
        return this._right
    }

    set right(node){
        this._right = node
        if(node){
            node.parent = this
        }
    }
}


let getTree = (list) => {
    let nodes = {}
    
    let root = undefined
    list.forEach((json) => {
        //Create the node from each one of the elements
        let node = new Node(json)
        //Map it into the json
        nodes[`${json.id}`] = node
        //If no parent means the root
        if(!json.parentId){
            root = node
        }
    })
    
    Object.keys(nodes).map((id) => {
        let node = nodes[id]
        if(node.parentId){
            //Assign the relations
            nodes[`${node.parentId}`].setNode(node)
        }
    })
    return root
}

let treeJson = [
    {id: 1, name: "Pedro A"},
    {id: 2, name: "Pedro H", parentId : 1},
    {id: 3, name: "Lorena", parentId : 1},
    {id: 4, name: "Luis", parentId : 2},
    {id: 5, name: "Jimena", parentId : 3},
    {id: 6, name: "Lucia", parentId : 2},
    {id: 7, name: "Augusto", parentId : 6},
    {id: 8, name: "Hsing Li", parentId : 6},
    {id: 9, name: "Carmen", parentId : 8},
    {id: 10, name: "Gabriel", parentId : 7},
    {id: 11, name: "Juan", parentId : 7},
    {id: 12, name: "Isabella", parentId : 5},
    {id: 13, name: "Cristina", parentId : 5},
    {id: 14, name: "Julia", parentId : 10},
    {id: 15, name: "Javier", parentId : 11},
]

const tree = getTree(treeJson);

// console.log(tree);

const findById = (id, tree) =>{
    let nodesToSearch = [tree];
    let node = null
    while(nodesToSearch.length){
        node = nodesToSearch.pop()
        if (node.id === id) {
            return node;
        }
        if(node.right && node.left){
            nodesToSearch.push(node.right);
            nodesToSearch.push(node.left)
        }else if(node.right){
            nodesToSearch.push(node.right);
        }else if (node.left) {   
            nodesToSearch.push(node.left)
        }
    }
}


// const findDescendant = (level, tree) => {
//     let nodesToSearch = [{node: tree, level: 0}];
//     let nodesChildren = [];
//     let nodeChild = null
//     while(nodesToSearch.length){
//         nodeChild = nodesToSearch.pop();
//         if (nodeChild.level === level ){
//             if(nodeChild.node.right && nodeChild.node.left){
//                 nodesChildren.push(nodeChild.node.right);
//                 nodesChildren.push(nodeChild.node.left)
//             }else if(nodeChild.node.right){
//                 nodesChildren.push(nodeChild.node.right);
//             }else if (nodeChild.node.left) {   
//                 nodesChildren.push(nodeChild.node.left)
//             }
//         }else if(nodeChild.level <= level){
//             if(nodeChild.node.right && nodeChild.node.left){
//                 nodesToSearch.push({node: nodeChild.node.right, level: nodeChild.level + 1});
//                 nodesToSearch.push({node: nodeChild.node.left, level: nodeChild.level + 1});
//             }else if(nodeChild.node.right){
//                 nodesToSearch.push({node: nodeChild.node.right, level: nodeChild.level + 1});
//             }else if (nodeChild.node.left) {   
//                 nodesToSearch.push({node: nodeChild.node.left, level: nodeChild.level + 1});
//             }
//         }else{
//             break;
//         }
//     }
//     return nodesChildren
// }

// const nodeChildren = findDescendant(3, tree)
// console.log(nodeChildren)


const findDescendant = (level, tree) => {
    let nodesToSearch = [{node: tree, level: 0}];
    let nodesChildren = [];
    let nodeChild = null
    while(nodesToSearch.length){
        nodeChild = nodesToSearch.pop();
        if (nodeChild.level === level ){
            nodesChildren.push(nodeChild.node)
        }else if(nodeChild.level <= level){
            if(nodeChild.node.right){
                nodesToSearch.push({node: nodeChild.node.right, level: nodeChild.level + 1});
            } 
            
            if (nodeChild.node.left) {   
                nodesToSearch.push({node: nodeChild.node.left, level: nodeChild.level + 1});
            }
        }else{
            break;
        }
    }
    return nodesChildren
}

const nodeById = findById(2, tree)
console.log(nodeById)

const resNodes =  findDescendant(3, nodeById)
console.log('////////////////')
console.log(resNodes)