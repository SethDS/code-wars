
//Solution to the Level 5 Codewars problem: 'What's a Perfect Power anyway?'
//Given a number, see if it's a perfect power.  Works for very large numbers too.
var isPP = function(n){

    if(n < 1){
        return null;
    }

    var half = Math.sqrt(n);

    if(n < 9){
        half = n/2;
    } else if(n > 100000000){
        half = Math.sqrt(Math.sqrt(n));
    }

    for(var i = 2; i <= half; i++){
        var y = 2;

        while(y <= half){
            if(Math.pow(i,y) == n){
                return [i,y];
            }
            y++;
        }

    }

    return null;


};
//Best solution NOT MINE
function isPP(n) {
    for (var m = 2; m * m <= n; ++ m)
        for (var k = 2; Math.pow(m, k) <= n; ++ k)
            if (Math.pow(m, k) == n) return [m, k];
    return null;
}

isPP(25);

//Working on solution for level 5 alphabetWars problem
function alphabetWar(battlefield) {
    var str = battlefield.split(''); //console.log(str);//working
    var groupArr = [];
    var shelterCoordinates = [];
    var bombCoordinates = [];
    var lastLettersStading = [];

    if(str.indexOf('#') === -1){
        for(var i = 0; i < str.length; i++){
            if(str[i] === '[' || str[i] === ']'){
                str.splice(i,1);
            }//end of if statement
        }//end of for loop
        return str.join('');
    }//end of if statement
    //everything here works like it should

    str.forEach((x,y) => {
        if(x === '[' || x === ']'){
        shelterCoordinates.push(y);
    } if(x === '#'){
        bombCoordinates.push(y);
    }
}); //working
    // console.log(bombCoordinates);

    for(var j = 0; j < shelterCoordinates.length; j += 2) {

        groupArr.push({
            coors: [shelterCoordinates[j],shelterCoordinates[j + 1]],
            dead: false,
            bombZone: [],
            letters: (function(){
                var letters = [];
                for(var l = shelterCoordinates[j] + 1; l < shelterCoordinates[j + 1]; l++){
                    letters.push(str[l])
                }
                return letters.join('');
            })()
        });

    };//working, groupArr looks the way it should

    if(groupArr.length === 1 && bombCoordinates.length > 1){
        return '';
    } else if(groupArr.length === 2){

    }

//    for(var m = 0; m < groupArr.length; m++){

//    }
    console.log(groupArr)

}