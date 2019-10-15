let gallery = [];
let videos = [];

$(document).ready(function (event) {

    loadJson();

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.onscroll = function () {
        scrollBtn();
    }

    $('.Xbtn').click(function () {
        $(this).parent().parent().fadeOut(150);
    })

    setTimeout(function () {
        $('.spinnerWrapper').hide();
    }, 500);
});

function loadJson() {
    $.get('./lists/videos.txt', function (data) {
        videos.push(JSON.parse(data));
        setTimeout(function () {
            buildEvents($('#videoContainer'), videos, 2);
        }, 500);
    });

    $.get('./lists/gallery.txt', function (data) {
        gallery.push(JSON.parse(data));
        setTimeout(function () {
            buildEvents($('#galleryContainer'), gallery, 1);
        }, 500);
    });
}

function goToDiv(div) {
    if ($(window).width() > 765) {
        $('html, body').animate({ scrollTop: $(div).position().top -210 }, 'slow');
    } else {
        $('html, body').animate({ scrollTop: $(div).position().top -190}, 'slow');
    }
}

function buildEvents(wrapper, arr, num) {

    let friends;
    let headerText;
    let containerToAppend;
    let eventClass;

    switch(num) {
        case 1:
            friends = arr[0].gallery;
            headerText = 'Gallery';
        break;
        case 2:
            friends = arr[0].videos;
            headerText = 'Videos';
        break;
    }


    let header = $('<h2>', {
        text: headerText
    }).appendTo(wrapper);

    switch(num) {
        case 1:
            var galleryWrapper = $('<div>', {
                class: 'galleryWrapper',
            }).appendTo(wrapper);
            break;
        case 2:
            var videoWrapper = $('<div>', {
                class: 'videoWrapper',
            }).appendTo(wrapper);
            break;
    }

    for (let i = 0; i < friends.length; i++) {

        switch(num) {
            case 1:
                containerToAppend = galleryWrapper;
                eventClass = 'galleryImgWrapper';
                break;
            case 2:
                containerToAppend = videoWrapper;
                eventClass = 'videoContainer';
                break;
        }
        
        switch (num) {
            case 1:
                var eventWrapper = $('<div>', {
                    class: eventClass,
                    'date': friends[i].date,
                    'name': friends[i].name,
                    'group': friends[i].group,
                    'img': friends[i].image,
                    'colorGroup': friends[i].colorGroup,
                    'place': friends[i].place,
                    'type': friends[i].type,
                    'googleMap': friends[i].map,
                    click: function () {
                        if ($(this).attr('googleMap') !== undefined) {
                            $('.mapWrapper').show();
                            $('.eventPlacePop').hide();
                            $('.mapPlace').html('Where? ');
                            $('.eventMapPop').attr('href', $(this).attr('googleMap'));
                        } else {
                            $('.mapWrapper').hide();
                            $('.eventPlacePop').show();
                            $('.eventPlacePop').html('Where? ' + $(this).attr('place'));
                            $('.eventMapPop').attr('href', '#');
                        }
                        $('.eventMapPop').html($(this).attr('place'));
                        $('.eventDatePop').html('Date: ' + $(this).attr('dateText'));
                        $('.eventNamePop').html($(this).attr('name'));
                        $('#eventCover').attr('src', ('./images' + $(this).attr('img'))).show();
                        $('#eventDetails').fadeIn(150);
                    }
                }).appendTo(containerToAppend);

                break;
            case 2:
                var eventWrapper = $('<div>', {
                    class: eventClass,
                    'name': friends[i].name,
                    'group': friends[i].group,
                    'img': friends[i].image,
                    'video': friends[i].video,
                    'type': friends[i].type,
                    'colorGroup': friends[i].colorGroup,
                    'place': friends[i].place,
                    'googleMap': friends[i].map,
                }).appendTo(containerToAppend);

                break;
        }

        switch(num) {
            case 1:
                
                var galleryImg = $('<img>', {
                    class: 'galleryImg',
                    src: './images' + friends[i].image
                }).appendTo(eventWrapper);

                break;
            case 2:
                let playPauseWrapper = $('<div>', {
                    class: 'playPauseWrapper',
                }).appendTo(eventWrapper);

                let videoTitle = $('<h2>', {
                    class: 'videoTitle',
                    text: friends[i].name
                }).appendTo(playPauseWrapper);
        
                let playVideoBtn = $('<img>', {
                    class: 'playVideoBtn',
                    src: './images/playPause2.png',
                    click: function () {
                        var thisVideo = $(this).parent().parent().find($('.video')).get(0);
        
                        if (thisVideo.paused) {
                            $.each($('.video'), function (key, value) {
                                $(this).trigger('pause');
                            });
                            $(thisVideo).trigger('play');
                        } else {
                            $(thisVideo).trigger('pause');
                        }
                    }
                }).appendTo(playPauseWrapper);
        
                let rewindBtn = $('<img>', {
                    class: 'rewindBtn',
                    src: './images/stop.png',
                    click: function () {
                        var thisVideo = $(this).parent().parent().find($('.video')).get(0);
                        $(thisVideo).trigger('pause');
                        $(thisVideo)[0].currentTime = 0;
                    }
                }).appendTo(playPauseWrapper);
        
                let video = $('<video>', {
                    class: 'video',
                    src: './videos' + friends[i].video,
                    click: function () {
                        if ($(this).parent().attr('googleMap') !== undefined) {
                            $('.mapWrapper').show();
                            $('.eventPlacePop').hide();
                            $('.mapPlace').html('Where? ');
                            $('.eventMapPop').attr('href', $(this).parent().attr('googleMap'));
                        } else {
                            $('.mapWrapper').hide();
                            $('.eventPlacePop').show();
                            $('.eventPlacePop').html('Where? ' + $(this).parent().attr('place'));
                            $('.eventMapPop').attr('href', '#');
                        }
                        $('.eventMapPop').html($(this).parent().attr('place'));
                        $('.eventNamePop').html($(this).parent().attr('name'));
                        $('#eventDetails').fadeIn(150);
                    }
                }).appendTo(eventWrapper);
        
                $.each($('.videoContainer'), function (key, value) {
                    if ($(this).attr('type') == 'mobile') {
                        $(this).addClass('mobileVideo');
                    } else {
                        $(this).addClass('desktopVideo');
                    }
                });
                break;
        }

        $.each($('.galleryImg'), function (key, value) {
            if ($(this).parent().attr('type') == 'mobile') {
                $(this).addClass('mobileImg');
            } else {
                $(this).addClass('desktopImg');
            }
        });
    }
}

