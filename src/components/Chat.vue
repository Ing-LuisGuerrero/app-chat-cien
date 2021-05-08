<template>
    <li class="flex hover:bg-gray-100 w-full rounded-lg cursor-pointer lg:px-3 py-2 justify-center lg:justify-start">
        <div>
            <img class="flex-shrink-0 rounded-full h-16 w-16 object-cover" src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
        </div>
        <div class="hidden lg:flex flex-col ml-3 justify-center flex-grow">
            <p class="block text-sm text-gray-900">Someone Unkwown</p>
            <p class="flex items-center mt-1 block text-xs text-gray-500"><span class="inline-block truncate max-w-[12rem]">You: Hello There!</span><span class="ml-1 inline-block">- 3 d</span></p>
        </div>
        <div class="hidden lg:flex justify-center items-center">
            <CheckCircleIcon class="h-5 w-5 text-gray-400" />
        </div>
    </li>
</template>

<script>
import { CheckCircleIcon } from '@heroicons/vue/solid'

export default {
    components: {
        CheckCircleIcon
    },

    setup() {
        
    },
}
</script>