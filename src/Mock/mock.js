const Mock =require('mockjs')
const data = Mock.mock('http://getData','get',{
    data:[
      {id:'1',name:'锅包肉',kind:'东北菜',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539083106396&di=87dec52060ff3523530effbe3211a4b7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F9213b07eca8065389480578e9ddda144ac3482c1.jpg','property':'XXXX'}
     , {id:'2',name:'辣子鸡',kind:'川菜',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539083106396&di=87dec52060ff3523530effbe3211a4b7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F9213b07eca8065389480578e9ddda144ac3482c1.jpg','property':'XXXX'}

    ]
})
export default {
    data
  }
