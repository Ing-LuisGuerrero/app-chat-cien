<template>
  <li>
    <router-link :to="{ name: 'Chat', params: { id } }">
      <div
        class="flex hover:bg-gray-100 w-full rounded-lg cursor-pointer lg:px-3 py-2 justify-center lg:justify-start"
      >
        <div class="flex-shrink-0">
          <div
            class="rounded-full shadow h-16 w-16 bg-gray-100 flex justify-center items-center"
          >
            <span class="text-xl"></span>
          </div>
        </div>
        <div class="hidden lg:flex flex-col ml-3 justify-center flex-grow">
          <p class="block text-sm text-gray-900">{{ username }}</p>
          <p class="flex items-center mt-1 block text-xs text-gray-500">
            <span class="inline-block truncate max-w-[12rem]"
              >{{ who }}{{ message }}</span
            ><span class="hidden ml-1 inline-block">- {{ date }}</span>
          </p>
        </div>
        <div class="hidden justify-center items-center">
          <CheckCircleIcon class="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
import { CheckCircleIcon } from "@heroicons/vue/solid";
import moment from "moment";
import { computed, ref } from "@vue/runtime-core";

export default {
  components: {
    CheckCircleIcon,
  },

  props: {
    username: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String,
    },
    who: {
      required: true,
      type: String,
    },
    when: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    const initials = ref("");

    const date = computed(() => {
      const date = moment(props.when, "YYYY-MM-DD");
      console.log(date);
      console.log(props.when);
      return date.fromNow();
    });

    const getInitials = (name) => {
      name = name.split(/\s+/);
      const initials = "";
      if (name.length > 1) {
        return name[0][0] + name[1][0];
      } else {
        if (name.length > 1) {
          return name[0][0] + name[0][1];
        } else {
          return name[0];
        }
      }
    };

    initials.value = getInitials(props.username);

    return {
      date,
      initials,
    };
  },
};
</script>