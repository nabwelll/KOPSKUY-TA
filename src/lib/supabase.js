import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// These are public keys - safe to expose in client-side code
const supabaseUrl = 'https://sxxvbbvjorxxbiiaomnh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4eHZiYnZqb3J4eGJpaWFvbW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTMxMjEsImV4cCI6MjA3OTcyOTEyMX0.1ebiIxTiiHFssDl1C5gFTN6m4YEP4a7S-MV385cqKiU'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock data for fallback when API is unavailable
const mockMenuData = [
  {
    id: 1,
    name: 'Espresso',
    category: 'Kopi',
    description: 'Kopi espresso murni dengan rasa yang kuat dan intens. Diseduh menggunakan biji kopi pilihan.',
    price: 18000,
    image_url: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
    is_popular: true,
    ingredients: 'Biji kopi arabika, air panas',
    notes: 'Disajikan panas'
  },
  {
    id: 2,
    name: 'Cappuccino',
    category: 'Kopi',
    description: 'Perpaduan sempurna espresso, susu steamed, dan foam susu yang lembut.',
    price: 28000,
    image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    is_popular: true,
    ingredients: 'Espresso, susu segar, foam susu',
    notes: 'Tersedia hot dan iced'
  },
  {
    id: 3,
    name: 'Caffe Latte',
    category: 'Kopi',
    description: 'Espresso dengan susu steamed yang creamy dan sedikit foam di atasnya.',
    price: 30000,
    image_url: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400',
    is_popular: true,
    ingredients: 'Espresso, susu segar',
    notes: 'Tersedia hot dan iced'
  },
  {
    id: 4,
    name: 'Americano',
    category: 'Kopi',
    description: 'Espresso yang diencerkan dengan air panas. Rasa kopi yang lebih ringan.',
    price: 22000,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    is_popular: false,
    ingredients: 'Espresso, air panas',
    notes: 'Tersedia hot dan iced'
  },
  {
    id: 5,
    name: 'Mocha',
    category: 'Kopi',
    description: 'Perpaduan espresso dengan cokelat dan susu. Manis dan lezat.',
    price: 32000,
    image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400',
    is_popular: true,
    ingredients: 'Espresso, susu segar, cokelat, whipped cream',
    notes: 'Tersedia hot dan iced'
  },
  {
    id: 6,
    name: 'Caramel Macchiato',
    category: 'Kopi',
    description: 'Espresso dengan susu steamed dan drizzle caramel di atasnya.',
    price: 34000,
    image_url: 'https://images.unsplash.com/photo-1599398054066-846f28917f38?w=400',
    is_popular: true,
    ingredients: 'Espresso, susu segar, sirup vanilla, saus caramel',
    notes: 'Tersedia hot dan iced'
  },
  {
    id: 7,
    name: 'Es Kopi Susu',
    category: 'Kopi',
    description: 'Kopi susu khas Indonesia dengan gula aren. Segar dan nikmat.',
    price: 25000,
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    is_popular: true,
    ingredients: 'Espresso, susu segar, gula aren',
    notes: 'Disajikan dingin'
  },
  {
    id: 8,
    name: 'Matcha Latte',
    category: 'Non-Kopi',
    description: 'Teh hijau matcha premium dengan susu segar. Creamy dan menyegarkan.',
    price: 30000,
    image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400',
    is_popular: true,
    ingredients: 'Bubuk matcha, susu segar',
    notes: 'Tersedia hot dan iced'
  },
  {
    id: 9,
    name: 'Cokelat Hangat',
    category: 'Non-Kopi',
    description: 'Cokelat premium dengan susu hangat. Cocok untuk pecinta cokelat.',
    price: 28000,
    image_url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400',
    is_popular: false,
    ingredients: 'Cokelat premium, susu segar, whipped cream',
    notes: 'Tersedia hot dan iced'
  },
  {
    id: 10,
    name: 'Teh Tarik',
    category: 'Non-Kopi',
    description: 'Teh hitam dengan susu kental manis. Klasik dan nikmat.',
    price: 20000,
    image_url: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400',
    is_popular: false,
    ingredients: 'Teh hitam, susu kental manis',
    notes: 'Tersedia hot dan iced'
  },
  {
    id: 11,
    name: 'Croissant',
    category: 'Makanan',
    description: 'Croissant butter premium yang renyah di luar, lembut di dalam.',
    price: 25000,
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    is_popular: true,
    ingredients: 'Tepung, butter, telur',
    notes: 'Dipanggang fresh setiap hari'
  },
  {
    id: 12,
    name: 'French Fries',
    category: 'Makanan',
    description: 'Kentang goreng renyah dengan bumbu spesial.',
    price: 20000,
    image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    is_popular: true,
    ingredients: 'Kentang, bumbu rahasia',
    notes: 'Disajikan dengan saus pilihan'
  }
]

