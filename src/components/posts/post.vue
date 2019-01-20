<template>
    <div class="post_unit row around-xs middle-xs">
        <div class="list-of-topics col-xs-9 col-sm-10">
            <router-link :to="{name: 'posts', params: {postId:item.id}}"><h4 class="header-of-topic">{{item.title}}</h4>
            </router-link>
            <div class="topic-params row">
                <div v-if="item.tags" class="col-xs-12">
                    <div class="row tags-row">
                        <i class='icon-label'></i>
                        <a href="#" class="tags" v-for="(tag, i) in item.tags.split(',')" :key="i">{{ tag }}</a>
                    </div>
                </div>
                <div v-if="item.created_at" class="commentTime col-xs-12 col-sm-6 col-lg-4">
                    <i class='icon-clock'></i> {{[item.created_at, "YYYY-MM-DD HH:mm:ss"] | moment("from") }}
                </div>
                <div class=" col-xs-12 col-sm-6 col-lg-4">
                    <i class='icon-eye'></i> {{item.views || 0}} {{ item.views | pluralize( ['просмотр', 'просмотра',
                    'просмотров']) }}
                </div>
            </div>
        </div>
        <div class="col-xs-3 col-sm-2">
            <p class="comments_count">{{item.comments}} </p>
            <p class="comments_count">{{ item.comments | pluralize( ['ответ', 'ответа', 'ответов']) }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "post",
        props: ['item'],

    }
</script>

<style lang="sass">
    @import "../../assets/variables"
    $topic_params_color: #4D4D4D
    $xs: 320px
    $sm: 768px
    $md: 1024px
    .post_unit
        line-height: 6px
        border-bottom: 1px solid darkgray
        padding: 1px
        .list-of-topics
            padding-top: 15px
            padding-left: 40px
            a
                text-decoration: none
            .header-of-topic
                text-overflow: ellipsis
                overflow: hidden
                width: 100%
                line-height: 22px
                white-space: nowrap
            .topic-params
                margin-bottom: 15px
                margin-top: 0
                .tags-row
                    margin-top: 0
                    .tags
                        text-transform: uppercase
                        opacity: 1
                        line-height: 120%
                        &:hover
                            opacity: 0.5
                        &:not(:last-child)
                            margin-right: 1px
                            &:after
                                content: ","
            div
                display: flex
                align-items: center
                margin-top: 15px
                color: $topic_params_color
            i
                margin-right: 5px
                vertical-align: middle
                opacity: 1
        .comments_count
            text-align: center
            font-weight: bold
            font-size: 18px
</style>
