// const fs = require("fs");
// const configs = fs.readFileSync("C:/ProgramData/TxLive/PCoptions.conf", "utf-8");
// const config = JSON.parse(configs);
export class PlayerCanvas {
    constructor(width, height) {
        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this._context2d = this._canvas.getContext("2d");
        requestAnimationFrame(this._animationFrameHandler.bind(this))
    }

    /**
     * @param video {HTMLVideoElement}
     */
    setScreenVideoList(videoList) {
        this._screenVideoList = videoList;
    }
    /**
    * @param video {HTMLVideoElement}
    */
    setImageList(imageList) {
        this._screenImgList = imageList;
    }
    setTextList(textList) {
        this._screenTextList = textList;
    }
    /**
     * @returns {HTMLCanvasElement}
     */
    get canvas() {
        return this._canvas
    }
    _animationFrameHandler() {
        if (this._screenVideoList && this._screenVideoList.length > 0) {
            this._context2d.drawImage(this._screenVideo, 0, 0, this._canvas.width, this._canvas.height);
        }
        console.log(">>>")
    }
}

