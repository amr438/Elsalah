let ddate = new Date()
function convertTo12HourFormat(time24) {
    // تقسيم الوقت إلى الساعات والدقائق
    const [hours24, minutes] = time24.split(':').map(Number);

    // تحديد ما إذا كان الوقت AM أو PM
    const period = hours24 >= 12 ? 'PM' : 'AM';

    // تحويل الساعات إلى تنسيق 12 ساعة
    const hours12 = hours24 % 12 || 12;
    // تنسيق الوقت بالتنسيق 12 ساعة
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}
// console.log(a.textContent)
let spans = document.querySelectorAll(".box span")
// جلب مواقيت الصلاة
function fetchData(city) {
    axios.get(`http://api.aladhan.com/v1/timingsByCity/date=${ddate}?country=eg&city=${city}`)
.then((response)=> {
    return  response.data.data.timings
}).then ((times)=> {

    spans.forEach((e) => {
            for(let time in times) {
                if (e.className === time) {
                    e.textContent = convertTo12HourFormat(times[time])
                    function storage() {
                        spans.forEach((e)=> {
                            localStorage.setItem(e.className , e.textContent)

                            
                        })
                    }storage()
                }
            }
        }) 

}      
)
}

function fetchDate() {
    axios.get(`http://api.aladhan.com/v1/timingsByCity/:date=${ddate}?country=eg&city=Cairo`)
    .then ((response)=> {
        let day = response.data.data.date.hijri.weekday.ar
        let date = response.data.data.date.readable
        console.log(date)
        let span = document.querySelector(".day")
        span.textContent = `${day}`
        localStorage.setItem("Day" ,day )
        let waqt = document.querySelector(".date")
        localStorage.setItem("Date" , date)
        waqt.textContent = date
    })
}
fetchDate()
// fetchData("Cairo")

let selected = document.querySelector(".selected")
let select = document.querySelector(".select")
let p = document.querySelectorAll(".change p")
p.forEach(function(e) {
    e.addEventListener("click" ,  ()=> {
        fetchData(e.className)
        let h2 = document.querySelector(".city")
        h2.textContent = e.textContent
        localStorage.setItem("City" , e.textContent)
    })
})
let click = true
selected.onclick = function () {
    if (click === true) {
        select.style.height = "870px"
        click = false
    }else {
        select.style.height = "40px"
        click = true
    }
    // click = !click
}
spans.forEach((e)=> {
    e.textContent = localStorage.getItem(e.className)
})
let day = document.querySelector(".day")
if (localStorage.getItem("Day")) {

    day.textContent = localStorage.getItem("Day")
}
let date = document.querySelector(".date")
if (localStorage.getItem("Date")) {

    date.textContent = localStorage.getItem("Date")
}
let city = document.querySelector(".city")
if (localStorage.getItem("City")) {

    city.textContent = localStorage.getItem("City")
}


console.log(ddate)