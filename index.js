const indexedDB = 
  window.indexedDB
const request = indexedDB.open('CarDataBase',1);
request.onerror=function(err){
  console.error(err)
}
request.onupgradeneeded = function(){
  const db = request.result;
  const store = db.createObjectStore("cars", { keyPath: 'id', autoIncrement:true});
  store.createIndex("car_color",["colour"],{unique:false});
  store.createIndex("colour_and_make",["colour","make"],{unique:false});
}
request.onsuccess=function(context){
  const db = request.result;
  const transaction = db.transaction("cars","readwrite");
  const store = transaction.objectStore(["cars"])
  const color_index = store.index('car_color');
  const colour_and_make = store.index('colour_and_make');
  store.put({ id: 1, colour: 'red',make:'Toyota' })
  store.put({ id: 2, colour: 'red',make:'Kia' })
  store.put({ id: 3, colour: 'blue',make:'Handa' })
  const idQuery = store.get(3);
  const colourQuery = color_index.getAll(['red']);
  const colourmakeQuery = colour_and_make.get(['red','Kia']);
  // IDB是一个异步asyn的数据交互方式，你每次处理都要在一个回执里面进行才行。 每一次取直要透過onsuccess確保資料安全性
  colourmakeQuery.onsuccess=()=>{
    console.log(colourmakeQuery.result);
  }
}


// https://blog.csdn.net/a214161398a/article/details/54947991 (教學)