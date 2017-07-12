
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

//Solution for level 5 Alphabet Wars Nuclear strike problem
function alphabetWar(battlefield) {
    var str = battlefield.split(''); //console.log(str);//working
    var groupArr = [];
    var shelterCoordinates = [];
    var bombCoordinates = [];
    var lastLettersStading = [];
    var returnString = [];

    //if there are no bombs, splice out brackets and return all the letters
    if(str.indexOf('#') === -1){
        for(var i = 0; i < str.length; i++){
            if(str[i] === '[' || str[i] === ']'){
                str.splice(i,1);
            }//end of if statement
        }//end of for loop
        return str.join('');
    }//end of if statement
    //everything here works like it should

    //get the coordinates for each of the shelters and bombs
    str.forEach((x,y) => {
        if(x === '[' || x === ']'){
        shelterCoordinates.push(y);
    } if(x === '#'){
        bombCoordinates.push(y);
    }
}); //working
    // console.log(bombCoordinates);

    //loop through each pair of coordinates, create an object for each shelter with its coordinates,
    //whether or not the letters are dead and each of the letters inside the shelter
    for(var j = 0; j < shelterCoordinates.length; j += 2) {

        groupArr.push({
            coors: [shelterCoordinates[j],shelterCoordinates[j + 1]],
            dead: false,
            letters: (function(){
                var letters = [];
                for(var l = shelterCoordinates[j] + 1; l < shelterCoordinates[j + 1]; l++){
                    letters.push(str[l])
                }
                return letters.join('');
            })()
        });

    } //working, groupArr looks the way it should

    //checking to see if there is only one bomb, if so, return all letters in shelters
    if(bombCoordinates.length === 1){
        groupArr.map((x) => {
            returnString.push(x.letters);
    })
        return returnString.join('');
    } //working

    //now, check to see if there is one shelter and more than one bomb, if true, return an empty string.
    else if(groupArr.length === 1 && bombCoordinates.length > 1){
        return '';
    }  //working

    //now, dealing with 2 shelters and more than one bomb
    else if(groupArr.length === 2 && bombCoordinates.length > 1){

        //check if more than one bomb in bombZone
        var bombTickerOne = 0;
        var bombTickerTwo = 0;

        for(var o = 0; o < bombCoordinates.length; o++){
            //Increment the bomb ticker for the first shelter if the bomb is in its bombZone, but not in the second shelter's.
            if(bombCoordinates[o] < groupArr[0].coors[0]){
                bombTickerOne++;
            }
            //   Increment the bomb ticker for the second shelter if the bomb is in its bombZone, but not in the first's shelter.
            if(bombCoordinates[o] > groupArr[1].coors[1]){
                bombTickerTwo++;
            }
            //Increment the bomb ticker for both shelters if the bomb is in their shared bombZone;
            if(bombCoordinates[o] > groupArr[0].coors[1] && bombCoordinates[o] < groupArr[1].coors[0]){
                bombTickerOne++;
                bombTickerTwo++;
            }
        }

        //check bombTicker amounts, if both are over one, return an empty string
        if(bombTickerOne < 2 && bombTickerTwo < 2){
            return  groupArr[0].letters + groupArr[1].letters;
        }
        else if(bombTickerOne > 1 && bombTickerTwo > 1){
            return '';
        } else if(bombTickerOne > 1 && bombTickerTwo < 2){  //if bombTickerOne is over one and bombTickerTwo isn't, return the letters from the second shelter joined in a string
            return groupArr[1].letters;
        } else if(bombTickerTwo > 1 && bombTickerOne < 2){ //if bombTickerTwo is over one and bombTickerOne isn't, return the letters from the first shelter joined in a string
            return groupArr[0].letters;
        }

    } //this block of code has achieved its objective

    //this is for when there are more than two shelters and more than one bomb
    //this code will loop through groupArr and create a bombTicker for each shelter
    //then, it will loop through groupArr again and check to see if any bomb coordinates fall within its bomb zone and increment its ticker in //bombTickers
    else if(groupArr.length > 2 && bombCoordinates.length > 1){

        var bombTickers = [];

        for(var p = 0; p < groupArr.length; p++){ //creating a bombTicker for each shelter
            bombTickers.push(0);
        }

        //loop through and check if any bombs fall inside the bombzone
        for(var q = 0; q < groupArr.length; q++){

            for(var r = 0; r < bombCoordinates.length; r++){

                // //this is for the first item in the array
                if(q === 0){
                    if(bombCoordinates[r] < groupArr[q].coors[0]){
                        bombTickers[q]++;
                    } if(bombCoordinates[r] > groupArr[q].coors[1] && bombCoordinates[r] < groupArr[q + 1].coors[0]){
                        bombTickers[q]++;
                    }
                }

                //this is for the last item in the array
                if(q === groupArr.length - 1){
                    if(bombCoordinates[r] > groupArr[q].coors[1]){
                        bombTickers[q]++;
                    } if(bombCoordinates[r] < groupArr[q].coors[0] && bombCoordinates[r] > groupArr[groupArr.length - 2].coors[1]){
                        bombTickers[q]++;
                    }
                }

                //checking bomb positions for all items that are not first or last
                if(q > 0 && q < groupArr.length - 1){
                    if(bombCoordinates[r] < groupArr[q].coors[0] && bombCoordinates[r] > groupArr[q - 1].coors[1]){
                        bombTickers[q]++;
                    } if(bombCoordinates[r] > groupArr[q].coors[1] && bombCoordinates[r] < groupArr[q + 1].coors[0]){
                        bombTickers[q]++;
                    }
                }

            }//end of r for loop
        }//end of q for loop

        //now, checking which shelters have a bomb count under two, add their letters to a string and return that
        for(var s = 0; s < groupArr.length; s++){
            if(bombTickers[s] < 2){
                returnString.push(groupArr[s].letters);
            }
        } //end of s for loop

        return returnString.join('');

    } //end of else if



}  //end of function














































