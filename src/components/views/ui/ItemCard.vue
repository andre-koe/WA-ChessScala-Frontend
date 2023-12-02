<template>
    <div class="item-card" @mouseover="hover = true" @mouseleave="hover = false">
      <font-awesome-icon :icon="icon" />
      <div>{{ title }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      icon: Array,
      title: String
    },
    data() {
      return {
        hover: false
      };
    }
  };
  </script>
  
  <style scoped>
  .item-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .item-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  </style>
  