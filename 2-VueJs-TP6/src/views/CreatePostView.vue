<template>
  <div>
    <h1>Créer un nouveau blog</h1>
    <form @submit.prevent="submitPost">
      <div>
        <label for="title">Titre du Post</label>
        <input type="text" id="title" v-model="post.title" required />
      </div>
      <div>
        <label for="content">Contenu du Post</label>
        <textarea id="content" v-model="post.content" required></textarea>
      </div>
      <div>
        <label for="tags">Tags (séparés par des virgules)</label>
        <input
          type="text"
          id="tags"
          v-model="postInputTags"
          placeholder="Exemple: technologie, développement, Vue.js"
        />
      </div>
      <button type="submit">Ajouter le Post</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreatePostView",
  data() {
    return {
      post: {
        title: "",
        content: "",
        tags: [],
      },
      postInputTags: "",
      error: null,
    };
  },
  methods: {
    async submitPost() {
      // Transformer les tags en un tableau et les ajouter directement à l'attribut 'tags' de l'objet post
      this.post.tags = this.postInputTags.split(",").map((tag) => tag.trim());

      const endPointURI = "http://localhost:3000/blogs"; // L'URL de ton serveur

      // Préparer l'objet à envoyer
      const JSON_Object = JSON.stringify(this.post);

      // Envoyer la requête POST
      await fetch(endPointURI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON_Object,
      })
        .then((response) => response.json())
        .then(() => {
          this.error = null;
          this.post = { title: "", content: "", tags: [] };
          this.postInputTags = "";
        })
        .catch((err) => {
          this.error = err.message;
        });
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Styles pour l'exemple */
form {
  max-width: 400px;
  margin: 0 auto;
}

div {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input,
textarea {
  width: 100%;
  padding: 0.5em;
  margin: 0.5em 0;
}

button {
  padding: 0.5em 2em;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
