//function to check range of numbers for numbers that contain a "5"
//return count of how many numbers did NOT have a 5 in them
function dontGiveMeFive(start, end)
{
  let i = start;
  let j = end;
  let num = 0;
  let result = [];

  while (i <= j) {
    if(i.toString().includes("5")){
      i++;
      continue;
    } else{
      result.push(i);
      i++;
    }
  }

  return(result.length);
}
