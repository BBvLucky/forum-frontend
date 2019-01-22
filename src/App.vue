<template>
  <div>
    <forum-header class="header"></forum-header>
    <div class="container">
      <router-view class="main-app-content"></router-view>
    </div>
    <forum-footer class="footer"></forum-footer>
    <pop-up class="pop-up" v-if="visionPopUp"></pop-up>
  </div>
</template>

<script>
  import FooterForum from "@/components/FooterForum";
  import HeaderForum from "@/components/HeaderForum";
  import {PROFILE_TRY_TO_LOAD} from './store/actions';
  import PopUp from "@/components/PopUp";

  export default {
    name: 'app',
    components: {
      'forum-footer': FooterForum,
      'forum-header': HeaderForum,
      'pop-up': PopUp
    },
    data: () => {
      return {
        visionPopUp: false,
      }
    },
    created() {
      // если в хранилище есть токен и профиль отсутствует,
      // будет произведена попытка получить профиль с сервера
      this.$store.dispatch(PROFILE_TRY_TO_LOAD);
    }
  }
</script>

<style lang="sass">
  @import './assets/style.sass'
</style>
