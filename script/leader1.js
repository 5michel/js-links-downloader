/*
  "Introduction"
*/
/*
  "Préselection des éléments"
*/
download = null
// RADIO BUTTON SELECTOR
let downloadOptions = document.querySelectorAll("input[name='download-type-radio']");
// ALL DOWNLOAD LINKS
function getAllLinks()
  {
    return Array.from(document.getElementsByClassName("mw-links"));
  }
let allLinks = getAllLinks();
let divLinks = Array.from(document.querySelectorAll(".center-div"));
function resetLinks()
  {
    allLinks = getAllLinks();
    divLinks = Array.from(document.querySelectorAll(".center-div"));
  }
// DEFAULT LINKS SELECTION
// SELECTED DOWNLOAD LINKS
let selectedLinks = [];
// RADIO TEXT INPUT
/*RANGE*/ let rangeTextInput = document.getElementById("download-range-text");
/*LIST*/  let listTextInput = document.getElementById("download-list-text");
let textInput = [rangeTextInput, listTextInput];
// (CACHE) RADIO TEXT INPUT
let textInputCache = ['','']
// TEST VARIABLE
//  let iA = 0;
//  console.log(`>${iA += 1}`);
/*
  "Charger le fichier..." <select file>
*/
document.getElementById('selected-file').addEventListener('change', function(event)
{
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    const lecteur = new FileReader();
    lecteur.onload = function(e) {
        let myData = e.target.result;
        //document.getElementById('contenu').textContent = e.target.result;
        let listA = myData.split('\n');
        let titre_mhw = listA[0].split('%%%-%%%')[0];
        let desc_mhw = listA[0].split('%%%-%%%')[1];
        //let listB = listA.slice(0,listA.length)
        let listLinks = [];
        document.getElementById("linksView").innerHTML = "";
        for(let i=1; i<listA.length; i++)
          {
            listLinks[i-1]= listA[i].split('%%%-%%%')[1];

            let aLink = document.createElement('a');
            aLink.classList.add("mw-links");
            //aLink.classList.add("selected-links-div");
            aLink.href = listLinks[i-1];
            aLink.innerHTML = "Document "+ i ;
            aLink.setAttribute('download','') ;
            //document.getElementsByClassName("linkView").appendChild(aLink);
            
            let divLink = document.createElement("div");
            divLink.classList.add("center-div");
            divLink.appendChild(aLink);
            divLink.id = "div-link-"+ i ;


            document.getElementById("linksView").appendChild(divLink);
            //document.getElementById("div-link-"+i).appendChild(aLink)
          }
    };
    lecteur.readAsText(selectedFile);
    
    resetLinks(); // .???
    verifyAtStart();
    //console.log("¤");
});
/*
  "Gestion du choix client" <select option>
*/
function  storeInput(num)
  {
    textInputCache[num] = textInput[num].value;
    textInput[num].value = "";
  }
function restoreInput(num)
  {
    textInput[num].value = textInputCache[num];
  }
function gesOption(num)
  {
    resetLinks();
    downloadOptions[num+1].addEventListener("change", () =>
      {
        restoreLinksView();
        if(downloadOptions[num+1].checked)
        {
          textInput[num].required = true;
          restoreInput(num);
          let noNum = 0;
          if(num===0){noNum = 1;}
          textInput[noNum].required = false;
          storeInput(noNum);
        }
      });
  }
downloadOptions[0].addEventListener("change", () =>
  {
    resetLinks();
    textInput[0].required.false;
    storeInput(0);
    textInput[1].required.false;
    storeInput(1);
    restoreLinksView();
    setAllLinksView();
  });
gesOption(0);
gesOption(1);
/*
  "Dynamisme du choix du client"
*/
function restoreLinksView()
  {
    allLinks.forEach(thisLink =>
      {
        thisLink.classList.remove('selected-links');
      });
    divLinks.forEach(thisDiv =>
      {
        thisDiv.classList.remove('selected-links-div');
      });
  }