const mockPromoData = [
  {
    id: 1,
    title: 'Promo Happy Hour',
    description: 'Nikmati diskon 20% untuk semua minuman kopi pada jam 14:00-17:00 setiap hari kerja. Waktu yang tepat untuk coffee break!',
    discount: 20,
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
    valid_until: '2025-12-31',
    terms: '1. Berlaku untuk semua minuman berbasis kopi\n2. Berlaku setiap Senin-Jumat jam 14:00-17:00\n3. Tidak dapat digabung dengan promo lain\n4. Berlaku untuk pembelian di tempat',
    promo_code: 'HAPPYHOUR20',
    created_at: '2024-01-01'
  },
  {
    id: 2,
    title: 'Buy 1 Get 1 Weekend',
    description: 'Beli 1 minuman favorit kamu dan dapatkan 1 minuman lagi GRATIS! Berlaku setiap akhir pekan.',
    discount: 50,
    image_url: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600',
    valid_until: '2025-06-30',
    terms: '1. Berlaku untuk minuman dengan harga sama atau lebih rendah\n2. Berlaku setiap Sabtu-Minggu\n3. Maksimal 1 kali per transaksi\n4. Tidak dapat digabung dengan promo lain',
    promo_code: 'WEEKEND1+1',
    created_at: '2024-01-02'
  },
  {
    id: 3,
    title: 'Member Birthday Special',
    description: 'Rayakan ulang tahunmu di KOPSKUY! Dapatkan diskon 30% untuk semua menu di hari spesialmu.',
    discount: 30,
    image_url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600',
    valid_until: '2025-12-31',
    terms: '1. Wajib menunjukkan KTP/identitas resmi\n2. Berlaku pada tanggal ulang tahun saja\n3. Berlaku untuk 1 struk pembelian\n4. Tidak dapat digabung dengan promo lain',
    promo_code: 'HBDKOPSKUY',
    created_at: '2024-01-03'
  },
  {
    id: 4,
    title: 'Student Discount',
    description: 'Diskon spesial 15% untuk pelajar dan mahasiswa dengan menunjukkan kartu pelajar/mahasiswa.',
    discount: 15,
    image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
    valid_until: '2025-12-31',
    terms: '1. Wajib menunjukkan kartu pelajar/mahasiswa yang masih berlaku\n2. Berlaku setiap hari\n3. Tidak dapat digabung dengan promo lain\n4. Berlaku untuk semua menu',
    promo_code: 'STUDENT15',
    created_at: '2024-01-04'
  },
  {
    id: 5,
    title: 'New Menu Launch',
    description: 'Coba menu baru kami! Dapatkan diskon 25% untuk Caramel Macchiato dan Es Kopi Susu versi terbaru.',
    discount: 25,
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600',
    valid_until: '2025-03-31',
    terms: '1. Berlaku untuk Caramel Macchiato dan Es Kopi Susu\n2. Berlaku sampai 31 Maret 2025\n3. Tidak dapat digabung dengan promo lain\n4. Berlaku untuk pembelian di tempat dan takeaway',
    promo_code: 'NEWMENU25',
    created_at: '2024-01-05'
  }
]

// API functions for menu items
export const menuApi = {
  // Get all menu items
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('menu')
        .select('*')
        .order('category', { ascending: true })
      
      if (error) throw error
      return data
    } catch {
      // Return mock data as fallback
      console.log('Using mock menu data')
      return mockMenuData
    }
  },

  // Get menu item by id
  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('menu')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch {
      // Return mock data as fallback
      console.log('Using mock menu data for item:', id)
      return mockMenuData.find(item => item.id === parseInt(id))
    }
  },

  // Get menu items by category
  async getByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('menu')
        .select('*')
        .eq('category', category)
      
      if (error) throw error
      return data
    } catch {
      // Return mock data as fallback
      return mockMenuData.filter(item => item.category === category)
    }
  }
}

// API functions for promos
export const promoApi = {
  // Get all promos
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('promos')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch {
      // Return mock data as fallback
      console.log('Using mock promo data')
      return mockPromoData
    }
  },

  // Get promo by id
  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('promos')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch {
      // Return mock data as fallback
      console.log('Using mock promo data for item:', id)
      return mockPromoData.find(promo => promo.id === parseInt(id))
    }
  }
}
