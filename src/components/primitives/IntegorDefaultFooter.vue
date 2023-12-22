<template>
  <integor-footer>
    <page-adjusted-content>
      <div class="footer-content">
        <div class="footer-info">
          Добавляйте своих ботов и получите возможность просматривать сгруппированную статстику!
        </div>
        <div class="footer-info">
          Данная система предоставляет функционал прокси-сервера для Telegram Bot API
        </div>
        <div class="footer-info">
          Для выполнения запросов к Telegram Bot API измените домен с "https://api.telegram.org/" на
          "https://example.com/"
        </div>
      </div>
    </page-adjusted-content>
  </integor-footer>
</template>

<script>
import IntegorFooter from "@/components/primitives/IntegorFooter";
import PageAdjustedContent from "@/components/primitives/contentAdjustment/PageAdjustedContent";

export default {
  components: {PageAdjustedContent, IntegorFooter}
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/contentAdjustment";

.footer-content {
  display: flex;
  padding: $padding-step-large * 4 0;

  .footer-info {
    flex: 0 0 33%;
  }
}

</style>