function setAllLinksView()
  {
    allLinks.map(thisLink =>
      {
        thisLink.classList.add('selected-links');
      });
    divLinks.forEach(thisDiv =>
      {
        thisDiv.classList.add('selected-links-div');
      });
  }
function selectlinksByRangeOption()
  {
    restoreLinksView();
    let values = rangeTextInput.value.trim().split("-").map(Number);
    
    console.log(values);
    if (values.length === 2)
      {
        if(values[0] === 0){values[0] = 1;}
        if(values[1] === 0){values[1] = allLinks.length;}
        for(let i = values[0]; i <= values[1]; i++)
          {
            try
              {
                allLinks[i-1].classList.add('selected-links');
                divLinks[i-1].classList.add('selected-links-div');
              }
            catch
              {
                /* SORRY, NOTHING ! ;b */
              }
          }
      }
  }
function selectlinksByListOption()
  {
    restoreLinksView();
    let values = listTextInput.value.trim().split(",").map(Number);
    values.forEach(v =>
      {
        try
          {
            allLinks[v-1].classList.add('selected-links');
            divLinks[v-1].classList.add('selected-links-div');
          }
        catch
          {
            /* SORRY, NOTHING ! ;b */
          }
      });
  }
rangeTextInput.addEventListener("input", () =>
  {
    selectlinksByRangeOption();
  })
listTextInput.addEventListener("input", () =>
  {
    selectlinksByListOption();
    //console.log(values);
  })

/*
  "Réaction au chargement de la page"
*/
function verifyAtStart()
  {
    if(downloadOptions[0].checked)
      {
        setAllLinksView();
      }
    if(downloadOptions[1].checked)
      {
        selectlinksByRangeOption();
      }
    if(downloadOptions[2].checked)
      {
        selectlinksByListOption();
      }
  }
verifyAtStart();
/*
  "Télécharger les fichiers..." <submit>
*/
document.querySelector('form').addEventListener("submit",(event) =>
  {
    //
    event.preventDefault();
    endingMessage = "Téléchargements achevés!";
    //
    selectedLinks.map(thisLink =>
      {
        thisLink.classList.add('selected-download-links');
      });
    restoreLinksView();

    //selectedLinks = Array.from(document.getElementsByClassName("selected-download-links"));

    if(downloadOptions[0].checked)
      {
        alert("check-A");
        //downloadLaunch();
      } else if(downloadOptions[1].checked) // { Plage : téléchargement d'une plage }
      {
        //alert("check-B");
        clientText = document.getElementById("download-range-text").value;
        console.log(clientText);
        rangeEdges = clientText.split("-");
        if(rangeEdges.length !== 2)
          {
            endingMessage = "";
          }

      } else if(downloadOptions[2].checked) // { Liste : téléchargement d'une liste}
      {
        //alert("check-C");
        clientText = document.getElementById("download-list-text").value;
        console.log(clientText);
        elementsNumber = clientText.split(",");
        //elementsNumber = elementsNumber.
        selectedLinks = [];
        for(let i = 0; i < elementsNumber.length; i++)
          {
            //elementsNumber[i] = Number(elementsNumber[i]);
            selectedLinks.push(allLinks[Number(elementsNumber[i])]);
          }


      }
    alert(endingMessage);
  });
/*
  ""
*/
function downloadLaunch(){
  if(document.getElementById("download-all-radio").checked)
    {
      //let selectedLinks = Array.from(document.getElementsByClassName("selected-links"));
      let timeBetween = document.getElementById("spaced-timer").getAttribute("value");

      IsAllDownloading = true;
      downloadIndex = 0;
      while(IsAllDownloading)
        {
          IsDownloading = true;
          IsDowloaded = false;
          while(IsDownloading)
          {
            if(!IsDowloaded)
            {
              selectedLinks[downloadIndex].click();
              IsDowloaded = true;
            }
            setTimeout(()=>{
              IsDownloading = false;
            }, timeBetween*1000)
          }
          if(selectedLinks.length === downloadIndex )
            {
              IsAllDownloading=false;
            }


          downloadIndex += 1;
        }
    alert("Coldow!");
    }

}









/*
  "Element test..."
*/
