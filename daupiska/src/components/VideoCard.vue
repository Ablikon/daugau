<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['liked'])

const isLiked = ref(false)
const imgSrc = ref(props.thumbnail)

watch(
  () => props.thumbnail,
  (val) => (imgSrc.value = val)
)

const onImgError = () => {
  imgSrc.value = 'https://placehold.co/640x360?text=No+Image'
}

const handleLike = () => {
  if (!isLiked.value) {
    isLiked.value = true
    emit('liked', props.id)
  }
}

const formatViews = (views) => {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M'
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K'
  }
  return views.toString()
}
</script>

<template>
  <div class="video-card">
    <div class="thumbnail-container">
      <img
        :src="imgSrc"
        :alt="title"
        class="thumbnail"
        loading="lazy"
        @error="onImgError"
      />
    </div>
    <div class="video-info">
      <h3 class="video-title">{{ title }}</h3>
      <p class="channel-name">{{ channel }}</p>
      <div class="video-stats">
        <span class="views">{{ formatViews(views) }} views</span>
        <button 
          @click="handleLike" 
          class="like-button"
          :class="{ liked: isLiked }"
          :disabled="isLiked"
        >
          ❤ {{ likes }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.video-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-hover);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.thumbnail-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-background-mute);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-info {
  padding: 14px;
}

.video-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--color-heading);
  line-height: 1.35;
}

.channel-name {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.75;
  margin: 0 0 10px 0;
}

.video-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.views {
  color: var(--color-text);
  opacity: 0.65;
}

.like-button {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.15s ease;
}

.like-button:hover:not(:disabled) {
  background: hsla(160, 100%, 37%, 0.12);
  border-color: hsla(160, 100%, 37%, 0.8);
  transform: translateY(-1px);
}

.like-button.liked {
  background: rgba(255, 59, 48, 0.12);
  border-color: rgba(255, 59, 48, 0.9);
}

.like-button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

/* Desktop: horizontal card */
@media (min-width: 1024px) {
  .video-card {
    display: grid;
    grid-template-columns: 320px 1fr;
    align-items: stretch;
  }

  .thumbnail-container {
    aspect-ratio: auto;
    height: 100%;
  }

  .thumbnail {
    height: 100%;
    object-fit: cover;
  }

  .video-info {
    padding: 16px 18px;
  }
}
</style>
