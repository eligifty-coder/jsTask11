let btns = document.querySelectorAll(".main button")
const contentArea = document.querySelector(".content-area")
const spinner = document.querySelector(".overlay")
const search = document.querySelector("#search")
let phoneDetails
let Myinterval;
let html = ''
btns = Array.from(btns)
function displayByName(data){
   let targetEle = event.target.value.trim()
   if(!targetEle.length){
      alert("true")
   }
   let reg = new RegExp(targetEle, "ig")
   let mappedData = data.map(item=>{
      let itemSplit =item.name.trim().split(" ")
      item = {...item, name: itemSplit};
      return item
   })
   let foundItem = mappedData.filter(item=>{
      return item.name.some(item=>{
         return reg.test(item)})
   })
   if(foundItem.length){
      html = ''
      clearInterval(Myinterval)
      const mappedFounditem = foundItem.map(item=>{
         let itemName = item.name.join(" ")
         item= {...item, name:itemName}
         return item
      })
      spinner.style.display="grid"
      Myinterval=setTimeout(()=>{
         spinner.style.display = 'none'
         let len = mappedFounditem.length==109? 0: mappedFounditem.length
         displaySpecific(len, mappedFounditem,contentArea)
      },3000)
   }else {
      spinner.style.display = 'grid'
      clearInterval(Myinterval)
      Myinterval= setTimeout(()=>{
         spinner.style.display = 'none'
         html=""
         alert('item not found')
         displaySpecific(0, [], contentArea);
      }, 3000)
   }
}

const displaySpecific= (len,data, area)=>{
   html=""
   let lens =len
   for(let i=0;i<lens;i++){
      html += `<article>
      <p>${data[i].name}</p>
      <a href="tel: ${data[i].number}"><i class="fa fa-phone"></i></a>
      </article>`;
   }
   area.innerHTML=html
}
const displayContact = (data)=>{
   spinner.style.display="grid"
   Myinterval= setTimeout(()=>{
      spinner.style.display="none"
      const len=20
      displaySpecific(len,data,contentArea)
      search.addEventListener('change',displayByName.bind(this, data));
   },3000)
}

const displayNum = async()=>{
   try{
      const Apiurl = 'https://emajency.com/js/numbers.json'
      const data =  await fetch(Apiurl)
   phoneDetails =  await data.json()
   displayContact(phoneDetails)
   }catch(error){
      alert(error.message)
   }
}
btns.forEach(item=>{
   
   item.onclick= ()=>{
      for(let i=0; i<btns.length;i++){
      btns[i].classList.remove("mystyle")
   }
   item.classList.add('mystyle')
      displayNum()
   }
   
})
window.onload = displayNum