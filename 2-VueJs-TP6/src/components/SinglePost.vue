<template>
  <div class="post">
    <h2>{{ post.title }}</h2>
    <p class="tags"><strong>Tags:</strong> {{ post.tags.join(", ") }}</p>
    <p class="snippet">{{ subdesc }}...</p>
    
    <router-link :to="`/post/${post.id}`" class="read-more">
      Lire la suite
    </router-link>

    <br/><br/>
    <div class="btn-container">
      <button @click="deletePost" class="delete-button">Supprimer</button>
      <button @click="editPost(post.id)" class="edit-button">Modifier</button>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ["post"],
  computed: {
    subdesc() {
      return this.post.content.substring(0, 50);
    },
  },
  methods: {
    async deletePost() {
      const endPointURI = `http://localhost:3000/blogs/${this.post.id}`;
      let res = confirm("Etes-vous sûr de vouloir supprimer cet article?");
      if (res) {
        await fetch(endPointURI, {
          method: "DELETE",
        })
          .then(() => {
            this.$emit("delete", this.post.id);
          })
          .catch((err) => {
            console.log("Erreur lors de la suppression :", err);
          });
        location.reload();
      }
    },
    editPost(postID) {
      this.$router.push(`/edit/${postID}`);
    }
  },
};
</script>

<style scoped>
.post {
  background-color: #f9f9f9;
  border: 1px solid #e1e1e1;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

h2 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 10px;
}

.tags {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 15px;
}

.snippet {
  font-size: 1.1em;
  color: #444;
  line-height: 1.6;
  margin-bottom: 15px;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #0056b3;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 8px;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #e60000;
}

.edit-button {
  background-color: rgb(253, 174, 5);
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 8px;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: rgb(255, 123, 0);
}


</style>
