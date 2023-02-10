"use strict";
var topnav = document.getElementById('topnavID');
var sidenav = document.getElementById('sidenavID');
var upnav = document.getElementById('upnavID');

var sidenavVisible = false;
var upnavVisible = false;
var overSidenav = false;
var overUpnav = false;

window.addEventListener('resize', resize);

sidenav.addEventListener('mouseover', ()=> {
    overSidenav = true;
});

sidenav.addEventListener('mouseout', ()=> {
    overSidenav = false;
});


upnav.addEventListener('mouseover', ()=> {
    overUpnav = true;
});


upnav.addEventListener('mouseout', ()=> {
    overUpnav = false;
});

function resize() {
    topnav.style.width = "100%";
    sidenav.style.top = topnav.offsetHeight + "px";
    sidenav.style.height = (window.innerHeight - topnav.offsetHeight) + "px";
}

function showSideNav(event) {
    event.classList.toggle("change");

    sidenavVisible = true;
    canvas.style.opacity = "0.6";
    sidenav.style.left = "0px";
}

function hideSideNav(event) {
    event.classList.toggle("change");

    sidenavVisible = false;
    canvas.style.opacity = "1.0";
    sidenav.style.left = "-248px";
}

function showUpnav() {
    upnavVisible = true;
    upnav.style.top = window.innerHeight / 2 - 124 + "px";
    upnav.style.opacity = "1.0";
}

function hideUpnav() {
    upnavVisible = false;
    upnav.style.top = "-256px";
    upnav.style.opacity = "0.0";
}

function toggleSidenav(event) {
    if(upnavVisible) hideUpnav();

    if(sidenavVisible) {
        hideSideNav(event);

    } else {
        showSideNav(event);
    }
}

function toggleUpnav() {
    if (sidenavVisible) hideSideNav(topnav);

    if (upnavVisible) {
        hideUpnav();

    } else {
        showUpnav();

    }
}

resize()