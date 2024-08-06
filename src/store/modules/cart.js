import { getCartList, updateGoodsNum, delCart } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(i => i.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(i => {
        i.isChecked = flag
      })
    },
    updateGoodsNum (state, obj) {
      const item = state.cartList.find((i) => i.goods_id === obj.goodsId)
      item.goods_num = obj.goodsNum
    }
  },
  actions: {
    async getCartListAction (content) {
      const { data: { list } } = await getCartList()
      list.forEach((item) => {
        item.isChecked = true
      })
      content.commit('setCartList', list)
    },
    async changeCountAction (content, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      content.commit('updateGoodsNum', obj)
      await updateGoodsNum(goodsId, goodsNum, goodsSkuId)
    },
    async delAction (content) {
      const cartIds = content.getters.selCartList.map(i => i.id)
      await delCart(cartIds)
      Toast('删除成功')
      content.dispatch('getCartListAction')
    }

  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => {
        return sum + item.goods_num
      }, 0)
    },
    // 选中的商品
    selCartList (state) {
      return state.cartList.filter(i => i.isChecked)
    },
    // 选中的总数
    selCartCount (state, getters) {
      return getters.selCartList.reduce((s, i) => {
        return s + i.goods_num
      }, 0)
    },

    // 选中的总价格
    selCartPrice (state, getters) {
      return getters.selCartList.reduce((s, i) => {
        return s + i.goods_num * i.goods.goods_price_min
      }, 0)
    },
    isAllCheck (state) {
      return state.cartList.every(i => i.isChecked)
    }
  }
}
