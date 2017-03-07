// var tags = {
//   'China' : {'color' : 'green', 'next' : ['Japan', 'South Korea']},
//   'Japan' : {'color' : 'green', 'next' : null},
//   'South Korea' : {'color' : 'green', 'next' : ['Indonesia']},
//   'Indonesia' : {'color' : 'green', 'next' : null},
//   'Greece' : {'color' : 'red', 'next' : ['France', 'Germany']},
//   'France' : {'color' : 'red', 'next' : null},
//   'Germany' : {'color' : 'red', 'next' : ['England']},
//   'England' : {'color' : 'red', 'next' : null},
//   'Finland' : {'color' : 'red'},
//   'Norway' : {'color' : 'red'},
//   'Sweden' : {'color' : 'red'},
//   'Poland' : {'color' : 'red'},
//   'Belarus' : {'color' : 'red'},
//   'Chad' : {'color' : 'red'},
//   'Libya' : {'color' : 'red'}
// }

function buildObj(text){
  //console.log(text);
  tags.name = "1";
  arr = text.split("\n");
  //var jsonText = "{";
  for(var i = 0; i < arr.length; i++){
    //jsonText += '"'+arr[i]+'":"red",';
    var tmp = arr[i];
    tags[tmp] = {"color":"red"};
  }
  // jsonText = jsonText.slice(0,-1)+"}";
  // console.log(jsonText);
  // tags = JSON.parse(jsonText);
}


  // for(var i=1; i<text.length-1; i++){
  //   if(text[i] == "("){
  //     braceCount++;
  //   }else if(text[i] == ")"){
  //     braceCount--;
  //   }

  //   if(braceCount == 0){
  //     if(text[i] != ","){
  //       tmpStr+=text[i];
  //     }else{
  //       colorCountArr.push(tmpStr);
  //       tmpStr = "";
  //     }
  //   }else{
  //     tmpStr+=text[i];
  //   }
  // }
  // colorCountArr.push(tmpStr);


var root = null;
  var flag = false;
  var tmpTags = {};
  var prev = [];
  var tmpStr = "";
  var tmpStrArr = [];
  var colorCountArr = [];
  var braceCount = 0;

  for(var i=1; i<text.length-1; i++){
    if(text[i] == "("){
      braceCount++;
      flag = true;
      continue;
    }else if(text[i] == ")"){
      braceCount--;
      flag = false;
      if(braceCount == 2){
        root = null;
      }
      if(prev.length>0){
        prev.pop();
      }
      continue;
    }

    if(text[i] != ","){
      tmpStr+=text[i];
    }else{
      tmpStr = translate(tmpStr);
      tmpStrArr.push(tmpStr);
      if(braceCount == 0){
        colorCountArr.push(tmpStr);
        tmpTags[tmpStr] = {'color' : colors[colorCountArr.length-1], 'next' : null}
        tmpStr = "";
      }else{
        tmpTags[tmpStr] = {'color' : colors[colorCountArr.length-1], 'next' : null}
        
        if(root == null){root = tmpTags[tmpStr]}
        if(flag){
          prev.push(tmpStr);
          flag = false;
        }
        if(prev.length>0){
          if(tmpTags[prev[prev.length-1]].next){
            tmpTags[prev[prev.length-1]].next.push(tmpStr);
          }else{
            tmpTags[prev[prev.length-1]].next = [tmpStr];
          }
        }
        tmpStr = "";
      }
    }
  }
  tmpTags[tmpStr] = {'color' : colors[colorCountArr.length-1], 'next' : null}
  if(prev.length>0){
          if(tmpTags[prev[prev.length-1]].next){
            tmpTags[prev[prev.length-1]].next.push(tmpStr);
          }else{
            tmpTags[prev[prev.length-1]].next = [tmpStr];
          }
        }

  
  // for(var i=0; i<tmpStrArr.length; i++){
  //   tmpStrArr[i] = Object.values(JSON.parse('{"tmp":"' + tmpStrArr[i] +'"}'))[0];
  // }
  console.log(tmpTags);
  tags = tmpTags;