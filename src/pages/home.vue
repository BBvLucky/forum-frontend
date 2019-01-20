<template>
  <div class="row between-md top-xs">
    <div class="col-xs-12 col-md-8">
      <router-link to="/create-post" tag="button" class="button button-main" v-show="isLoggedIn">Добавить тему +
      </router-link>
      <h2 class="header-of-list">Список тем</h2>

      <post
          v-for="item in items"
          :key="item.id"
          :item="item"></post>


      <div class="paginator">
        <button class="button paginate-links" v-on:click="prevPage" :disabled="page === 1">
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.18333 1.175L2.35833 5L6.18333 8.825L5 10L0 5L5 0L6.18333 1.175Z" fill="#4D4D4D"/>
          </svg>
        </button>
        <button class="button paginate-links" v-for="(pageNumber,index) in pagesList"
                :key="index" v-on:click="changePage(pageNumber)"
                v-bind:class="{ active: page === pageNumber }"
                :disabled="pageNumber === '...' || page === pageNumber">{{pageNumber}}
        </button>
        <button class="button paginate-links" v-on:click="nextPage" :disabled="page >= numberOfPage">
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.816667 1.175L4.64167 5L0.816667 8.825L2 10L7 5L2 0L0.816667 1.175Z" fill="#4D4D4D"/>
          </svg>
        </button>
      </div>
    </div>

    <bestPosts
        :bestItems="bestItems"
    ></bestPosts>

  </div>
</template>

<script>
  import post from '@/components/posts/post.vue';
  import bestPosts from '@/components/posts/best_posts.vue';

  export default {
    name: 'ForumList',
    props: ['query'],
    components: {
      post,
      bestPosts
    },
    data() {
      return {
        userSearch: '',
        page: 1,
        total: 0,
        items: [],
        bestItems: [],
        userId: '',
        pagesList: [],
        user: '',
        comments: '',
        tags: ''
      }
    },
    mounted: function () {
      this.page = parseInt(this.$route.query.page || 1);
      this.loadPosts();
    },
    watch: {
      '$route'(to, from) {
        this.userSearch = to.params.query;
        this.loadPosts();
        this.$store.dispatch(TOPIC_LOAD, to.params.postId);
      }
    },
    methods: {
      loadPosts() {
        if (this.userSearch) {
          this.axios.get('http://api.forum.pocketmsg.ru/search/' + this.userSearch)
            .then(response => {
              this.items = response.data.Posts.data;
              this.total = response.data.Posts.total;
              this.pagination();
            })
            .catch(error => alert(error));
        } else {
          this.axios.get('http://api.forum.pocketmsg.ru/posts?page=' + this.page)
            .then(response => {
              this.items = response.data.data;
              this.total = response.data.total;
              this.pagination();
            })
            .catch(error => alert(error));
        }

        this.axios.get('http://api.forum.pocketmsg.ru/best-posts')
          .then(response => {
            this.bestItems = response.data.data.filter((item) => {
              return item.id !== parseInt(this.postId);
            });
            this.bestItems.sort(this.bestItems.comments);
            this.bestItems.length = 15;
            console.log(response)
          })
          .catch(error => alert(error));
      },

      changePageUrl(newPage) {
        this.$router.push({name: 'home', query: {page: newPage}});
      },
      nextPage() {
        this.page += 1;
        this.changePageUrl(this.page);
        this.loadPosts();

      },
      prevPage() {
        if (this.page > 1) {
          this.page -= 1;
          this.changePageUrl(this.page);
          this.loadPosts();
        }
      },
      changePage(page) {
        this.page = page;
        this.changePageUrl(this.page);
        this.loadPosts();
      },
      pagination() {
        let current = this.page,
          last = this.numberOfPage,
          delta = 2,
          left = current - delta,
          right = current + delta + 1,
          range = [],
          rangeWithDots = [],
          l;

        for (let i = 1; i <= last; i++) {
          if (i === 1 || i === last || i >= left && i < right) {
            range.push(i);
          }
        }

        for (let i of range) {
          if (l) {
            if (i - l === 2) {
              rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
              rangeWithDots.push('...');
            }
          }
          rangeWithDots.push(i);
          l = i;
        }
        this.pagesList = rangeWithDots;
      },
    },
    computed: {
      numberOfPage: function () {
        return Math.ceil(this.total / 15);
      },
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "../assets/variables"
  $topic_params_color: #4D4D4D
  $xs: 320px
  $sm: 768px
  $md: 1024px

  .button-main
    margin: 25px 25px 0 25px

  .header-of-list
    margin-left: 50px
    margin-top: 25px

  .paginator
    margin: 35px 20px 40px 50px
    .paginate-links
      background-color: $button_default_color
      margin-right: 5px
      cursor: pointer
      border-radius: 5px
      border-color: $button_default_color
      width: 30px
      height: 30px
      &:disabled
        background-color: $button_default_color
        opacity: 0.7
      &.active
        background-color: $button_main_big_color
        border-color: $topic_params_color
        cursor: default

  .list-of-topics,
  .post_unit
    @media (min-width: $xs) and (max-width: $sm)
      padding-left: 7px
    @media (min-width: $sm + 1px)
      padding-left: 25px

  .invisible
    display: none
    margin-bottom: 0




</style>
