<template>
  <div class="custom-field">
    <img
      :alt="itemData.FirstName"
      :src="itemData.Picture"
    ><div>{{ itemData.Prefix }}
      {{ itemData.FirstName }} {{ itemData.LastName }}</div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style scoped>
  .custom-field > img {
    vertical-align: middle;
    height: 30px;
  }

  .dx-theme-material .custom-field > img {
    height: 36px;
  }

  .custom-field > div {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 5px;
  }
</style>
