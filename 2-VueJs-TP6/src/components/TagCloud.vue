<template>
    <div class="tag-cloud">
        <h2>Trier par Tags :</h2>
        <button v-for="tag in tags" :key="tag" 
            @click="toggleTag(tag)"
            :class="{ selected: tagList.includes(tag) }">
            {{ tag }}
        </button>
    </div>
</template>

<script>
export default {
    name: "TagCloud",
    data() {
        return {
        tagList: []
        };
    },
    props: {
        tags: {
            type: Array,
            required: true
        }
    },
    emits: ['filter-list'],
    methods: {
        toggleTag(tag) {
            if (this.tagList.includes(tag)) {
                this.tagList = this.tagList.filter(t => t !== tag);
            } else {
                this.tagList.push(tag);
            }
            this.$emit("filter-list", this.tagList);
        }
    }
};
</script>

<style scoped>
.tag-cloud {
    padding: 10px;
    border-radius: 5px;
}

.tag-cloud button {
    display: inline-block;
    border: 0;
    margin: 5px;
    background-color: #007BFF;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9em;
    cursor: pointer;
}

.tag-cloud button.selected {
    background-color: #37e20d;
}
</style>
  