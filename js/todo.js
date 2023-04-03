let mode = "dark"
let Tab = "All"
let TodoId = 0

//Getting elements

var UserInput = document.getElementById("UserInput");
const Temp = document.getElementById('Template');
const TDList = document.getElementById('AllToDos');
const ItemsLeft = document.getElementById('Items-Left');

const CClear = document.getElementById('Control-Clear');

//VARIABLES FOR COLORS

let WhiteFront = "hsl(236, 33%, 92%)"
let WhiteBack = "hsl(0, 0%, 100%)"
let VeryDarkDesaturatedBlue = "hsl(235, 24%, 19%)"
let DaGB = "hsl(234, 11%, 52%)"

const Colors = {
    light: {
        Background: "hsl(0, 0%, 98%)",
        MainBG: "hsl(236, 33%, 92%)",
        Img: "./Assets/icon-moon.svg",
        TextCol: "hsl(233, 14%, 35%)",
        BorderCol: "hsl(234, 11%, 52%)",
        BGImg: "url(./Assets/bg-desktop-light.jpg)",
        TabHoverCol: "hsl(0, 0%, 0%)",
        TabInactive: "hsl(233, 14%, 35%)",
        TabActive: "hsl(220, 98%, 61%)",
    },

    dark: {
        Background:"hsl(235, 21%, 11%)",
        MainBG:"hsl(235, 24%, 19%)",
        Img: "./Assets/icon-sun.svg",
        TextCol: "hsl(234, 39%, 85%)",
        BorderCol: "hsl(237, 14%, 26%)",
        BGImg: "url(./Assets/bg-desktop-dark.jpg)",
        TabHoverCol: "hsl(234, 39%, 85%)",
        TabInactive: "hsl(233, 14%, 35%)",
        TabActive: "hsl(220, 98%, 61%)",
    }
};

//The ToDoList

let ToDoList = [
   
];

function UpdateItemsLeft() {
    let TDLen = ToDoList.length;
    ItemsLeft.innerText = (TDLen+ " items left");
}

function ChangeTab() { //0:Text 1:Checked 2:ID 3:TempClone?
    if (Tab === "All") { //This bs ain't doing sh?
        for (i=0;i<ToDoList.length;i++) {
            ToDoList[i][3].style.display = "flex";
            ToDoList[i][3].style.order = 0;
        }
    } else if (Tab === "Active") {
        let Actives = 0;
        for (i=0;i<ToDoList.length;i++) {
            if (ToDoList[i][1] === false) {
                Actives += 1;
                ToDoList[i][3].style.display = "flex"; 
                ToDoList[i][3].style.order = Actives;
            } else {
                ToDoList[i][3].style.display = "none";
                ToDoList[i][3].style.order = 5002;
            }
        }
    } else if (Tab === "Completed") {
        for (i=0;i<ToDoList.length;i++) {
            let Comple = 0;
            if (ToDoList[i][1] === true) {
                Comple += 1;
                ToDoList[i][3].style.display = "flex";
                ToDoList[i][3].style.order = Comple;
            } else {
                ToDoList[i][3].style.display = "none";
                ToDoList[i][3].style.order = 5002; //Order does not seem to change the render order we're rendering these, figure a new way out!
            }
        }
    }
};

function ResetTab() {
    const GetTabs = document.querySelectorAll('.Tab')
    GetTabs.forEach((Obj) => {
        const Val = Obj.getAttribute('value')
        Obj.style.color = Colors[mode].TabInactive;
        if (Val === Tab) {
            Obj.style.color = Colors[mode].TabActive;
        }
    });
};

document.querySelectorAll(".Tab").forEach(obj => {
    const Val = obj.getAttribute('value')

    obj.addEventListener("mouseenter", (e) => {
        obj.style.color = Colors[mode].TabHoverCol;
    });

    obj.addEventListener("mouseleave", (e) => { 
        if (Tab === Val) {
            obj.style.color = Colors[mode].TabActive;
        } else if (Tab !== Val) {
            obj.style.color = Colors[mode].TabInactive;
        }
    });

    obj.addEventListener('click', (e) => {
        Tab = Val;
        ResetTab();
        ChangeTab();
    });

});

CClear.addEventListener('mouseenter', (e) => {
    CClear.style.color = Colors[mode].TabHoverCol;
});

CClear.addEventListener('mouseleave', (e) => {
    CClear.style.color = Colors[mode].TabInactive;
})

function DeleteCompleted() {
    let Indexes = [

    ]

    for (i=0;i<ToDoList.length;i++) {
        if (ToDoList[i][1] === true) {
            Indexes.push(ToDoList[i][2])
        }
    }

    for (i=0;i<Indexes.length;i++){ 
        for (q=0;q<ToDoList.length;q++){
            if (ToDoList[q][2] === Indexes[i]) {
                ToDoList[q][3].remove()
                ToDoList.splice(q, 1);
            }
        }
    }

    UpdateItemsLeft();
};

function InputStart(Obj) { //when input starts (is on focus)
    Obj.style.color = Colors[mode].TextCol
};

