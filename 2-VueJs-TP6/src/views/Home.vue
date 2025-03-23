<template>
  <div class="home">
    <h1>Explorez nos Blogs Inspirants !</h1>
    <div class="home-container">
      <TagCloud :tags="tag_list" @filter-list="updateSelectedTags" />
      <PostList :posts="filteredPosts" />
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import TagCloud from "@/components/TagCloud.vue";
import { useGetPosts } from "../composables/getPosts";

export default {
  name: "home-view",
  components: {
    PostList,
    TagCloud
  },
  data() {
    return {
      posts: [],
      tag_list: [],
      selectedTags: []
    };
  },
  computed: {
    filteredPosts() {
      if (this.selectedTags.length === 0) {
        return this.posts;
      }
      return this.posts.filter(post =>
        this.selectedTags.every(tag => post.tags.includes(tag))
      );
    }
  },
  async mounted() {
    this.posts = await useGetPosts();
    this.extractTags();
  },
  methods: {
    extractTags() {
      const tagSet = new Set();
      this.posts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => tagSet.add(tag));
        }
      });
      this.tag_list = [...tagSet];
    },
    updateSelectedTags(tags) {
      this.selectedTags = tags;
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 0 20px;
}
.home-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
