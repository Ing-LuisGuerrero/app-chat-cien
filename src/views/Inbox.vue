<template>
  <div
    class="flex bg-white h-screen w-screen w-screen min-w-[300px] overflow-hidden"
  >
    <div class="w-24 lg:w-96 h-screen border-r border-gray-300 h-full">
      <div class="flex flex-col h-full">
        <div
          class="flex w-full h-auto items-center p-4 justify-center lg:justify-between"
        >
          <div class="flex justify-center lg-justify-start items-center">
            <img
              class="flex-grow-0 rounded-full h-10 w-10 object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
            />
            <h2
              class="hidden mb-1 lg:block flex-grow overflow-hidden ml-3 text-2xl font-bold"
            >
              Chats
            </h2>
          </div>
          <div class="hidden lg:flex">
            <div class="relative">
              <button
                @click="menu = !menu"
                class="flex items-center justify-center hover:bg-gray-200 rounded-full p-2 ring-0 ring-transparent focus:outline-none"
              >
                <DotsHorizontalIcon class="h-5 w-5" r/>
              </button>
              <div v-show="menu" class="w-32 absolute bg-white border border-black rounded">
                <button @click="logout" class="w-full rounded hover:bg-gray-100 py-1 text-center text-sm border-none"> Logout </button>
              </div>
            </div>
            <button
              class="flex items-center justify-center hover:bg-gray-200 rounded-full p-2 ml-1"
            >
              <PencilAltIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
        <div class="p-4 shadow-sm">
          <form>
            <div class="mt-1 relative rounded-md shadow-sm"></div>
            <label
              class="relative flex bg-gray-100 mt-1 relative rounded-lg shadow-sm"
            >
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <!-- Heroicon name: solid/mail -->
                <SearchIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                class="pl-10 w-full h-full rounded-lg bg-transparent border-none"
                placeholder="Search in chats"
              />
            </label>
          </form>
        </div>
        <div class="overflow-hidden h-full">
          <ul class="flex min-h-0 max-h-full flex-col overflow-y-auto">
            <Chat
              v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
            />
          </ul>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col w-full">
      <div
        class="w-full h-16 border-b border-gray-300 flex items-center pl-3 pr-4 py-2"
      >
        <img
          class="flex-grow-0 flex-shrink-0 rounded-full h-10 w-10 object-cover"
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        />
        <div class="ml-3 flex-1 h-full flex flex-col justify-center">
          <p class="text-base font-bold">Someone Unknown</p>
          <p class="text-xs text-gray-500">Activo hace 38 min</p>
        </div>
        <!-- Actions -->
        <div class="flex-shrink-0 flex-grow-0">
          <button class="h-auto w-auto rounded-full p-1.5 hover:bg-gray-100">
            <InformationCircleIcon class="h-6 w-6 text-blue-500" />
          </button>
        </div>
      </div>
      <div class="flex-1 flex flex-col">
        <ul class="flex-1 flex flex-col-reverse pl-1 pr-6 pb-1">
          <li class="flex">
            <div class="ml-3 flex justify-end">
              <p
                class="rounded-xl bg-[#0099ff] px-4 py-2 lg:max-w-[70%] text-sm text-white"
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reiciendis, magnam necessitatibus mollitia velit alias nobis
                illo ea, dicta ipsa aliquam, adipisci saepe labore accusamus?
                Doloremque sunt facilis excepturi labore eligendi.
              </p>
            </div>
          </li>
          <li class="flex mb-2">
            <div class="flex-shrink-0 self-end">
              <img
                class="flex-grow-0 flex-shrink-0 rounded-full h-7 w-7 object-cover"
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              />
            </div>
            <div class="ml-3">
              <p
                class="rounded-xl bg-gray-200 px-4 py-2 lg:max-w-[70%] text-sm"
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reiciendis, magnam necessitatibus mollitia velit alias nobis
                illo ea, dicta ipsa aliquam, adipisci saepe labore accusamus?
                Doloremque sunt facilis excepturi labore eligendi.
              </p>
            </div>
          </li>
        </ul>
        <div class="flex items-center py-2 px-3 w-full">
          <button
            class="hover:bg-gray-100 rounded-full p-2 flex justify-center items-center"
          >
            <PhotographIcon class="h-5 w-5 text-blue-500 block" />
          </button>
          <label class="ml-3 flex-1" for="">
            <input
              type="text"
              placeholder="Aa"
              class="w-full rounded-full border-none outline-none py-2 px-3 bg-gray-100"
            />
          </label>
          <button
            class="ml-2 hover:bg-gray-100 rounded-full px-2 py-2.5 flex justify-center items-center"
          >
            <PaperAirplaneIcon
              class="transform rotate-90 h-5 w-5 text-blue-500 block ml-1"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DotsHorizontalIcon,
  InformationCircleIcon,
  PhotographIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/solid";
import { PencilAltIcon, SearchIcon } from "@heroicons/vue/outline";
import Chat from "../components/Chat.vue";
import {useRouter} from 'vue-router';
import { ref } from '@vue/reactivity';

export default {
  components: {
    DotsHorizontalIcon,
    PencilAltIcon,
    SearchIcon,
    Chat,
    InformationCircleIcon,
    PhotographIcon,
    PaperAirplaneIcon,
  },
  setup() {
    const token = localStorage.getItem("token");
    const router = useRouter();
    const menu = ref(false);

    const logout = async () => {
      localStorage.removeItem('token');
      await router.push('login');
    }

    if(!token) {
      router.push('/login')
    }
    console.log(token)

    return {
      menu,
      logout,
    }
  }

 
};
</script>
