//const socket = io(); // ye code mera hai

//ye code chat gpt ka hai
let myId;

const socket = io();

socket.on("connect", () => {
  myId = socket.id;
 });  ///yaha tak code chat gpt ka hai



if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
       const {latitude, longitude} = position.coords;
       socket.emit("send-location", {latitude, longitude});

    }, (error)=>{
        console.error(error)
    },
    {
        enableHighAccuracy:true,
        timeout: 5000,
        maximumAge:0,
    }
);
}

const map = L.map("map").setView([0, 0], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);


const marker = {};

socket.on("recieve-location", (data)=>{
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude]);

    if(marker[id]){
        marker[id].setLatLng([latitude, longitude])
    }else{
        marker[id] = L.marker([latitude, longitude]).addTo(map)
    }
})

socket.on("user-disconnected", (id)=>{


//ye code mera hai
// if(marker[id]){
//     map.removeLayer(marker[id])
//     delete marker[id]
// }


//ye code chat gpt ka hai
if (id !== myId && marker[id]) {
    map.removeLayer(marker[id]);
    delete marker[id];
  }


})