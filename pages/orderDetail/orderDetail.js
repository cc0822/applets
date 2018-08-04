Page({
    data: {
        name: '',              //姓名
        cardNo: '',            //就诊卡号
        phone: '',             //联系方式
        createTime: '',        //挂号时间
        doctorName: '',        //挂号医生
        deptName: '',          //挂号科室
        registrationTime: '',  //预约时间
        payTime: '',           //支付时间
        payAmount: '',         //支付金额
        payMethod: '',         //支付方式
        images: '',            //诊前咨询图片
        illnessDescription: '' //主诉
    },
    onLoad: function (options) {
        this.setData({
            name: options.name,
            cardNo: options.cardNo,
            phone: options.phone,
            createTime: options.createTime,
            doctorName: options.doctorName,
            deptName: options.deptName,
            registrationTime: options.registrationTime,
            payTime: options.payTime,
            payAmount: options.payAmount,
            payMethod: options.payMethod,
            images: options.images,
            illnessDescription: options.illnessDescription
        })
    },
   

})
