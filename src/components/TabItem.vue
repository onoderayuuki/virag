<template>
  <button @click="$emit('input', id)" :class="[active, 'tab']">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    id: Number,
    label: String,
    value: Number
  },
  computed: {
    active() {
      return this.value === this.id ? 'active' : false
    }
  }
}
</script>

<style scoped>
.tab {
  border-radius: 2px 2px 0 0;
  background: beige;
  color: #311d0a;
  line-height: 24px;
  font-size:15px;
  padding: 3px 5px;
}
.tab:hover {
  /* background: #eeeeee; */
  border-left:1px solid #660000 ;
  border-right:1px solid #660000 ;
  /* border-bottom:1px solid #660000 ; */
}
.active {
  background: #f7c9c9;
}
</style>