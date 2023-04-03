let VoteNumber = 1;
const Elements = document.getElementsByClassName("vote"); //This gets all the elements with class "vote"

function RenderRating() {
    const VoteDiff = VoteNumber-1;
    for (let i = 0; i < Elements.length; i++) {
        if (i <= VoteDiff) {
            Elements.item(i).style.background = "#ff9933"
            Elements.item(i).style.color = "#ffffff"
        } else {
            Elements.item(i).style.background = "#394656"
            Elements.item(i).style.color = "#959eac"
        }
    }
};

RenderRating(); //Get a default state going for the rendering

function Clicked(num) {
    VoteNumber = num;
    console.log("Voting for: " + VoteNumber)
    RenderRating();
};

function onHover(num) {
    const newNum = num-1
    for (let i=0;i<Elements.length;i++){
        if (i<=newNum) {
            Elements.item(i).style.background = "#959eac"
            Elements.item(i).style.color = "#ffffff"
        } else if (i>=newNum) {
            Elements.item(i).style.background = "#394656"
            Elements.item(i).style.color = "#959eac"
        }
    }
};

function Submit() {
    if (VoteNumber > 0) {
        document.getElementById("MainFrame").style.visibility = "hidden";
        document.getElementById("CompletedFrame").style.visibility = "visible";
        document.getElementById("Select").innerText = `You selected ${VoteNumber} out of 5!`
    }
};