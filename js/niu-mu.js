"use strict";

function _toConsumableArray(a) {
    return _arrayWithoutHoles(a) || _iterableToArray(a) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance")
}

function _iterableToArray(a) {
    if (Symbol.iterator in Object(a) || "[object Arguments]" === Object.prototype.toString.call(a)) return Array.from(a)
}

function _arrayWithoutHoles(a) {
    if (Array.isArray(a)) {
        for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
        return c
    }
}
document.getElementsByClassName("footer-text")[0].innerText = "Grupo estudiantil IEC - ".concat(new Date().getFullYear(), " Todos los derechos reservados \xA9");
var dispatch = function(a) {
        var b = new CustomEvent(a.Type, {
            detail: a.message
        });
        document.dispatchEvent(b)
    },
    servers_production = [{
        Prioridad: 1,
        NameServer: "UANL",
        src: "https://radiec.online/uanl-m-srv"
    }, {
        Prioridad: 2,
        NameServer: "Global",
        src: "https://us4.internet-radio.com/proxy/rdiec?mp=/stream"
    }, {
        Prioridad: 3,
        NameServer: "Backup",
        src: "https://radiec.online/bakup-m-srv"
    }],
    servers = [{
        Prioridad: 1,
        src: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4"
    }, {
        Prioridad: 2,
        src: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4"
    }, {
        Prioridad: 3,
        src: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4"
    }, {
        Prioridad: 4,
        src: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4"
    }],
    updateVolumeIcon = function() {
        var a = document.getElementById("volume-icon"),
            b = JSON.parse(localStorage.getItem("volume_config")) || {
                volume: 1
            };
        switch (!0) {
            case 0 === b.volume:
                return a.className = "fas fa-volume-mute";
            case .33 > b.volume:
                return a.className = "fa fa-volume-off";
            case .33 <= b.volume && .66 > b.volume:
                return a.className = "fa fa-volume-down";
            case .66 <= b.volume:
                return a.className = "fa fa-volume-up";
        }
    },
    connectionErrors = [],
    players = [],
    player_master = !1,
    counter = {
        start: !1
    },
    connect = function(a) {
        document.getElementById("play-button-loader").classList.remove("hidden"), document.getElementById("play-button").classList.add("hidden"), connectionErrors = [], a.map(function(a) {
            var b = new Audio;
            b.Prioridad = a.Prioridad, b.NameServer = a.NameServer, b.src = a.src, b.load(), b.addEventListener("error", function() {
                dispatch({
                    Type: "CONNECTION_ERROR",
                    message: b.src
                })
            }), b.addEventListener("pause", function(a) {
                dispatch({
                    Type: "PAUSE_PLAYER",
                    message: a
                })
            }), b.addEventListener("play", function() {
                dispatch({
                    Type: "PLAY_PLAYER",
                    message: b.NameServer
                })
            }), b.addEventListener("loadeddata", function() {
                dispatch({
                    Type: "LOAD_DATA",
                    message: b
                })
            })
        })
    };
document.addEventListener("LOAD_DATA", function(a) {
    players.push(a.detail), players.sort(function(c, d) {
        return c = c.Prioridad, d = d.Prioridad, c < d ? -1 : c > d ? 1 : 0
    }), player_master || (player_master = players[0], player_master.play()), !player_master || player_master.src == a.detail.src || (players.map(function(a) {
        a.pause()
    }), player_master.pause(), player_master = players[0], player_master.play())
}), document.addEventListener("CONNECTION_ERROR", function(a) {
    connectionErrors.push(a), 4 <= connectionErrors.length && setTimeout(function() {
        document.getElementById("server-name").innerText = "Reconectando", connect(servers_production)
    }, 100)
}), document.addEventListener("PLAY_PLAYER", function() {
    document.getElementById("play-button-loader").classList.add("hidden"), document.getElementById("play-button").classList.remove("hidden"), document.getElementById("play-button").firstElementChild.classList.contains("fa-play") && document.getElementById("play-button").firstElementChild.classList.replace("fa-play", "fa-stop"), document.getElementById("server-name").innerText = player_master.NameServer;
    var a = JSON.parse(localStorage.getItem("volume_config")) || !1;
    player_master.volume = a ? a.volume : 1, updateVolumeIcon(), !1 == counter.start && (counter.start = !0, counter.setInterval = setInterval(function() {
        document.getElementById("player-counter").innerText = fancyTimeFormat(Math.ceil(player_master.currentTime))
    }, 1e3))
}), document.addEventListener("PAUSE_PLAYER", function() {
    player_master.paused && (document.getElementById("play-button").firstElementChild.className = "fas fa-play text-6xl cursor-pointer text-yellow-2000 mr-2")
});

