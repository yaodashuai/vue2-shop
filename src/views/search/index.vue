<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search show-action placeholder="请输入搜索关键词" v-model="search" clearable>
      <template #action>
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clear"/>
      </div>
      <div class="list" v-if="history.length > 0">
        <div @click="goSearch(item)" class="list-item" v-for=" item in history" :key="item" >{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHistory, setSearchHistory } from '@/utils/storage'
export default {
  name: 'searchIndex',
  data () {
    return {
      history: getSearchHistory(),
      search: ''
    }
  },
  methods: {
    goSearch (key) {
      if (this.history.indexOf(key) !== -1) {
        const index = this.history.indexOf(key)
        this.history.splice(index, 1)
      }
      this.history.unshift(key)
      setSearchHistory(this.history)
      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.history = []
      setSearchHistory([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
