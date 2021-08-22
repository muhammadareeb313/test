let signUp=()=>{
    var email =document.getElementById('email').value
    var password =document.getElementById('password').value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      
      window.location.href="signin.html"
console.log(user);
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

let signIn=()=>{

    var email =document.getElementById('s-email').value
    var password =document.getElementById('s-password').value
   firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    var admin=document.getElementById('Admin')
    var user=document.getElementById('user')
    if(user.checked){
        window.location.href="user.html"
    }else if(admin.checked){
        window.location.href="restaurent.html"
    }else{
      alert("please select any one category")
    }

  })
  .catch((error) => {
      
    var errorMessage = error.message;
console.log(errorMessage);
});
}
var imgName;

let send=()=> {
  var img=document.getElementById('file').files[0]
  console.log(img);
   imgName =img.name
  var select= document.getElementById("Select").value
console.log(select);
var itemn =document.getElementById("itemn").value
var price =document.getElementById("price").value
var restraunt =document.getElementById("Restaurent").value

var Delivery =document.getElementById("Delivery").value

var storage = firebase.storage().ref("images").child(imgName)
storage.put(img).then((sucses)=>{
  console.log(sucses)
}).catch((error)=>{
  console.log(error)
})
firebase.storage().ref("images").child(imgName).getDownloadURL().then((url)=>{
  console.log(url)
// console.log(itemn,price,Delivery);
let obj={
  url,
    select,
    itemn,
    price,
    Delivery,
    restraunt,
}
console.log(obj);
var key = Math.random()*12345
firebase.database().ref("cart").push(obj)

}).catch((error)=>{
  console.log(error);
})

  }

  
  let get=()=>{

  firebase.database().ref("cart").on("child_added",function(data){
    var a =data.val() 
    console.log("cart data ==>", a);
    let main =document.getElementById('cart1')
   main.innerHTML+=`
  <div class="card" style="width: 18rem;">
    <img src="${a.url}" style="width: 100%; class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${a.select +"<br>"}</h5>
      <h5 class="card-title">${a.restraunt +"<br>"}</h5>
      <p class="card-text">${a.price}</p>
      <p class="card-text">${a.Delivery}</p>
      <button onclick='addToCart("${a.select}","${a.price}","${a.restraunt}")' class="btn btn-primary">ADD TO CART</button> 
      
    </div>
  </div> `
   })
  

}

 function addToCart(category,price,restraunt){
  var obj={category,
      price,
      restraunt}
      console.log(obj);
 firebase.database().ref('order').push(obj)
    }

let load=()=>{
  firebase.database().ref("cart").once("value",function(data){
    console.log( data.val())  
 })
 get()
}
// }

let order=()=>{

  firebase.database().ref('order').on("value",function(data){
    var a =data.val() 
    console.log("cart data ==>", a);
    let main =document.getElementById('ord')
   main.innerHTML+=`
  <div class="card" style="width: 18rem;">
    <img src="${a.url}" style="width: 100%; class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${a.select +"<br>"}</h5>
      <h5 class="card-title">${a.restraunt +"<br>"}</h5>
      <p class="card-text">${a.price}</p>
      // <p class="card-text">${a.Delivery}</p>
      // <button onclick='addToCart("${a.select}","${a.price}","${a.restraunt}")' class="btn btn-primary">ADD TO CART</button> 
      
    </div>
  </div> `
   })
  

}