function fancyTimeFormat(a) {
    var b = ~~(a / 3600),
        c = ~~(a % 3600 / 60),
        d = ~~a % 60,
        e = "";
    return 0 < b && (e += "" + b + ":" + (10 > c ? "0" : "")), e += "" + c + ":" + (10 > d ? "0" : ""), e += "" + d, e
}
document.getElementById("play-button").addEventListener("click", function() {
    !1 === player_master ? connect(servers_production) : (!!player_master && 3 === player_master.readyState && (player_master.paused ? player_master.play() : player_master.pause()), "mediaSession" in navigator && (navigator.mediaSession.setActionHandler("play", function() {
        return player_master.play()
    }), navigator.mediaSession.setActionHandler("pause", function() {
        return player_master.pause()
    })))
}), _toConsumableArray(document.getElementsByClassName("menu_movil-menu")).map(function(a) {
    a.addEventListener("click", function() {
        document.getElementById("navbar").classList.toggle("show-navbar");
        var a = document.getElementsByClassName("effect")[0],
            b = document.getElementById("navbar").offsetWidth;
        !document.querySelector("#page").style.transform ? (document.querySelector("#page").style.transform = "translateX(-".concat(b, "px)"), a.classList.remove("hidden")) : (document.querySelector("#page").style.transform = "", a.classList.add("fadeOut"), a.addEventListener("animationend", function() {
            a.classList.replace("fadeOut", "hidden")
        }))
    })
}), document.getElementById("volume-range").addEventListener("input", function(a) {
    var b = a.srcElement.value / 100,
        c = JSON.parse(localStorage.getItem("volume_config")) || {};
    c.volume = b, localStorage.setItem("volume_config", JSON.stringify(c)), !player_master || (player_master.volume = b), updateVolumeIcon()
}), window.addEventListener("load", function() {
    (function() {
        var a = JSON.parse(localStorage.getItem("volume_config")) || !1;
        a ? (document.getElementById("volume-range").value = 100 * a.volume, !!player_master && (player_master.volume = a.volume), updateVolumeIcon()) : (document.getElementById("volume-range").value = 100, !!player_master && (player_master.volume = 1), updateVolumeIcon())
    })(),
    function a() {
        var a = document.getElementById("loader-view");
        a.classList.add("fadeOut"), a.addEventListener("animationend", function(a) {
            a.srcElement.style.display = "none"
        })
    }()
});
var getSongData = function() {
        return fetch("https://control.internet-radio.com:2199/rpc/rdiec/streaminfo.get", {
            cache: "no-store"
        }).then(function(a) {
            return a.json()
        }).then(function(a) {
            return a.data[0].track
        }).catch(function(a) {
            return console.log(a)
        })
    },
    createElement = function(a, b, c) {
        var d = c.type,
            e = c.data,
            f = document.createElement(a);
        return f.setAttribute(d, e), f.innerText = b, f
    };
(function() {
    var a = [],
        b = document.getElementById("songs-info"),
        c = async function() {
            var c = await getSongData();
            (0 === a.length || c.title != a[0].title) && (0 === a.length && (b.innerHTML = ""), a.unshift(c), "mediaSession" in navigator && (navigator.mediaSession.metadata = new MediaMetadata({
                title: a[0].title,
                artist: a[0].artist,
                artwork: [{
                    src: "./../assets/cover/96.jpg",
                    sizes: "96x96",
                    type: "image/jpg"
                }, {
                    src: "./../assets/cover/128.jpg",
                    sizes: "128x128",
                    type: "image/jpg"
                }, {
                    src: "./../assets/cover/192.jpg",
                    sizes: "192x192",
                    type: "image/jpg"
                }, {
                    src: "./../assets/cover/256.jpg",
                    sizes: "256x256",
                    type: "image/jpg"
                }, {
                    src: "./../assets/cover/384.jpg",
                    sizes: "384x384",
                    type: "image/jpg"
                }, {
                    src: "./../assets/cover/512.jpg",
                    sizes: "512x512",
                    type: "image/jpg"
                }]
            })), b.insertBefore(createElement("p", "".concat(a[0].artist, " - ").concat(a[0].title), {
                type: "class",
                data: "animated fadeInLeft"
            }), b.firstChild)), 4 < a.length && (a.pop(), b.lastElementChild.classList.add("fadeOut"), b.lastElementChild.addEventListener("animationend", function() {
                b.removeChild(b.lastElementChild)
            }))
        };
    c(), setInterval(function() {
        return c()
    }, 2e4)
})();