<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {da} from "cronstrue/dist/i18n/locales/da";

import parser from "cron-parser";

// SEO配置
useHead({
  title: 'Cron表达式生成器 - 在线Cron表达式工具',
  meta: [
    { name: 'description', content: '在线Cron表达式生成器，提供可视化界面，轻松生成和验证Cron表达式，支持预览未来执行时间，帮助开发者更好地理解和使用Cron。' },
    { name: 'keywords', content: 'Cron表达式,Cron生成器,Cron在线工具,定时任务,Cron验证' }
  ]
});

// 预设模式选项
const presets = [
  { label: '每分钟', value: '0 * * * * *' },
  { label: '每小时', value: '0 0 * * * *' },
  { label: '每天', value: '0 0 0 * * *' },
  { label: '每周', value: '0 0 0 * * 0' },
  { label: '每月', value: '0 0 0 1 * *' }
]

// 时间字段配置
const timeFields = [
  { label: '秒', options: Array.from({ length: 60 }, (_, i) => i) },
  { label: '分', options: Array.from({ length: 60 }, (_, i) => i) },
  { label: '时', options: Array.from({ length: 24 }, (_, i) => i) },
  { label: '日', options: Array.from({ length: 31 }, (_, i) => i + 1) },
  { label: '月', options: Array.from({ length: 12 }, (_, i) => i + 1) },
  { label: '周', options: ['日', '一', '二', '三', '四', '五', '六'].map((day, i) => ({ label: day, value: i })) }
]

// 当前选中的预设
const selectedPreset = ref('')

// 各字段的值
const fieldValues = ref({
  '秒': '*',
  '分': '*',
  '时': '*',
  '日': '*',
  '月': '*',
  '周': '?',
})

// 生成的cron表达式
const cronExpression = computed(() => {
  return `${fieldValues.value['秒']} ${fieldValues.value['分']} ${fieldValues.value['时']} ${fieldValues.value['日']} ${fieldValues.value['月']} ${fieldValues.value['周']}`
})

// 预览未来执行时间
 const nextExecutions = ref<string[]>([])
 const error = ref('')



// 监听预设值变化
watch(selectedPreset, (newValue) => {
  if (newValue) {
    const [second, minute, hour, day, month, week] = newValue.split(' ')
    fieldValues.value = {
      '秒': second,
      '分': minute,
      '时': hour,
      '日': day,
      '月': month,
      '周': week,
    }
  }
})
// 计算未来执行时间
const updateNextExecutions = (count: number = 5) => {
  try {
    // 配置cron-parser选项，启用秒级支持
    // 解析 Cron 表达式
    // const interval = parser.parse('*/10 * * * *');
    // const interval = parser.parse(cronExpression.value);
    console.log(cronExpression.value)
    // const interval = parser.parse("0 0 * * * *",{currentDate: new Date()});
    const interval = parser.parse(cronExpression.value,{currentDate: new Date()});
    // const interval = parser.parse("0 20 2,4,6 * * ?",{currentDate: new Date()});

    // // Get next date
    // console.log('Next:', interval.next().toString());
    // console.log('Next2:', interval.next().getFullYear() + interval.next().getMonth() +interval.next().getDay() +interval.next().getHours()+interval.next().getMinutes() + interval.next().getSeconds());


    nextExecutions.value = interval.take(count).map((date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`)

    error.value = ''
  } catch (err) {
    nextExecutions.value = []
    // 提供更详细的错误信息
    const errorMessage = err instanceof Error ? err.message : String(err)
    error.value = `表达式格式错误：${errorMessage}\n请检查表达式格式是否正确，确保每个字段都在有效范围内。`
  }
}

</script>

<template>
 <client-only>
   <div class="min-h-screen p-6 bg-base-100">
     <div class="max-w-4xl mx-auto space-y-6">
       <!-- 标题 -->
       <h1 class="text-2xl font-bold text-text-base mb-8">Cron表达式生成器</h1>

       <!-- 预设模式选择 -->
       <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
         <h2 class="text-lg font-semibold text-text-base mb-4">预设模式</h2>
         <div class="flex flex-wrap gap-3">
           <BaseButton
               v-for="preset in presets"
               :key="preset.value"
               :text="preset.label"
               @click="selectedPreset = preset.value"
           />
         </div>
       </div>

       <!-- 分字段配置 -->
       <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg relative z-50">
         <h2 class="text-lg font-semibold text-text-base mb-4">字段配置</h2>
         <div class="flex flex-wrap gap-4 items-center">
           <div v-for="field in timeFields" :key="field.label" class="flex items-center gap-2">
             <span class="text-text-base whitespace-nowrap">{{ field.label }}：</span>
             <BaseDropdown class="relative z-50" placement="bottom" trigger-type="click">
               <BaseButton class="min-w-[80px] justify-between">{{fieldValues[field.label]}}</BaseButton>
               <template #dropdown>
                 <BaseDropdownItem @click="fieldValues[field.label] = '*'" :class="{'bg-white/50 dark:bg-white/10': fieldValues[field.label] === '*'}">
                   每{{ field.label }}
                 </BaseDropdownItem>
                 <BaseDropdownItem @click="fieldValues[field.label] = '*/5'" :class="{'bg-white/50 dark:bg-white/10': fieldValues[field.label] === '*/5'}">
                   每5{{ field.label }}
                 </BaseDropdownItem>
                 <BaseDropdownItem @click="fieldValues[field.label] = '1-10'" :class="{'bg-white/50 dark:bg-white/10': fieldValues[field.label] === '1-10'}">
                   <span>1-10{{ field.label }}</span>
                 </BaseDropdownItem>
                 <div v-for="option in field.options" :key="option.value || option" class="px-1">
                   <BaseDropdownItem @click="fieldValues[field.label] = String(option.value ?? option)" :class="{'bg-white/50 dark:bg-white/10': fieldValues[field.label] === String(option.value ?? option)}">
                     <span>{{ option.label || option }}</span>
                   </BaseDropdownItem>
                 </div>
               </template>
             </BaseDropdown>
           </div>
         </div>
       </div>

       <!-- 结果预览 -->
       <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
         <h2 class="text-lg font-semibold text-text-base mb-4">表达式预览</h2>
         <div class="flex items-center gap-4 mb-4">
           <div class="flex-1 bg-base-200 p-4 rounded-lg font-mono text-text-base">
             {{ cronExpression }}
           </div>
           <BaseButton @click="updateNextExecutions(10)" class="bg-primary hover:bg-primary-dark text-white">
             执行
           </BaseButton>
         </div>
         <h3 class="font-semibold text-text-base mb-2">未来执行时间</h3>
         <div v-if="error" class="text-red-500 mb-2">{{ error }}</div>
         <ul class="space-y-2 max-h-[300px] overflow-y-auto">
           <li v-for="(time, index) in nextExecutions" :key="index"
               class="text-text-muted p-2 rounded hover:bg-base-200 transition-colors">
             {{ time }}
           </li>
         </ul>
       </div>
     </div>
   </div>
 </client-only>
</template>

<style scoped>
</style>