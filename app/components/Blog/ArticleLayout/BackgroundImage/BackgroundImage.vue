<template>
  <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
    <article v-for="post in posts" :key="post.id" class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
      <img :src="post.imageUrl" alt="" class="absolute inset-0 -z-10 size-full object-cover" />
      <div class="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40" />
      <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />

      <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
        <time :datetime="post.datetime" class="mr-8">{{ post.date }}</time>
        <div class="-ml-4 flex items-center gap-x-4">
          <svg viewBox="0 0 2 2" class="-ml-0.5 size-0.5 flex-none fill-white/50">
            <circle cx="1" cy="1" r="1" />
          </svg>
          <div class="flex gap-x-2.5">
            <img :src="post.author.imageUrl" alt="" class="size-6 flex-none rounded-full bg-white/10" />
            {{ post.author.name }}
          </div>
        </div>
      </div>
      <h3 class="mt-3 text-lg/6 font-semibold text-white">
        <a :href="post.href">
          <span class="absolute inset-0" />
          {{ post.title }}
        </a>
      </h3>
    </article>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://oss.ideaflow.top/configImg/backgroundImg.jpg',

    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Boost your conversion rate',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://oss.ideaflow.top/configImg/backgroundImg.jpg',

    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://oss.ideaflow.top/configImg/backgroundImg.jpg',

    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Boost your conversion rate',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://oss.ideaflow.top/configImg/backgroundImg.jpg',

    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://oss.ideaflow.top/configImg/backgroundImg.jpg',

    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Boost your conversion rate',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://oss.ideaflow.top/configImg/backgroundImg.jpg',

    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  }
  // More posts...
]
</script>