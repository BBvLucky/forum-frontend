<template>
  <div class="topic-block col-xs-12 col-md-4">
    <h2 class="header-of-best-topics">Лучшие темы</h2>
    <div v-for="bestItem in bestItems" :key="bestItem.id">
      <div class="best-topic row">
        <div class="userImg">{{bestItem.username[0].toUpperCase()}}</div>
        <p
            @click="() => linkToTopic(bestItem.id)"
            class="new-topic-name col-xs">
          {{bestItem.title}}
        </p>
        <div class="best-topic-props col-xs-2">
          <p>{{bestItem.comments}}</p>
          <p>{{ bestItem.comments | pluralize( ['ответ', 'ответа', 'ответов']) }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "best_posts",
    props: ['bestItems'],
    methods: {
      linkToTopic(postId) {
        this.$router.push({name: 'posts', params: { postId }})
      }
    }
  }
</script>

<style lang="sass">
  @import "../../assets/variables"
  $topic_params_color: #4D4D4D
  $xs: 320px
  $sm: 768px
  $md: 1024px
  .topic-block
    padding: 13px 12px 0 12px
    background-color: $topic_block_background
    .header-of-best-topics
      font-size: 20px
      font-weight: bold
      line-height: 23px
      padding-bottom: 15px

    *
      margin: 0
      padding: 0
      background-color: $aside_background_color

    div, a
      font-size: $medium_font_size
      font-weight: normal
    .best-topic
      margin-bottom: 24px
      cursor: pointer
    .userImg
      height: 32px
      border-radius: 50%
      width: 32px
      background-color: $light_background_color
      text-align: center
      line-height: 32px
      margin-right: 6px
      margin-bottom: 8px

    .best-topic-name
      padding-top: 5px
      text-decoration: none
      &:hover
        opacity: 0.5
    .best-topic-props
      text-align: center
      margin-right: 10px
</style>
