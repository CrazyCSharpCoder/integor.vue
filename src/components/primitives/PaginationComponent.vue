<template>
  <ul class="pagination">
    <li v-for="pageIndex in pageIndices" :key="pageIndex"
        :class="['page', {selected: pageIndex == currentPageIndex, dots: isDots(pageIndex)}]"
    >
      <template v-if="!isDots(pageIndex)">
        <router-link v-if="routeFactory" :to="routeFactory(pageIndex)" class="select-page">
          {{indexToPageNumber(pageIndex)}}
        </router-link>
        <button v-else @click="broadcastPageSelected(pageIndex)" class="select-page">
          {{indexToPageNumber(pageIndex)}}
        </button>
      </template>
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
    },
    routeFactory: Function,
    pageSelectedEvent: String
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
    broadcastPageSelected(pageIndex) {
      this.$emitter.emit(this.pageSelectedEvent, pageIndex)
    },
    indexToPageNumber(index) {
      // Индексация начинается с 0, а нумерация страниц - с 1
      return index + 1
    },
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

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";
@import "/src/assets/scss/controls/panels";
@import "/src/assets/scss/controls/buttons";

$page-width: 36px;
$page-height: 36px;

.pagination {
  @extend %list-reset;

  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: $padding-step-small;
}

.page {
  user-select: none;

  width: $page-width;
  text-align: center;
  line-height: $page-height;

  .select-page {
    @include button;
    padding: 0;
  }

  &.selected {
    .select-page {
      @include button($color-1, $color-1-text);
      padding: 0;
    }
  }

  &.dots {
    &::before {
      content: '...';
      font-weight: bold;
    }
  }
}




</style>