//这是formDialog中组件生成的数据示例
export const exampleDialogForm = [
    {
        label: "",//表单名称
        formtype: "",//表单种类:select、textarea、date-picker、time-picker、dateAndTime-picker、checkbox、radio-group、switch、file
        field: "",//表单字段
        require: true,//是否校验
        rule: [],//校验规则
        disabled: false,//是否禁填
        //select
        options: [//非必填
            {
                label: "",//选择器标题
                value: ""//选择器数值
            }
        ],

        //date-picker
        dateOptions: {//非必填
            type: "",//显示类型
            format: "",//显示在输入框中的格式
            valueFormat: "",//绑定值的格式
            placeholder: ""//背景内容
        },

        //time-picker
        timeOptions: {//非必填
            pickerOptions: "selectableRange: '18:30:00 - 20:30:00'",
            placeholder: ""//背景内容
        },

        //checkbox
        checkboxOptions: [//非必填
            {
                label: ""
            }
        ],
        radioGroupOptions: [
            {
                label: ""
            }
        ],

        //flie
        fileOptions: {
            webkitdirectory: false
        }
    }
]