
export const screenMenu = [
    {
        title: "摄像头",
        type: 0,
        isShow: true,
        isLock: false,
        icon: "icon-bayonet-camera-full",
        options: {
            cameraID: "",
            dpiWidth: 960,
            dpiHeight: 720,
            isCameraX: false,
            isCameraY: true,
            angle: 0,
            sizeW: 360,
            sizeH: 270,
        }
    },
    {
        title: "窗口捕捉",
        type: 1,
        isShow: true,
        isLock: false,
        icon: "icon-window",
        options: {
            windowID: "",
            sizeW: 100,
            sizeH: 100,
        }
    },
    {
        title: "游戏进程",
        type: 2,
        isShow: true,
        isLock: false,
        forbiddenLock: true,
        icon: "icon-gamepad-controller",
        options: {
            gameName: "",
            gameID: "",
            fps: 60
        }
    },
    {
        title: "显示器捕捉",
        type: 3,
        isShow: true,
        isLock: false,
        forbiddenLock: true,
        icon: "icon-xianshiqi"
    },
    {
        title: "图片",
        type: 4,
        isShow: true,
        isLock: false,
        icon: "icon-photo",
        options: {
            srcUrl: "",
            photoTypeID: "2",
            sizeW: 240,
            sizeH: 135,
        }
    },
    {
        title: "文字",
        type: 5,
        isShow: true,
        isLock: false,
        icon: "icon-txt",
        options: {
            text: "文字内容",

            textStyle: {
                color: "#409EFF",
                background: "transparent",
                fontFamily: "Microsoft YaHei",
                fontSize: `${14 / 1920 * 100}%`,
                textShadow: "transparent",
            },

        }
    },
    {
        title: "麦克风",
        type: 6,
        isShow: true,
        isLock: false,
        icon: "icon-microphone"
    },
    {
        title: "扬声器",
        type: 7,
        // isShow: true,
        // isLock: false,
        icon: "icon-speaker-fill"
    },
    {
        title: "弹幕姬",
        type: 8,
        isShow: true,
        isLock: false,
        icon: "icon-danmu",
        options: {
            sizeW: 270,
            sizeH: 810,
            textStyle: {
                color: "#409EFF",
                background: "transparent",
                fontFamily: "Microsoft YaHei",
                fontSize: `${14 / 1920 * 100}%`,
                textShadow: "transparent",
            },
            titleStyle: {
                color: "#409EFF",
                background: "transparent",
                fontFamily: "Microsoft YaHei",
                fontSize: `${14 / 1920 * 100}%`,
                textShadow: "transparent",
            },
        }
    },
    {
        title: "截屏捕捉",
        type: 9,
        isShow: true,
        isLock: false,
        icon: "icon-Screen-Filled",
        options: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            sizeW: 1920,
            sizeH: 1080,

        }
    },
    {
        title: "投屏",
        type: 10,
        isShow: true,
        isLock: false,
        icon: "icon-screen-share"
    },
    {
        title: "浏览器",
        type: 11,
        isShow: true,
        isLock: false,
        icon: "icon-browser"
    },
    {
        title: "多媒体",
        type: 12,
        isShow: true,
        isLock: false,
        icon: "icon-permmedia"
    },
    {
        title: "第三方推流",
        type: 13,
        isShow: true,
        isLock: false,
        icon: "icon-tuiliujilu"
    },
    {
        title: "虚拟形象",
        type: 14,
        isShow: true,
        isLock: false,
        icon: "icon-lianxiwomen"
    }
]
export const screenName = [
    {
        label: "场景名称",
        formtype: "",
        field: "screenName",
        require: true,//是否校验
        rule: [{ required: true, message: "名称不可为空", trigger: "change" }],//校验规则

    }

]
export const openScreen = [
    {
        label: "场景文件",
        formtype: "file",
        field: "filePath",
        require: false,//是否校验
        rule: [],//校验规则
        fileOptions: {
            webkitdirectory: false
        }
    }
]
export const windowsEdit = [
    {
        label: "窗口选择",
        formtype: "selectWindow",
        field: "windowID",
        require: true,
        rule: [],
        options: []
    },
    {
        label: "窗口宽度",
        formtype: "slider",
        field: "sizeW",
        require: true,
        rule: [],
        sliderOptions: {
            min: 0,
            max: 100,
            showInput: true,
        }
    },
    {
        label: "窗口高度",
        formtype: "slider",
        field: "sizeH",
        require: true,
        rule: [],
        sliderOptions: {
            min: 0,
            max: 100,
            showInput: true,
        }
    }

]