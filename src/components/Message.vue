<template>
  <li v-if="didISendIt" class="mt-3 flex justify-end">
    <div class="ml-3 flex justify-end w-full">
      <p
        class="inline-block w-a rounded-xl bg-[#0099ff] px-4 py-2 lg:max-w-[70%] text-sm text-white"
      >
        {{ message.message }}
      </p>
    </div>
  </li>
  <li v-else class="flex mt-3 w-full">
    <div class="flex-shrink-0 self-end">
      <div
        class="bg-gray-100 shadow border flex-grow-0 flex-shrink-0 rounded-full h-8 w-8 flex justify-center items-center"
      >
        <span class="text-xs">{{ initials }}</span>
      </div>
    </div>
    <div class="ml-3 w-full">
      <p
        class="inline-block break-words wrap rounded-xl bg-gray-200 px-4 py-2 lg:max-w-[70%] text-sm"
      >
        {{ message.message }}
      </p>
    </div>
  </li>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    didISendIt: {
      type: Boolean,
      required: true,
    },
    initials: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const user = ref({});

    const getUser = async () => {
      const res = await fetch(
        `http://localhost:4000/api/user/${props.message.user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token,
          },
        }
      );

      const data = await res.json();

      user.value = data;
    };

    if (props.message.user !== id) {
      getUser();
    }

    return {
      user,
    };
  },
};
</script>