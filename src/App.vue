<script setup lang="ts">

import { ref } from 'vue';
import SubmitChatId from './components/SubmitChatId.vue'
import Conversation from './components/Conversation.vue'
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
}
</script>

<template>
  <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    <p class="text-3xl text-gray-700 font-bold mb-5">
      Welcome! - {{ currentChatId }}
    </p>
    <SubmitChatId @fetchChat="getChat" />
    <ol v-if="chat && chat.conversations" class="space-y-4 mt-6 list-decimal">
      <li v-for="conversation in chat.conversations" :key="conversation.id" class="list-item ">
        <Conversation :conversation="conversation" />
      </li>
    </ol>
  </div>
</template>

