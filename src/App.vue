<script setup lang="ts">

import { ref } from 'vue';
import SubmitChatId from './components/SubmitChatId.vue'
import { getConversation } from './service/conversations'
import { Root } from './types/chat.type'

const currentChatId = ref('');
const chat = ref<Root | null>(null);

const fetchChat = async (id: string) => {
  const conversation = getConversation(id);

  return conversation;

}

const getChat = async (chatId: string) => {
  const conversation = await fetchChat(chatId);
  chat.value = conversation;
  currentChatId.value = chatId


  // const response = await fetch(`https://api.telegram.org/bot${process.env.VUE_APP_TELEGRAM_BOT_TOKEN}/getChat?chat_id=${chatId}`)
  // const data = await response.json()
  // console.log(data)
}
</script>

<template>
  <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    <p class="text-3xl text-gray-700 font-bold mb-5">
      Welcome! - {{ currentChatId }}
    </p>
    <SubmitChatId @fetchChat="getChat" />
    <ol v-if="chat && chat.conversations" class="space-y-4 mt-6 list-decimal">
      <li v-for="conversation in chat.conversations" :key="conversation.id" class=" list-item gap-x-1 items-center">
        <h3 class="text-xl text-slate-900">{{ conversation.text }}</h3>
        <div v-if="conversation.possibleAnswers.length" class="flex">Possible answers: &nbsp;
          <div v-for="(answer, i) in conversation.possibleAnswers" class="text-slate-700 flex">
            <span v-if="i">,&nbsp;</span> <span>{{ answer }} </span>
          </div>
        </div>
        <div v-if="conversation.range" class="text-slate-700">
          Range: {{ conversation.range.min }} - {{ conversation.range.max }}
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>

</style>
