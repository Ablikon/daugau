<script setup>
import { ref, watch, onMounted } from 'vue'
import VideoCard from './components/VideoCard.vue'
import { useVideos } from './composables/useVideos'

const {
  searchQuery,
  totalLikes,
  isLoading,
  filteredVideos,
  filteredCount,
  handleLike,
  sortByViews
} = useVideos()

const isDarkTheme = ref(false)

const applyTheme = (dark) => {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

// Watch search query changes
watch(searchQuery, (newQuery) => {
  console.log('Search query changed to:', newQuery)
})

// Initialize theme from saved value or OS preference
onMounted(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const useDark = saved ? saved === 'dark' : prefersDark
  isDarkTheme.value = useDark
  applyTheme(useDark)
})

// Toggle theme
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  applyTheme(isDarkTheme.value)
}
</script>

<template>
  <div class="app-container">
    <header class="topbar">
      <h1 class="brand">MiniTube</h1>
      <div class="top-actions">
        <div class="likes-counter">❤️ {{ totalLikes }}</div>
        <button @click="toggleTheme" class="icon-btn" aria-label="Toggle theme">
          {{ isDarkTheme ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <h2 class="sidebar-title">Actions</h2>
        <button @click="sortByViews" class="primary-btn">Sort by Views</button>
        <p class="hint">Found {{ filteredCount }} video{{ filteredCount !== 1 ? 's' : '' }}</p>
      </aside>

      <main class="content">
        <div class="search-bar">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search videos by title or channel..."
            class="search-input"
          />
        </div>

        <div v-if="isLoading" class="loading">
          <div class="spinner"></div>
          <p>Loading videos...</p>
        </div>

        <div v-else-if="filteredVideos.length === 0" class="no-videos">
          <p>No videos found.</p>
        </div>

        <div v-else class="videos-grid">
          <VideoCard
            v-for="video in filteredVideos"
            :key="video.id"
            :id="video.id"
            :title="video.title"
            :channel="video.channel"
            :views="video.views"
            :thumbnail="video.thumbnail"
            :likes="video.likes"
            @liked="handleLike"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100%;
  background: var(--color-background);
}

/* Top bar */
.topbar {
  background: linear-gradient(90deg, hsla(160, 100%, 37%, 0.15), transparent);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-heading);
}

.top-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.icon-btn {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

/* Layout */
.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1.25rem;
  width: 100%;
}

.sidebar {
  display: none;
}

.content {
  /* content area */
}

/* Desktop layout */
@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 260px 1fr;
    align-items: start;
    max-width: none;
    margin: 0;
    padding: 2rem;
    width: 100%;
  }

  .sidebar {
    display: block;
    position: sticky;
    top: 76px; /* below topbar */
    border: 1px solid var(--color-border);
    background: var(--color-background-soft);
    border-radius: 12px;
    padding: 1rem;
    height: max-content;
  }
}

.sidebar-title {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: var(--color-heading);
}

.primary-btn {
  width: 100%;
  padding: 10px 14px;
  background: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.hint {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  opacity: 0.7;
}

/* Search */
.search-bar {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-background-soft);
  color: var(--color-text);
}

.search-input:focus {
  outline: none;
  border-color: hsla(160, 100%, 37%, 1);
}

/* States */
.loading {
  text-align: center;
  padding: 3rem 1rem;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: hsla(160, 100%, 37%, 1);
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-videos {
  text-align: center;
  padding: 3rem 1rem;
  opacity: 0.7;
}

/* Grid */
.videos-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 1280px) {
  .videos-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1600px) {
  .videos-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
