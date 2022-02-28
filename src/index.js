let JSZip = require('jszip');

function convertImages(domElement) {
    if (domElement == undefined) {
        domElement = document.body;
    }

    function getKraFileFromSrc(src) {
        return new Promise(res => {
            fetch(src).then(rf => rf.arrayBuffer()).then(buffer => res(buffer));
        });
    }

    function getImageFromZip(abf) {
        return new Promise(res => {
            let zip = new JSZip();
            zip.loadAsync(abf).then(rawzip => {
                rawzip.file("mergedimage.png").async("arraybuffer").then(buffer => {
                    res(buffer);
                });
            });
        });
    }

    function convertToPngBlob(buffer) {
        return new Promise(res => {
            let arr = new Uint8Array(buffer);
            let rawblob = new Blob([arr], { type: "image/png" });
            res(window.URL.createObjectURL(rawblob));
        });
    }

    let images = domElement.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        if (images[i].getAttribute('src').endsWith('.kra')) {
            let src = images[i].getAttribute('src');
            images[i].setAttribute('src', `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PgogICAgICAgICAgICA8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICAgICAgICAgICAgICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CiAgICAgICAgICAgIDxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICAgICAgICAgICB3aWR0aD0iNTEyLjAwMDAwMHB0IiBoZWlnaHQ9IjUxMi4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDUxMi4wMDAwMDAgNTEyLjAwMDAwMCIKICAgICAgICAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgogICAgICAgICAgICAKICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNTEyLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKICAgICAgICAgICAgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KICAgICAgICAgICAgPHBhdGggZD0iTTM1ODUgNDQ1NCBjLTIyMCAtMzkgLTQyMCAtMTQyIC01NzcgLTI5NyBsLTY2IC02NyAtMTIzOSAtMiAtMTIzOAogICAgICAgICAgICAtMyAtNDIgLTIyIGMtMjMgLTEzIC01OCAtMzkgLTc3IC01OSAtNzAgLTczIC02NiAzOSAtNjYgLTE2NDMgbDAgLTE1MTYgMjQKICAgICAgICAgICAgLTUwIGMyNSAtNTUgNzkgLTEwOCAxMzUgLTEzNCAzMyAtMTUgMjA5IC0xNiAyMDAxIC0xNiAxNjQ3IDAgMTk3MSAyIDIwMDQgMTQKICAgICAgICAgICAgNTEgMTggMTI0IDg1IDE0NyAxMzYgMTggMzggMTkgOTEgMTkgOTg2IGwwIDk0NiA0NiA2OSBjODAgMTIwIDEzNyAyNTYgMTY1CiAgICAgICAgICAgIDM5OSAxOSA5NyAxOCAzMjAgLTMgNDE1IC00NyAyMTYgLTEzOSAzODUgLTI5NSA1NDMgLTI0NCAyNDcgLTYwMCAzNjEgLTkzOAogICAgICAgICAgICAzMDF6IG00MTcgLTkzIGM0MzEgLTExMyA3MzEgLTQ3NSA3NTUgLTkxMiAzOSAtNzAxIC02NDggLTEyMjIgLTEzMTIgLTk5NgogICAgICAgICAgICAtMjkwIDk5IC01MjMgMzMxIC02MjAgNjE4IC0xOTggNTc5IDE2MSAxMTg5IDc2OCAxMzA1IDEwMSAxOSAzMDkgMTIgNDA5IC0xNXoKICAgICAgICAgICAgbS0xMTQxIC0zODMgYy02MyAtOTUgLTEyMyAtMjQyIC0xNTIgLTM3MyAtOCAtMzYgLTE0IC0xMjEgLTE0IC0yMTAgMCAtMTU3IDkKICAgICAgICAgICAgLTIxNiA1MyAtMzQ1IDE0NCAtNDMxIDU1OSAtNzMwIDEwMTUgLTczMCAyNjcgMCA0OTMgODggNzM1IDI4NiBsMzIgMjcgMCAtODg0CiAgICAgICAgICAgIGMwIC00ODYgLTMgLTg5NCAtNiAtOTA2IC00IC0xMyAtOSAtMjMgLTEzIC0yMyAtMyAxIC0yNDcgMzA0IC01NDEgNjc1IC00ODIKICAgICAgICAgICAgNjA5IC01MzkgNjc3IC01NzcgNjkxIC03NiAyOSAtODMgMjQgLTQxNSAtMzIyIC0yMjMgLTIzMiAtMzA3IC0zMTQgLTMyNCAtMzE0CiAgICAgICAgICAgIC0xOCAwIC05OCA5OSAtNDA4IDUwNCAtMjEyIDI3OCAtMzk2IDUxMiAtNDA4IDUyMCAtMTIgOSAtNDAgMTYgLTYxIDE2IC0zMCAwCiAgICAgICAgICAgIC00NiAtNyAtNzcgLTM3IC0yMSAtMjEgLTMyNSAtNDE2IC02NzUgLTg3OCAtMzUxIC00NjIgLTYzOSAtODQyIC02NDIgLTg0NSAtMgogICAgICAgICAgICAtMiAtOCAyIC0xMyAxMCAtMTQgMjIgLTEzIDMwMjEgMSAzMDU3IDE1IDQwIDQ4IDczIDk0IDk0IDM4IDE4IDk0IDE5IDEyMjggMTkKICAgICAgICAgICAgbDExODkgMCAtMjEgLTMyeiBtLTY4NCAtMTk2NSBjMjA5IC0yNzQgMzkxIC01MDcgNDAzIC01MTggMTYgLTE1IDM2IC0yMCA3NgogICAgICAgICAgICAtMjAgNjQgMCAzOSAtMjMgNDE2IDM3MyAxNTkgMTY1IDI2OCAyNzIgMjc5IDI3MiAxMSAwIDQzIC0zMCA3OCAtNzIgMTU5IC0xOTYKICAgICAgICAgICAgMTAyMSAtMTI4NCAxMDIxIC0xMjkwIDEgLTMzIC0yMyAtMzMgLTE5NTAgLTM2IC0xMDQ4IC0yIC0xOTMzIDAgLTE5NjcgMyAtMzcKICAgICAgICAgICAgNCAtNzEgMTQgLTgyIDIzIC0xOCAxNiAxIDQzIDUxMSA3MTIgMjkxIDM4MiA1ODkgNzc1IDY2NCA4NzMgODcgMTE1IDE0MSAxNzcKICAgICAgICAgICAgMTUzIDE3NyAxMiAwIDE0MiAtMTYzIDM5OCAtNDk3eiIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMzY5NSA0MDk0IGMtMTE1IC0xOSAtMjg5IC04NCAtMzA2IC0xMTUgLTYgLTEyIC02IC0yNSAwIC0zNiAxMyAtMjMKICAgICAgICAgICAgOTI0IC05MzMgOTM0IC05MzMgMjYgMCA0OCAyOCA3NSA5MiA1MyAxMjcgNjYgMTkyIDY2IDMyMyAtMSAxMDUgLTQgMTMwIC0yOQogICAgICAgICAgICAyMDQgLTcxIDIwOCAtMjQ0IDM3OCAtNDUwIDQ0MSAtNjkgMjEgLTIyNiAzNCAtMjkwIDI0eiBtMjg2IC0xMDYgYzEwMCAtMzcKICAgICAgICAgICAgMTU3IC03NCAyMzUgLTE1MyAxMjIgLTEyMyAxODMgLTI4MyAxNzEgLTQ0OSAtNSAtNzQgLTM1IC0xOTQgLTU5IC0yMzkgLTggLTE1CiAgICAgICAgICAgIC02OSA0MSAtNDE2IDM4NCAtMjI0IDIyMSAtNDA5IDQwNSAtNDEwIDQxMCAtNSAxMiA1MiAzNiAxNDIgNjAgOTggMjcgMjQ0IDIxCiAgICAgICAgICAgIDMzNyAtMTN6Ii8+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMTczIDM3NjIgYy0xNyAtMTEgLTYwIC0xMTEgLTg1IC0yMDAgLTMyIC0xMTIgLTMyIC0yNzkgMCAtMzgyIDM2CiAgICAgICAgICAgIC0xMTUgODYgLTE5NSAxNzYgLTI4NiA5MSAtOTAgMTcyIC0xNDAgMjg2IC0xNzYgMTA0IC0zMSAyNzAgLTMxIDM4NSAxIDEwMSAyOAogICAgICAgICAgICAxODkgNzEgMTkzIDk0IDIgOSAtOSAzMiAtMjMgNTAgLTUyIDYyIC04OTggOTA3IC05MDkgOTA3IC02IDAgLTE2IC00IC0yMyAtOHoKICAgICAgICAgICAgbTMxNyAtMzg5IGMxNTEgLTE1MyAzMzMgLTMzNyA0MDQgLTQxMCBsMTI5IC0xMzEgLTg0IC0yOCBjLTEwOSAtMzUgLTI4MSAtNDAKICAgICAgICAgICAgLTM2OSAtMTAgLTEwMiAzNCAtMTczIDc5IC0yNTEgMTU3IC0xNjggMTY2IC0yMTggMzgyIC0xNDQgNjE3IDE0IDQ1IDI5IDgyIDMzCiAgICAgICAgICAgIDgyIDQgMCAxMzEgLTEyNSAyODIgLTI3N3oiLz4KICAgICAgICAgICAgPHBhdGggZD0iTTEwNTAgMzU5NiBjLTExNiAtMzMgLTIxNyAtMTE2IC0yNzEgLTIyNCAtMzMgLTY0IC0zNCAtNzEgLTM0IC0xODIKICAgICAgICAgICAgMCAtMTA2IDIgLTEyMCAyOCAtMTcyIDYzIC0xMjggMTgxIC0yMTcgMzIwIC0yNDEgMTc2IC0zMCAzNjAgNzAgNDQ0IDI0MSAyNgogICAgICAgICAgICA1MiAyOCA2NiAyOCAxNzIgMCAxMDkgLTIgMTE4IC0zMiAxODEgLTg3IDE3OCAtMjk4IDI3NiAtNDgzIDIyNXogbTI2MCAtMTA3CiAgICAgICAgICAgIGMxMTcgLTYyIDE4MCAtMTY3IDE4MCAtMjk5IDAgLTEzNiAtNjYgLTI0MiAtMTg4IC0zMDIgLTU5IC0yOSAtNzYgLTMzIC0xNDcKICAgICAgICAgICAgLTMzIC03MSAwIC04OCA0IC0xNDcgMzMgLTEyMiA2MCAtMTg4IDE2NiAtMTg4IDMwMiAwIDQ1IDcgODggMjAgMTIzIDY5IDE4NQogICAgICAgICAgICAyOTUgMjcwIDQ3MCAxNzZ6Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9zdmc+`);
            getKraFileFromSrc(src)
            .then(buffer => getImageFromZip(buffer))
            .then(buffer => convertToPngBlob(buffer))
            .then(pngimage => {
                images[i].setAttribute('data-src', src);
                images[i].setAttribute('src', pngimage);
            });
        }
    }
}

