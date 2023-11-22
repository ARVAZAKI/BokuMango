let product = [
    {
        id: 0,
        image: '/images/mangga apel.webp',
        title: 'mangga apel',
        price: 9000
    },
    {
        id: 1,
        image: '/images/Mangga Alpukat.jpeg',
        title: 'mangga alpukat',
        price: 9000
    },
    {
        id: 2,
        image: '/images/Mangga golek.jpeg',
        title: 'mangga golek',
        price: 9000
    },
    {
        id: 3,
        image: '/images/Mangga malibu.webp',
        title: 'mangga malibu',
        price: 9000
    },
    {
        id: 4,
        image: '/images/Mangga arumanis.jpg',
        title: 'mangga arum manis',
        price: 9000
    },
    {
        id: 5,
        image: '/images/Mangga gedong gincu.webp',
        title: 'mangga gedong gincu',
        price: 9000
    },
    {
        id: 6,
        image: '/images/Mangga manalagi.jpg',
        title: 'mangga manalagi',
        price: 9000
    },
    {
        id: 7,
        image: '/images/mangga podang.jpg',
        title: 'mangga podang',
        price: 9000
    },
    {
        id: 8,
        image: '/images/mangga harummanis.jpg',
        title: 'mangga harum manis',
        price: 9000
    },
    {
        id: 9,
        image: '/images/mangga kwenijpg.jpg',
        title: 'mangga kweni',
        price: 9000
    },
    {
        id: 10,
        image: '/images/mangga indramayu.jpg',
        title: 'mangga indramayu',
        price: 9000
    },
    {
        id: 11,
        image: '/images/Mangga malibu.webp',
        title: 'mangga malibu',
        price: 9000
    },
]

const categories = [...new Set(product.map((item) =>{
    {return item}
}))]
let i = 0
function addToCart(a){
    cart.push({...categories[a]})
    displaycart()
}
function delElement(a){
    cart.splice(a,1)
    displaycart()
}
let cart = [];
function displaycart(a) {
    let j = 0, total = 0
   if(cart.length == 0){
    document.getElementById('cartItem').innerHTML = "Your Cart is Empty..."
    document.getElementById('total').innerHTML = "Rp ,-"
   }else{
    document.getElementById('cartItem').innerHTML = cart.map((items) => {
        let {image,title,price} = items
        total=total+price
        document.getElementById('total').innerHTML = "Rp "+total+",-"
        return(
            `<tr>
            <td>
            <button class="border-0 bg-transparent"><i class="bi bi-x-circle" onclick='delElement("+(j++)+")'></i></button>
          </td>
          <td class="d-flex">
            <img src="${image}" alt="" height="50" width="50">
            <p class="ms-2">${title} <br> 1kg</p>
          </td>
          <td>${price}</td>
          <td>1</td>
          <td>${price}</td>
          <tr>`
        )
    })
   }
}