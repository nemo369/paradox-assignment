<script lang="ts" setup>
import{QuestionType} from '../types/chat.type'
const props = defineProps({
  conversation: {
    type: Object as () => {
      id: number;
      type: QuestionType;
      text: string;
      possibleAnswers: string[];
      range?: {
        min: number;
        max: number;
      } | undefined;
    },
    required: true,
  },
});
</script>

<template>
  <div class=" gap-x-1 items-center">
    <h3 class="text-xl text-slate-900">{{ conversation.text }}</h3>
    <div v-if="conversation.possibleAnswers.length" class="flex">Possible answers: &nbsp;
      <div v-for="(answer, i) in conversation.possibleAnswers" class="text-slate-700 flex">
        <span v-if="i">,&nbsp;</span> <span>{{ answer }} </span>
      </div>
    </div>
    <div v-if="conversation.type === QuestionType.NUMBER && conversation.range" class="text-slate-700">
      Range: {{ conversation.range.min }} - {{ conversation.range.max }}
    </div>
  </div>

</template>

<style scoped>

</style>
