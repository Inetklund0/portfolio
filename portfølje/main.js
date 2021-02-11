// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
const prosjektcontainer = document.querySelector('#prosjekt')

var firebaseConfig = {
    apiKey: "AIzaSyBoJBjxFoyypAlIIF-PbJzJSITFTPu_Zjg",
    authDomain: "portfolio-test-42564.firebaseapp.com",
    projectId: "portfolio-test-42564",
    storageBucket: "portfolio-test-42564.appspot.com",
    messagingSenderId: "547538253793",
    appId: "1:547538253793:web:75f55f049dd3fc0f2c84a0"
  };
  // Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = flamelink({
 firebaseApp,
 dbType: 'cf' //cloud firestore
});

app.content.get({
    schemaKey: 'prosjekter', //navnet på skjemaet
    populate:[
        {
            field: 'moodboard',
            size:{
                height: 9999,
                quality: 1,
                width: 667
            }
        },
        
        {
            field: 'skisse',
            size:{
                height: 9999,
                quality: 1,
                width: 667
            }
        },
        {
            field: 'skissen',
            size:{
                height: 9999,
                quality: 1,
                width: 667
            }
        },
        {
            field: 'skisser',
            size:{
                height: 9999,
                quality: 1,
                width: 667
            }
        }
    ]
})
.then(prosjekter=>{
    console.log('alle prosjekter:', prosjekter)
    let listingHtml = ""

for (const property in prosjekter){
    let proj = prosjekter[property];
             
    listingHtml += `
    <div class="container">
        <div class="text">
            <h3 id="interesse">${proj.prosjekttittel}</h3>
            <span style="font-size:22px; cursor:pointer; overflow: scroll;" onclick="openNav('${proj.id}')"> Les mer om prosjektet her <br><br> ${proj.moodboard ? `<img src="${proj.moodboard[0]?.url}" >` : "" }</span>
            
        </div>
        <div class="overlay" id="${proj.id}">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <div class="overlay-content">
            <h2>${proj.prosjekttittel}</h2>
            <p>${proj.prosjekteier}</p>
            <p>${proj.problembeskrivelse}</p>
            ${proj.moodboard ? `<img src="${proj.moodboard[0]?.url}" >` : "" } 
            <h3>${proj.prosess}</h3>
            <p>${proj.prosessbeskrivelse}</p>
            <h3>${proj.malgruppe}</h3>
            <p>${proj.malgruppebeskrivelse}</p>
            <h3>${proj.losningtittel}</h3>
            <p>${proj.losning}</p>
            <img src="${proj.skisse[0]?.url}" >
            <br><br>
            ${proj.skisser ? `<img src="${proj.skisser[0]?.url}" >` : "" }   
            <br><br>
            ${proj.skissen ? `<img src="${proj.skissen[0]?.url}" >` : "" }   
        </div>
    </div>
    
`}
    prosjektcontainer.innerHTML = listingHtml
})
    
function openNav(id) {
    document.getElementById(id).style.display = "block";
}
      
function closeNav() {
    document.querySelectorAll(".overlay")
        .forEach(el => el.style.display = "none")  
}