function loadKraImage(src) {
    return new Promise(res => {
        function getKraFileFromSrc(src) {
            return new Promise(res => {
                fetch(src).then(rf => rf.arrayBuffer()).then(buffer => res(buffer));
            });
        }
        
        function getImageFromZip(abf) {
            return new Promise(res => {
                let zip = new JSZip();
                zip.loadAsync(abf).then(rawzip => {
                    rawzip.file("mergedimage.png").async("arraybuffer").then(buffer => {
                        res(buffer);
                    });
                });
            });
        }
    
        function convertToPngBlob(buffer) {
            return new Promise(res => {
                let arr = new Uint8Array(buffer);
                let rawblob = new Blob([arr], { type: "image/png" });
                res(window.URL.createObjectURL(rawblob));
            });
        }

        function convertBlobToImage(pngblob) {
            return new Promise(res => {
                let img = new Image();
                img.src = pngblob;
                img.onload = () => {
                    res(img);
                };
            });
        }
    
        getKraFileFromSrc(src)
        .then(buffer => getImageFromZip(buffer))
        .then(buffer => convertToPngBlob(buffer))
        .then(pngblob => convertBlobToImage(pngblob))
        .then(image => res(image));
    });
}



window.kra = {
    convertImages: convertImages,
    loadImage: loadKraImage,
    dynamic: {
        enabled: false,
        toggle: function(time) {
            if (time == undefined) {
                time = 500;
            }
            this.enabled = !this.enabled;
            if (this.enabled) {
                setInterval(window.kra.dynamic.loop, time);
            } else {
                clearInterval(window.kra.dynamic.loop);
            }
        },
        loop: function() {
            convertImages();
        }
    }
}

window.kra.convertImages();