function GetTodoById(Id){
    for (i=0;i<ToDoList.length;i++) {
        if (ToDoList[i][2] === Id) {
            return ToDoList[i];
        }
    }
    return null;
};

UserInput.addEventListener("keypress", function(event) { //enter press func for userinput
    if (event.key === "Enter") { //If the key pressed is "Enter" 
        const TempClone = Temp.cloneNode(true); //Clone the template
        TempClone.style.display="flex"; //Set visible
        TempClone.className = "ToDo BG";
        TodoId += 1;
        ToDoList.push([UserInput.value, false, TodoId, TempClone]); //We'll push em out as [TEXT,COMPLETED,ID,Temp?????]
        TempClone.value = TodoId; //Set the value?
        let CloneText = TempClone.querySelector('p'); //We get the paragraph
        let CloneCheck = TempClone.querySelector('div'); //The div (for checkbox)
        let CloneDel = TempClone.querySelector('img.del'); //Get the delete?
        let CheckBoxBackground = CloneCheck.querySelector('div'); //The background
        let CheckImg = CloneCheck.querySelector('img'); //The checkbox

        CloneCheck.addEventListener("click", (e) => {
            for (i in ToDoList) {
                if (ToDoList[i][2] === TempClone.value) {
                    if (ToDoList[i][1] === false) {
                        ToDoList[i][1] = true;
                        CheckImg.style.visibility="visible";
                        CloneCheck.style.backgroundImage = "linear-gradient(135deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
                        CheckBoxBackground.style.backgroundImage = "linear-gradient(135deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
                        CloneText.style.color = "hsl(233, 14%, 35%)";
                        CloneText.style.textDecoration = "line-through";
                    } else if (ToDoList[i][1] === true) {
                        ToDoList[i][1] = false;
                        CheckImg.style.visibility="hidden";
                        CloneCheck.style.backgroundImage = "hsl(233, 14%, 35%)";
                        CheckBoxBackground.style.backgroundImage ='';
                        if (mode === "dark") {
                            CloneText.style.color = "hsl(0, 0%, 98%)";
                        } else if (mode==="light") {
                            CloneText.style.color = VeryDarkDesaturatedBlue;
                        }
                        CloneText.style.textDecoration = "none";
                    }
                }
            }
        });

        CloneCheck.addEventListener("mouseenter", (e) => {
            CloneCheck.style.backgroundImage = "linear-gradient(135deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
        });

        CloneCheck.addEventListener("mouseleave", (e) => {
            const GetTodo = GetTodoById(TempClone.value);
            console.log(GetTodo[1])
            if (GetTodo[1] === true) { //If the todo is complete;
                CloneCheck.style.backgroundImage = "linear-gradient(135deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
            } else if (GetTodo[1] === false) { //If the todo is not complete;
                CloneCheck.style.backgroundImage = "none";
            }
        });

        CloneDel.addEventListener('click', (e) => {

            for (let i=0;i<=ToDoList.length;i++) {  //Bro never EVER forget .length again :skull:
                if (ToDoList[i][2] === TempClone.value) { //if todolist id == tempclone id
                    ToDoList.splice(i, 1); //destroiiiiiiiijairrijirjrjirijjikekkkekek
                    break;
                }
            };
            
            TempClone.remove(); //byebye
            UpdateItemsLeft();
        });

        CloneText.innerText = UserInput.value; //We set the text of the paragraph
        TDList.appendChild(TempClone); //We set the parent of the clone to the TDList
        UserInput.blur(); //Take the focus off of input field
        UserInput.value = ""; //Reset input field text
        UserInput.style.color = "hsl(233, 14%, 35%)"; //Reset input field text color
        UpdateItemsLeft();
    }
});

//./Assets/icon-check.svg

function UpdateColors(){
    const BGs = document.querySelectorAll('.BG');
    const Mode = document.getElementById('mode');
    const TodoP = document.querySelectorAll('.TP');
    const Items = document.querySelectorAll('.ToDo');
    const Template = document.getElementById('Template')

    //Set the page Body BG & Mode
    document.body.style.backgroundColor = Colors[mode].Background;
    document.body.style.backgroundImage = Colors[mode].BGImg;
    Mode.src = Colors[mode].Img;

    Template.borderBottomColor = Colors[mode].BorderCol

    //Set everything else
    BGs.forEach((Obj) => {
        Obj.style.backgroundColor = Colors[mode].MainBG
        if (Obj.id === 'UserInput') {
            Obj.color = Colors[mode].TextCol
        }
    });

    TodoP.forEach((Obj) => {
        if (Obj.style.textDecoration !== "line-through") {
            Obj.style.color = Colors[mode].TextCol
        }
    });

    Items.forEach((Obj) => {
        Obj.style.borderBottomColor = Colors[mode].BorderCol
    });

};

function ChangeMode() {
    if (mode === "dark") {
        mode = "light";
    } else if (mode === "light") {
        mode = "dark";
    }
    UpdateColors();
};