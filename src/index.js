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
            getKraFileFromSrc(images[i].getAttribute('src'))
            .then(buffer => getImageFromZip(buffer))
            .then(buffer => convertToPngBlob(buffer))
            .then(pngimage => {
                images[i].setAttribute('data-src', images[i].getAttribute('src'));
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