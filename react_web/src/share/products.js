

export const PI=3.14;
export const list = [
    {
    id: 101,
    name: "Mackbook Pro 2022"
},
{
    
        id: 102,
        name: "Mackbook Pro 2025"
},
{
    id: 103,
    name: "Mackbook Pro 2027"

},
]
export const getProductName = () => {
    return list[0].name
}
export const getProductByID = (id) => {

    //way1
    var item = {};
    for(var i = 0; i < list.length; i++) {
        if(id == list[i].id){
          item =list[i];
        // item.push(list[i]);
           break;
    }
}
return item;
// way2
//   var item = list.filter((row,index)=>row.id == id)
//   return item;
 }