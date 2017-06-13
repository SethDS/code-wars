
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