$(document).ready(function(){
    $(".trigger").change(function(){
        $.ajax({
            url: "https://itunes.apple.com/search?term="+$("#textInput").val()+"&limit="+getNumber($("#numberInput").val()),
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                console.log(result);
                takeInName(result);
            },
            error: function() { alert('Failed!'); }
        });
    });
});


function takeInName(result){
    if(result.resultCount<1&&$("#textInput").val()!=''){
        alert("Could Not Find Any Matches")
    }

    $("#table").empty();
    for(var i=0;i<result.resultCount;i++){
        $("#table").append("<tr><td><div id='song"+i+"'></div></td>"+"<td><div id='artist"+i+"'></div></td>"+"<td><img src='' id='image"+i+"'></img></td>"+'<td><audio controls="true" src="" id="audio'+i+'" type="audio/m4a"></audio></td>'+"<td id='price"+i+"'></td></tr>");

        $("#song"+i).text(result.results[i].trackName);
        $("#artist"+i).text(result.results[i].artistName);
        $("#price"+i).text("$"+result.results[i].trackPrice);

        $("#image"+i).attr('src',result.results[i].artworkUrl100);
        $("#audio"+i).attr('src',result.results[i].previewUrl);
    }
}


function getNumber(x){
    console.log("shit");
    if(x>30||x<1){
        $("#numberInput").val("30");
        console.log("hello");
        return 30;
    }else{
        return x;
    }
}