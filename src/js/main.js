var imgInfo= {
    f:{
        width: 1590,
        height:1067

    },
    m: {
        width: 971,
        height:652
    },
    s: {
        width: 263,
        height:177
    },
    tags: [
        {
            x:1,
            y:5,
            title: 'Mahtava',
            url: 'http://www.etuovi.com'
        }
    ]
}

$("#f").click(function(e){
    handleImgClick('f', e);
});


var edit=false;
$("#edit").click(function(e){
    edit= $("#edit").is(":checked");
});


handleImgClick = function(el, e){
    if(edit){
        var x = e.offsetX;
        var y = e.offsetY;
        console.log('el=' + el + ': x=' + x + ", y=" + y);

        var tag={
            x:x,
            y:y,
            title: 'new ' + x + y,
            url: 'http://www.etuovi.com/'+x+'/'+y
        }

        imgInfo.tags.push(tag)
        console.log(JSON.stringify(imgInfo));
    }
}




showTags=function(imageSizeIdentifier, imageEl){
    if(!edit){
        console.log("Would display tags");

        imgInfo.tags.forEach(function(tag){
            console.log(JSON.stringify(tag));
            var id="el_"+imageSizeIdentifier+"x"+tag.x+"y"+tag.y;

            var parentPosition = imageEl.offset();

            var tagPos = {
                parentx: parentPosition.left,
                parenty: parentPosition.top,

                fWidth: imgInfo.f.width,
                fHeight: imgInfo.f.height,

                tagx: tag.x,
                tagy: tag.y,

                versionWidth: imgInfo[imageSizeIdentifier].width,
                versionHeight: imgInfo[imageSizeIdentifier].height,

                top: Math.round(imgInfo[imageSizeIdentifier].height/imgInfo.f.height*tag.y),
                left: Math.round(imgInfo[imageSizeIdentifier].width/imgInfo.f.width*tag.x)

            }





            console.log(JSON.stringify(tagPos));


            var tagEl = $('#'+id);
            if(tagEl.length){
                console.log("Displaying already created el " + id);
                tagEl.css({top: tagPos.top, left:tagPos.left, display:'block'});
            }else{
                console.log("Adding new dom element " + id);
                tagEl=$('<div id="' + id + '" class="imgtag">TAgi</div>').css({top: tagPos.top, left:tagPos.left, display:'block'});
                imageEl.parent().append(tagEl);
            }

        })

    }
}

hideTags=function(imageSizeIdentifier, imageEl){
    if(!edit){
        console.log("Would hide tags");

        imgInfo.tags.forEach(function(tag) {
            console.log(JSON.stringify(tag));
            var id = "el_" + imageSizeIdentifier + "x" + tag.x + "y" + tag.y;
            var tagEl = $('#' + id);
            if (tagEl.length) {
                console.log("Hiding already created el " + id);
                tagEl.hide();
            } else {
                console.log("Nothing to do, no dom element found " + id);
            }
        });
    }
}

$( "#f" )
    .mouseover(function() {
        showTags("f", $('#f'));
    })
    .mouseout(function() {
        hideTags("f", $('#f'));
    });

$( "#m" )
    .mouseover(function() {
        showTags("m", $('#m'));
    })
    .mouseout(function() {
        hideTags("m", $('#medium_plus'));
    });

$( "#s" )
    .mouseover(function() {
        showTags("s", $('#s'));
    })
    .mouseout(function() {
        hideTags("s", $('#s'));
    });
