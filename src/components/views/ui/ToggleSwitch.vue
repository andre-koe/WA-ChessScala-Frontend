<template>
  <div class="toggle-switch">
    <input type="checkbox" :id="switchId" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
    <label :for="switchId"></label>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: Boolean,
    switchId: String,
  }  
};
</script>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
  filter: drop-shadow(2px 4px 6px black);
}

.toggle-switch label:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked+label {
  background-color: #2196F3;
}

input:focus+label {
  box-shadow: 0 0 1px #2196F3;
}

input:checked+label:before {
  transform: translateX(26px);
}
</style>
  