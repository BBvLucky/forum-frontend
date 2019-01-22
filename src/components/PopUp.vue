<template>
  <div>
    <div class="pop-up-container">
      <div class="pop-up-close">
        <span class="close-item">Закрыть</span>
      </div>
      <div class="pop-up-content">
        <img src="../assets/img/popupLock.png" alt="lock" width="78">
        <p class="pop-up-text">
          <a href="#">Войдите</a> на сайт или
          <a href="#">зарегистрируйтесь</a>, чтобы задать вопрос и получить на него ответ.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: {}
};
</script>

<style lang="sass">

    @import "../assets/variables"

    .pop-up
        position: fixed
        top: 0
        width: 100%
        min-height: 100%
        background-color: rgba(0, 0, 0, 0.5)
        display: flex
        align-items: center
        &-container
            background-color: $text_background_color
            width: 350px
            margin: 0 auto
            padding: 9px 0 39px 49px
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15)
            border-radius: 5px

    .pop-up-close
        width: 100%
        text-align: right
        padding-right: 27px
        margin-bottom: 26px
        position: relative
    .close-item
        font-size: $forun_item_secondary_font_size
        color: $base_font_color
        &:hover
            cursor: pointer
        &:after
            content: "+"
            display: inline-block
            text-align: center
            transform: rotate(45deg)
            font-size: $forun_item_title_secondary_size
            line-height: 10px
            position: absolute
            top: 5px
            right: 11.21px
            color: $auth_form_alert_color

    .pop-up-content
        padding-right: 50px
        display: flex
        flex-direction: column
        align-items: center
        & img
            margin-bottom: 20px
    
    .pop-up-text
        text-align: center
        font-size: $pop-up_font_size
        margin: 0
        color: $base_font_color
        & a 
            text-decoration: none
            font-size: $pop-up_font_size
            color: $auth_form_alert_color

</style>

