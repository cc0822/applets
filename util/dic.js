export default{
    //订单类型
    subjects: [
        { id: 'REC', name: '【云医院】就诊卡充值' },
        { id: 'REG', name: '【云医院】挂号缴费' },
        { id: 'PRE', name: '【云医院】处方缴费' },
        { id: 'CHE', name: '【云医院】检查缴费' },
        { id: 'LIS', name: '【云医院】检验缴费' },
        { id: 'FRE', name: '【朔维健康】配送订单' },
        { id: 'CON', name: '【朔维健康】咨询订单' },
        { id: 'BUY', name: '【朔维健康】内容订单' },
        { id: 'PRO', name: '【朔维健康】商品订单' }
    ],
    //支付方式
    payMethods: [
        { id: 1, name: '账户余额' }, 
        { id: 2, name: '微信' }, 
        { id: 3, name: '支付宝' }, 
        { id: 4, name: '银联' }
    ],
    //支付状态
    payTypes: [
        { id: 1, name: '扣费' }, 
        { id: 2, name: '冻结' }
    ],
    //退款状态
    refundStatuses: [
        { id: 1, name: '未退款' }, 
        { id: 2, name: '退款中' }, 
        { id: 3, name: '部分退款' }, 
        { id: 4, name: '全额退款' }
    ]
}