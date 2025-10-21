import { ref, computed, onMounted } from 'vue'

export function useVideos() {
  const videos = ref([])
  const searchQuery = ref('')
  const totalLikes = ref(0)
  const isLoading = ref(true)

  // Mock video data
  const mockVideos = [
    {
      id: 1,
      title: 'Vue 3 Composition API Tutorial',
      channel: 'Vue Mastery',
      views: 125000,
      thumbnail: 'https://placehold.co/640x360?text=Vue+3',
      likes: 0
    },
    {
      id: 2,
      title: 'Building Modern Web Apps',
      channel: 'Web Dev Simplified',
      views: 89000,
      thumbnail: 'https://placehold.co/640x360?text=Web+Apps',
      likes: 0
    },
    {
      id: 3,
      title: 'JavaScript ES6 Features',
      channel: 'Traversy Media',
      views: 210000,
      thumbnail: 'https://placehold.co/640x360?text=JavaScript',
      likes: 0
    },
    {
      id: 4,
      title: 'CSS Grid Layout Guide',
      channel: 'Kevin Powell',
      views: 156000,
      thumbnail: 'https://placehold.co/640x360?text=CSS+Grid',
      likes: 0
    },
    {
      id: 5,
      title: 'React vs Vue Comparison',
      channel: 'Fireship',
      views: 340000,
      thumbnail: 'https://placehold.co/640x360?text=React+vs+Vue',
      likes: 0
    },
    {
      id: 6,
      title: 'TypeScript Crash Course',
      channel: 'Net Ninja',
      views: 98000,
      thumbnail: 'https://placehold.co/640x360?text=TypeScript',
      likes: 0
    }
  ]

  // Computed property for filtered videos
  const filteredVideos = computed(() => {
    if (!searchQuery.value) {
      return videos.value
    }
    
    const query = searchQuery.value.toLowerCase()
    return videos.value.filter(video => 
      video.title.toLowerCase().includes(query) || 
      video.channel.toLowerCase().includes(query)
    )
  })

  // Computed property for filtered count
  const filteredCount = computed(() => filteredVideos.value.length)

  // Simulate fetching data
  onMounted(() => {
    setTimeout(() => {
      videos.value = mockVideos
      isLoading.value = false
    }, 1500)
  })

  // Handle like event
  const handleLike = (videoId) => {
    const video = videos.value.find(v => v.id === videoId)
    if (video) {
      video.likes++
      totalLikes.value++
    }
  }

  // Sort videos by views
  const sortByViews = () => {
    videos.value.sort((a, b) => b.views - a.views)
  }

  return {
    videos,
    searchQuery,
    totalLikes,
    isLoading,
    filteredVideos,
    filteredCount,
    handleLike,
    sortByViews
  }
}
