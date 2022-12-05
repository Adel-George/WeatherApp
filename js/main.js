const arrlist=[];
const Find=document.querySelector("#Find");
let contrylist;
async function weatherapi(list){
if(list==null){
contrylist="Cairo";
}
else{
contrylist=list;
}
const x = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${contrylist}&days=3`);
const y= await x.json();
arrlist.splice(0,1,y);
}
(async function(){
    await weatherapi(contrylist);
    cardTitle(arrlist);
    cardBody(arrlist);
})();

function cardTitle(list){
    const arrlist=[];
    arrlist.splice(0,1,...list[0].forecast.forecastday);
    const getWeekdaylist=document.querySelectorAll("#getWeekday");
    const getMonthlist=document.querySelector("#getMonth");

    for(let i=0;i<arrlist.length;i++){

        const datelist= new Date(arrlist[i].date);
        const getWeekday=datelist.toLocaleDateString('en-us', { weekday:"long"});
        const getMonth=datelist.toLocaleDateString('en-us', { month:"long"});
        const getDay=datelist.toLocaleDateString('en-us', { day:"numeric"});
        getWeekdaylist[i].innerHTML=getWeekday;

        if(i==0){
            getMonthlist.innerHTML=getDay+getMonth;
        }
    }
}

function cardBody(list){
    const arrlist=[];
    arrlist.splice(0,1,...list[0].forecast.forecastday);
    const arrhour=[];
    const datelist= new Date();
    const datetest=String(datelist.getHours());
    const cardlist=document.querySelector("#cardBody1");
    for(let i=0;i<arrlist.length;i++){

        arrhour.push(arrlist[i].hour);
        const divlist=document.querySelectorAll("#cardBody");
        if(i==0){
           let j;
          if(datetest.charAt(0)==0){
            j=Number(datetest.charAt(1));
          }else{
            j=Number(datetest);
          }
            divlist[i].innerHTML=`<small class="text-muted fs-5" id="location">${list[i].location.name}</small>
            <div class="card-title d-flex justify-content-between">
            <h5 first>${arrhour[i][j].temp_c}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-temperature-celsius" width="80" height="80" viewBox="0 0 28 28" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <circle cx="6" cy="8" r="2" /> <path d="M20 9a3 3 0 0 0 -3 -3h-1a3 3 0 0 0 -3 3v6a3 3 0 0 0 3 3h1a3 3 0 0 0 3 -3" /> </svg>
            </h5>
            <div class="d-lg-flex align-items-lg-center">
            <img src="http:${arrhour[i][j].condition.icon}" alt="weather" class="w-100">
          </div>
          </div>
            <small class="fs-5"id="East">${arrhour[i][j].condition.text}</small>
            <div class="card-text pt-3">
            <i class="fa-solid fa-temperature-half"></i>
            <small class="fs-5 px-1">${arrhour[i][j].heatindex_c}%</small>
           <i class="fa-solid fa-wind"></i>
           <small class="fs-5 px-1">${arrhour[i][j].wind_kph}km/h</small>
           <i class="fa-regular fa-compass"></i>
           <small class="fs-5 px-1">East</small>
          </div>`;
      }
        else{
          divlist[i].innerHTML =`
            <div>
              <img src="http:${arrhour[i][7].condition.icon}" alt="weather">
            </div>
            <small class="fs-3">${arrhour[i][7].temp_c}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-temperature-celsius" width="45" height="45" viewBox="0 0 28 28" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <circle cx="6" cy="8" r="2" /> <path d="M20 9a3 3 0 0 0 -3 -3h-1a3 3 0 0 0 -3 3v6a3 3 0 0 0 3 3h1a3 3 0 0 0 3 -3" /> </svg>
            </small>
            <h5 class="fs-5">${arrhour[i][18].temp_c}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-temperature-celsius" width="30" height="30" viewBox="0 0 28 28" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <circle cx="6" cy="8" r="2" /> <path d="M20 9a3 3 0 0 0 -3 -3h-1a3 3 0 0 0 -3 3v6a3 3 0 0 0 3 3h1a3 3 0 0 0 3 -3" /> </svg>
            </h5>
            <small class="fs-5" id="East">${arrhour[i][6].condition.text}</small>`;
        }
    }
}
Find.addEventListener("click", function(){
  const FindInput=document.querySelector("#FindInput");
  contrylist=FindInput.value;
  (async function(){
    await weatherapi(contrylist);
    cardTitle(arrlist);
    cardBody(arrlist);
})();
  FindInput.value="";
});
