<template>
  <ul class="list_pagination" v-if="search.keyword">
    <li v-if="pagination.current > 1">
      <router-link
        :to="{
          name: component,
          params: { number: (pagination.current - 1).toString() },
          query: { select: search.select, keyword: search.keyword }
        }"
        class="link_pagination"
        >이전</router-link
      >
    </li>
    <li v-for="(i, index) in pagination2" :key="index">
      <router-link
        v-if="pagination.current === i"
        :to="{
          name: component,
          params: { number: i.toString() },
          query: { select: search.select, keyword: search.keyword }
        }"
        class="link_pagination current"
        >{{ i }}</router-link
      >
      <router-link
        v-else
        :to="{
          name: component,
          params: { number: i.toString() },
          query: { select: search.select, keyword: search.keyword }
        }"
        class="link_pagination"
        >{{ i }}</router-link
      >
    </li>
    <li v-if="pagination.current < pagination.total">
      <router-link
        :to="{
          name: component,
          params: { number: (pagination.current + 1).toString() },
          query: { select: search.select, keyword: search.keyword }
        }"
        class="link_pagination"
        >다음</router-link
      >
    </li>
  </ul>

  <ul class="list_pagination" v-else>
    <li v-if="pagination.current > 1">
      <router-link
        :to="{
          name: component,
          params: { number: (pagination.current - 1).toString() }
        }"
        class="link_pagination"
        >이전</router-link
      >
    </li>
    <li v-for="(i, index) in pagination2" :key="index">
      <router-link
        v-if="pagination.current === i"
        :to="{
          name: component,
          params: { number: i.toString() }
        }"
        :key="i"
        class="link_pagination current
      "
        >{{ i }}</router-link
      >

      <router-link
        v-else
        :to="{
          name: component,
          params: {
            number: i.toString()
          }
        }"
        class="link_pagination"
        >{{ i }}</router-link
      >
    </li>
    <li v-if="pagination.current < pagination.total">
      <router-link
        :to="{
          name: component,
          params: { number: (pagination.current + 1).toString() }
        }"
        class="link_pagination"
        >다음</router-link
      >
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Pagination',
  data() {
    return {
      component: ''
    }
  },
  created() {
    if (this.$route.params.service === 'notice' || this.$route.params.service === 'talk') {
      this.component = 'CommunityList'
    } else {
      this.component = 'GalleryList'
    }
  },
  computed: {
    ...mapState(['pagination', 'search']),
    pagination2() {
      let pagination2 = []

      for (let i = this.pagination.start; i <= this.pagination.end; i++) {
        pagination2.push(i)
      }

      return pagination2
    }
  }
}
</script>

<style scoped></style>
