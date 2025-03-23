<template>
  <div>
      <SinglePost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import SinglePost from "./SinglePost.vue";

export default {
  props: {
    posts: {
      type: Array
    }
  },
  components: { 
    SinglePost
  }
};
</script>
