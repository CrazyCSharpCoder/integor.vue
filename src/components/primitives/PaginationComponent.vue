<template>
  <ul class="pagination">
    <li v-for="pageIndex in pageIndices" :key="pageIndex"
        class="page-container"
    >
      <component v-if="isDots(pageIndex)" :is="dotsComponent"/>
      <component v-else
                 :is="pageComponent"
                 :pageIndex="pageIndex"
                 :options="optionsFactory ? optionsFactory(pageIndex) : undefined"/>
    </li>
  </ul>
</template>

<script>
const startPageIndex = 0

function getEndPageIndex(pagesCount) {
  return pagesCount - 1
}

export default {
  props: {
    dotsComponent: {
      required: true,
      type: Object
    },
    pageComponent: {
      required: true,
      type: Object,
    },

    optionsFactory: Function,

    pagesCount: {
      required: true,
      type: Number
    },
    currentPageIndex: {
      required: true,
      type: Number
    },
    pagesFromCurrent: {
      default: 2,
      type: Number
    }
  },
  data() {
    return {
      endPageIndex: getEndPageIndex(this.pagesCount)
    }
  },
  computed: {
    pageIndices() {
      if (this.pagesCount == 1)
        return [startPageIndex]

      let minFromCurrent = this.currentPageIndex - this.pagesFromCurrent
      let maxFromCurrent = this.currentPageIndex + this.pagesFromCurrent

      minFromCurrent = Math.max(startPageIndex, minFromCurrent)
      maxFromCurrent = Math.min(this.endPageIndex, maxFromCurrent)

      const result = [startPageIndex]

      if (minFromCurrent == startPageIndex)
        minFromCurrent++

      if (maxFromCurrent == this.endPageIndex)
        maxFromCurrent--

      if (minFromCurrent - startPageIndex > 1)
        result.push(undefined)

      const pageNumbersNearCurrent =
          [...Array(maxFromCurrent - minFromCurrent + 1).keys()]
              .map(el => el + minFromCurrent)

      result.push(...pageNumbersNearCurrent)

      if (this.endPageIndex - maxFromCurrent > 1)
        result.push(undefined)

      result.push(this.endPageIndex)

      return result
    }
  },
  methods: {
    isDots(pageIndex) {
      return pageIndex === undefined
    }
  },
  created() {
    if (this.currentPageIndex < startPageIndex ||
        this.currentPageIndex > getEndPageIndex(this.pagesCount))

        throw new Error('Current page index is out of range')
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/contentAdjustment";
@import "/src/assets/scss/controls/panels";

$page-width: 36px;
$page-height: 36px;

.pagination {
  @extend %list-reset;

  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: $padding-step-small;

  > .page-container {
    width: $page-width;
    line-height: $page-height;
  }
}

</style>