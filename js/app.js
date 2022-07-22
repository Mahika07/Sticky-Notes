//if someone adds a note == add it to local storage
console.log("hello world");
shownotes()
let addbtn = document.getElementById("addbtn");

//add a note
addbtn.addEventListener('click', function (element) {
    let text = document.getElementById("addtxt");
    let title = document.getElementById("title");
    let obj = {
        heading: title.value,
        main: text.value
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push(obj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    text.value = "";
    title.value = "";
    shownotes();
});


//show notes
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    
    let impnotes = localStorage.getItem("impnotes");
    if (impnotes == null) {
        impnotes = [];
    }
    else {
        notesobjimp = JSON.parse(impnotes);
    }
    let impflag=0;
    let html = "";
    notesobj.forEach(function (element, index) {
        impflag=0;
        notesobjimp.forEach(function(e){
           
            if(element.heading==e.heading && element.main==e.main)
            { impflag=1;
                html = html + ` <div class="card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title" id="heading">${element.heading}</h5>
                  <button onclick="impnode(${index})" class="btn btn-primary star" style="background-color:white ; border:none ;height:2em">  <img src="/static/imp.png" alt="edit" style="
                  width: 1.2em;margin-bottom:2em; background-color:grey;"></button>
                  </div>
                  <p class="card-text" id="main"style="color:">${element.main}</p>
                  <div class="d-flex justify-content-between">
                  <button id="${index}"onclick="deletenode(this.id)" class="btn btn-primary" style="background-color:white; border:none">  <img src="/static/icondelt.png" alt="delete" style="
                   width: 2em; "></button>
        
                   <button id="${index}"onclick="editnode(this.id)" class="btn btn-primary" style="background-color:white; border:none">  <img src="/static/edit.png" alt="edit" style="
                   width: 2em; "></button>
        
                   
                   </div>
                </div>
              </div>`
            }
          
        })
           
        if(impflag==0){
            html = html + ` <div class="card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title" id="heading">${element.heading}</h5>
              <button onclick="impnode(${index})" class="btn btn-primary star" style="background-color:white ; border:none ;height:2em">  <img src="/static/star.png" alt="edit" style="
              width: 1.2em;margin-bottom:2em; background-color:grey;"></button>
              </div>
              <p class="card-text" id="main"style="color:">${element.main}</p>
              <div class="d-flex justify-content-between">
              <button id="${index}"onclick="deletenode(this.id)" class="btn btn-primary" style="background-color:white; border:none">  <img src="/static/icondelt.png" alt="delete" style="
               width: 2em; "></button>
    
               <button id="${index}"onclick="editnode(this.id)" class="btn btn-primary" style="background-color:white; border:none">  <img src="/static/edit.png" alt="edit" style="
               width: 2em; "></button>
    
               
               </div>
            </div>
          </div>`

        }
    });
    let notesElm = document.getElementById("notes");
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

//delete node
function deletenode(index) {
    let notes = localStorage.getItem("notes");
    note = JSON.parse(notes);
    let impobj = {
        heading: note[index].heading,
        main: note[index].main
    };
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj))
    shownotes();



    let impnotes = localStorage.getItem("impnotes");
    if (impnotes == null) {
        impnotes = [];
    }
    else {
        notesobj = JSON.parse(impnotes);
    }
    notesobj.forEach(function (element, index) {
        if (element.heading == impobj.heading && element.main == impobj.main) {
            notesobj.splice(index, 1);

            localStorage.setItem("impnotes", JSON.stringify(notesobj))
        }
    })

}

//search function


let search = document.getElementById("searchtxt");
search.addEventListener("input", function (e) {
    let inputval = search.value.toLowerCase();
    let notecard = document.getElementsByClassName("card");
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.innerText;
        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});


