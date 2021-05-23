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
                <DotsHorizontalIcon class="h-5 w-5" r />
              </button>
              <div
                v-show="menu"
                class="w-32 absolute bg-white border border-black rounded"
              >
                <button
                  @click="logout"
                  class="w-full rounded hover:bg-gray-100 py-1 text-center text-sm border-none"
                >
                  Logout
                </button>
              </div>
            </div>
            <router-link
              :to="{ name: 'NewChat' }"
              class="flex items-center justify-center hover:bg-gray-200 rounded-full p-2 ml-1"
            >
              <PencilAltIcon class="h-5 w-5" />
            </router-link>
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
              v-for="chat in chats"
              :username="getUsername(chat)"
              :id="chat._id"
            />
          </ul>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col w-full h-screen">
      <router-view></router-view>
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
import { useRouter } from "vue-router";
import { reactive, ref, watch } from "vue";

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
    const user = localStorage.getItem("id");
    const router = useRouter();
    const menu = ref(false);

    const chats = ref([]);

    const username = ref("");

    const getChats = async () => {
      const res = await fetch(
        `http://localhost:4000/api/chats/user/${user}?username=${username.value
          .trim()
          .replaceAll("\\s{1,}", "+")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token,
          },
        }
      );
      const data = await res.json();

      chats.value = data;
      console.log(chats.value);
    };

    getChats();

    const logout = async () => {
      localStorage.removeItem("token");
      await router.push("login");
    };

    if (!token) {
      router.push("/login");
    }
    console.log(token);

    const getUsername = (chat) => {
      if (chat.users.length > 2) {
        let name = "";
        for (let i = 0; i < chat.users.length; i++) {
          if (chat.users[i].id !== user) {
            name += chat.users[i].name.split()[0];
          }
        }
        return name;
      } else {
        for (let i = 0; i < chat.users.length; i++) {
          if (chat.users[i]._id !== user) {
            return chat.users[i].name;
          }
        }
      }
    };

    return {
      menu,
      logout,
      getChats,
      user,
      chats,
      getUsername,
    };
  },
};
</script>
