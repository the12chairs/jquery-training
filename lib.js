
function loadSongs()
{
    $.get(
        'http://localhost/yii-training/index.php/api/list?model=songs',
        function(data){
            var answer = $.parseJSON(data);
            var buildList = '';
            answer.forEach(function(i){
                if(i.title == 'like')
                    buildList += '<div id = "'+ i.id+'"class="liked_block">';
                else
                    buildList += '<div id="'+ i.id+'" class="block">';
                    buildList +=
                                    '<div class="head">' +
                                        '<h2>'+ i.title + '</h2> <br/>' +
                                        '<a class="del" href="#" onclick="del('+ i.id+')">X</a>' +
                                    '</div>'+
                                    '<div class="message">'+
                                        '<p>'+ i.genres + '</p> <br/>' +
                                    '</div>'+
                                        '<a href="#" onclick="like(' + i.id + ');">Like</a>' +

                                '</div>';

            });
            $('#list').html(buildList);
            //alert(buildList);
        });
}


function del(id)
{
    $.ajax({
        url: 'http://localhost/yii-training/index.php/api/delete?model=songs&id='+id,
        type: 'DELETE',
        success: function(result) {
            $('#'+id).fadeOut();
            //alert('Success!');
        }
    });
}

// Let 'update' method be 'like' method

function like(id)
{
    $.ajax({
        url: 'http://localhost/yii-training/index.php/api/update?model=songs&id='+id,
        type: 'POST',
        data: 'title=like', // In case where we have 'like field'
        success: function(result) {
            alert('Success!');
        }
    });
}
// Main app
loadSongs();