function goToTop() {
    $('html,body').animate({ scrollTop: 0 }, 2000);
    if ($(window).width() > 765) {
        $('.goToTopBtn').animate({ bottom: '47rem' }, 1800);

        setTimeout(function () {
            $('.goToTopBtn').fadeOut('fast');
        }, 2000)

        setTimeout(function () {
            $('.goToTopBtn').css('bottom', '4rem');
        }, 2300)
    }
}

function scrollBtn() {

    if ($(window).width() > 765) {
        if ($(this).scrollTop() > 550) {
            $('.goToTopBtn').fadeIn();
        }
        else {
            $('.goToTopBtn').fadeOut();
        }
    } else {
        if ($(this).scrollTop() > 550) {
            $('.goToTopBtn2').fadeIn();
        }
        else {
            $('.goToTopBtn2').fadeOut();
        }
    }
}

function removePopup(container) {

    $(document).mouseup(function (e) {
        if (container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
            e.stopPropagation();
            $(document).off('mouseup');
        }
    })
}

function closeCurrentPopup(that) {
    if ($($(that)[0].parentElement.parentElement.parentElement).hasClass('animated')) {
        $(selectedDiv).css({border: '0 solid black'}).animate({
            borderWidth: 0
        }, 200);
    }

    $($(that)[0].parentElement.parentElement.parentElement).fadeOut(150);
}
