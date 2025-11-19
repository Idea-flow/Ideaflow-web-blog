<template>
  <div>
    <h1 class="text-text-base">Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>

  <ColorScheme placeholder="..." tag="span" >
    <span class="text-red-400">  Color mode: <b>{{ $colorMode.preference }}</b></span>

    <span v-if="$colorMode.preference === 'system'" class="text-red-400">(<i class="text-red-400">{{ $colorMode.value }}</i> mode detected)</span>
  </ColorScheme>
</template>

<script setup>
const colorMode = useColorMode()
// colorMode.value == 'dark' ? 'dark' : 'light'
console.log("colorMode.preference:,",colorMode.preference)
console.log("colorMode.value:",colorMode.value)
</script>

<style>

</style>