//edit icon
function editnode(val) {
    let i=-1;
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.forEach(function (element, index) {
        if (index == val) {
            let impnotes = localStorage.getItem("impnotes");
            if (impnotes == null) {
                impnotes = [];
            }
            else {
                notesobj = JSON.parse(impnotes);
            }
            notesobj.forEach(function (e, index){
                if (e.heading == element.heading && e.main == element.main) {
                   i=index
                }
            })
            
            let edithtml = ` <div class="card" style="width: 30rem;">

            <div class="card-body">
              <h6 class="card-title" >Edit The Note</h6>
              <textarea class="form-control" id="newtitle"  rows="1">${element.heading}</textarea>
      
              <div class="mb-3 my-3">
                <textarea class="form-control" id="newaddtxt"  rows="3">${element.main}</textarea>
                <div class="d-flex justify-content-between">
                <button onclick="right(${index},${i})" class="btn btn-primary" style="background-color:white; border:none">  <img src="/static/right.png" alt="delete" style="
                 width: 2em; "></button>
      
                 <button onclick="notedit()" class="btn btn-primary" style="background-color:white; border:none">  <img src="/static/close.png" alt="edit" style="
                 width: 2em; "></button>
                 </div>
          </div>
        </div>`
            document.getElementById("main").style.display = "none";
            document.getElementById("notes").innerHTML = edithtml;
        
          
        }
     
    })
}
function notedit() {
    location.reload();
}
function right(val,index) {

    let newtitle = document.getElementById("newtitle");
    let newtxt = document.getElementById("newaddtxt");
    let newobj = {
        heading: newtitle.value,
        main: newtxt.value
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(val, 1, newobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    location.reload();
if(index!=-1)
{
    let impnotes = localStorage.getItem("impnotes");
    if (impnotes == null) {
        impnotes = [];
    }
    else {
        notesobj = JSON.parse(impnotes);
    }
    notesobj.splice(index, 1, newobj);
    localStorage.setItem("impnotes", JSON.stringify(notesobj));
}
}

//imp node
function impnode(index) {
    let flag = 0;
    let notes = localStorage.getItem("notes");
    note = JSON.parse(notes);
    let impobj = {
        heading: note[index].heading,
        main: note[index].main
    };

    let impnotes = localStorage.getItem("impnotes");
    if (impnotes == null) {
        impnotes = [];
    }
    else {
        notesobj = JSON.parse(impnotes);
    }
    notesobj.forEach(function (element) {
        if (element.heading == impobj.heading && element.main == impobj.main) flag = 1;
    })
    if (flag == 0) {
        notesobj.push(impobj)
        localStorage.setItem("impnotes", JSON.stringify(notesobj));
    }
    if(flag==1){
        
        let notes = localStorage.getItem("notes");
        note = JSON.parse(notes);
        let impobj = {
            heading: note[index].heading,
            main: note[index].main
        };
        if (notes == null) {
            notesobj = [];
        }
        else {
            notesobj = JSON.parse(notes);
        }
    
       
        shownotes();
    
    
    
        let impnotes = localStorage.getItem("impnotes");
        if (impnotes == null) {
            impnotes = [];
        }
        else {
            notesobj = JSON.parse(impnotes);
        }
        notesobj.forEach(function (element, index) {
            if (element.heading == impobj.heading && element.main == impobj.main) {
                notesobj.splice(index, 1);
    
                localStorage.setItem("impnotes", JSON.stringify(notesobj))
            }
        })
    







    }
   shownotes()
    showImpNotes();
   
}
function showImpNotes() {
    let impnotes = localStorage.getItem("impnotes");
    if (impnotes == null) {
        impnotesobj = [];
    }
    else {
        impnotesobj = JSON.parse(impnotes);
    }

    let html = "";
    impnotesobj.forEach(function (element, index) {
        html = html + ` <div class="card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">${element.heading}</h5>
          <button id="${index}"onclick="Remove(this.id)" class="btn btn-primary" style="background-color:white ; border:none ;height:2em">  <img src="/static/imp.png" alt="edit" style="
          width: 1.2em;margin-bottom:2em; background-color:grey;"></button>
          </div>
          <p class="card-text" style="color:">${element.main}</p>
       
        </div>
      </div>`
    });
    let notesElm = document.getElementById("impcard");
    if (impnotesobj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }



}

//remove from important
function Remove(index) {
    let notes = localStorage.getItem("impnotes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem("impnotes", JSON.stringify(notesobj))
    showImpNotes();
}