let button = document.getElementById("calculate");
let startInput = document.getElementById("start");
let endInput = document.getElementById("end");
let functionInput = document.getElementById("function");
let nCountInput = document.getElementById("nCount");
let rectangleResult = document.getElementById("rectangle");
let trapezoidResult = document.getElementById("trapezoid");

let start, end, nCount, functionStr, rectangleRes, trapezoidRes, x ="";


eventListener();

function eventListener(){
    startInput.addEventListener("change", changeStart);
    endInput.addEventListener("change", changeEnd);
    functionInput.addEventListener("change", changeFunction);
    nCountInput.addEventListener("change", changeNCount);
}

function changeStart(e){
    start = parseFloat(e.target.value);
}
function changeEnd(e){
    end = parseFloat(e.target.value);
}

function changeFunction(e){
    functionStr = e.target.value;
}

function changeNCount(e){
    nCount = parseInt(e.target.value);
}


function calculate(){
    
    let newFunction = createNewFunction(functionStr);

    rectangleRes = calculateRectangle(start, end, newFunction, nCount);    
    trapezoidRes = calculateTrapezoid(start, end, newFunction, nCount);
    showResult();
}

function createNewFunction(functionStr){
    let arr = [], newStr = "";
    
    for(var i=0;i<functionStr.length;i++){
        arr[i] = functionStr.charAt(i);
    }

    for(var i=0;i<arr.length;i++){
        if(arr[i+1] == "^"){
            newStr = newStr + "Math.pow(" + arr[i] + "," + arr[i+2] + ")";
            if(arr[i+3]){
                i = i + 3;
            }else{
                break;
            }
            
        }
        newStr = newStr + arr[i];
    }

    return newStr;
}

function calculateRectangle(start, end, newFunc, nCount){
   let h = (end-start)/nCount;
   let res = 0, point = 0, x = 0;

   for(point = start;point<=end-h;point=point+h){
        x = point;
        edge = eval(newFunc)
        res += edge * h;
   }
   console.log(res);
   return res;
}

function calculateTrapezoid(start, end, newFunc, nCount){
    let h = (end-start)/nCount;
    let res = 0, point=0, x = 0;

    for(point=start;point<=end-h;point=point+h){
        x = point;
        firstEdge = eval(newFunc);
        x = point + h;
        secondEdge = eval(newFunc);
        middleEdge = (firstEdge + secondEdge) / 2;
        res += middleEdge * h;
    }
    console.log(res);
    return res;
}

function showResult(){
    rectangleResult.textContent = (Math.round(parseFloat(rectangleRes)*1000)/1000);
    trapezoidResult.textContent = (Math.round(parseFloat(trapezoidRes)*1000)/1000);
    
}

function clearInputs(){
    startInput.value = "";
    endInput.value = "";
    functionInput.value = "";
    nCountInput.value = "";
}
