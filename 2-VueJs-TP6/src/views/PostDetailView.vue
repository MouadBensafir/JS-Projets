<template>
  <div class="post-detail">
    <h1>{{ post.title }}</h1>
    <p class="post-meta">ID n° #{{ post.id }}</p>
    
    <div class="content">
      <p>{{ post.content }}</p>
    </div>

    <div class="tags">
      <p><strong>Tags:</strong></p>
      <div class="tag-list">
        <span v-for="(tag, index) in post.tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostDetailView",
  data() {
    return {
      post: {}
    };
  },
  mounted() {
    const postId = this.$route.params.id; 
    fetch('http://localhost:3000/blogs/' + postId)
        .then(response => response.json())
        .then(data => { 
          this.post = data;  
        })
        .catch(err => { 
          this.error = err.message;
        });
  }
};
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 2% auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.post-meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 1em;
}

.content {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 2em;
}

.tags {
  margin-top: 1.5em;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background-color: #007BFF;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9em;
}


.error {
  color: red;
  font-size: 1.2em;
  margin-top: 1em;
}
</style>
