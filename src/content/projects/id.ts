import type { ProjectCopy } from "@/types/project";

/**
 * Written, not machine-translated: the English version leans on informal
 * first-person phrasing that reads badly if carried over word for word.
 * Technical terms Indonesian developers use in English are left in English.
 */
export const projectCopyId: Record<string, ProjectCopy> = {
  "pempek-cek-lis": {
    title: "Pempek Palembang Cek Lis",
    category: "Storefront & CMS",
    role: "Developer tunggal, untuk usaha yang masih berjalan",
    timeline: "Mei - Juli 2026",
    description:
      "Storefront dan CMS custom untuk kedai pempek di Serpong, Tangerang Selatan. Pemiliknya mengelola menu, banner promo, ulasan, dan data kontak dari admin panel, tanpa perlu minta saya mengubah kodenya.",
    outcome:
      "Pemilik kedai mengubah menu, harga, dan promo sendiri dari admin panel. Pesanan langsung masuk ke WhatsApp.",
    highlights: [
      "Masih dipakai kedainya sampai sekarang",
      "Row-Level Security: pengunjung cuma bisa baca, hanya admin yang bisa mengubah",
      "Halaman statis yang tetap ter-update tanpa deploy ulang",
    ],
    overview:
      "Storefront publik plus admin panel untuk kedai pempek. Saya mengerjakannya tanpa bayaran untuk kedai kenalan keluarga, dan itu jadi hal pertama yang saya tulis yang benar-benar diandalkan orang lain, bukan cuma saya. Sisi publiknya menampilkan menu beserta harga, banner promo, ulasan pelanggan, area pengiriman, dan jam buka, lalu mengirim pesanan ke WhatsApp dengan produknya sudah terisi di dalam pesan. Sisi admin mencakup menu, banner, ulasan, dan pengaturan situs seperti nomor WhatsApp dan tautan media sosial.",
    problem:
      "Kedai ini belum punya website. Pelanggan menemukannya lewat Instagram dan harus menanyakan menu serta harga satu per satu via DM. Apa pun yang saya tulis langsung di kode berarti pemiliknya harus menghubungi saya setiap kali ada harga berubah, jadi situs statis bukan pilihan yang realistis.",
    goal:
      "Memberi kedai ini satu halaman yang bisa dikirim ke pelanggan dan selalu menampilkan harga terkini, serta memastikan setiap potong kontennya bisa diubah sendiri oleh pemiliknya tanpa menyentuh kode atau menunggu deploy.",
    solution:
      "Situs Next.js App Router yang membaca konten dari Postgres di Supabase. Halamannya di-generate statis lalu direvalidasi, jadi sisi publik tetap cepat tapi tetap menangkap perubahan dari admin panel tanpa build ulang. Pesanan sengaja tidak lewat cart: setiap produk menautkan ke WhatsApp dengan pesan yang sudah terisi, karena begitulah kedai ini memang sudah menerima pesanan.",
    architecture:
      "Monorepo Turborepo dengan pnpm workspaces yang memuat situs publik dan admin panel. Postgres di Supabase untuk kontennya, dengan Row-Level Security supaya client anonim bisa membaca baris yang dipublikasikan tapi hanya admin terautentikasi yang bisa menulis. Supabase Auth untuk login admin, dan Supabase Storage untuk gambar produk dan banner. Dideploy di Vercel.",
    challenges: [
      "Menyusun policy Row-Level Security supaya situs publik bisa membaca katalog dengan anon key sementara akses tulis tetap terkunci ke sesi admin. Versi pertamanya membocorkan akses tulis lewat policy yang hanya memeriksa autentikasi, bukan role.",
      "Menentukan jeda revalidasi per jenis konten. Harga harus cepat berubah; teks profil tidak. Merevalidasi semuanya secara agresif justru menghilangkan gunanya static generation.",
    ],
    results: [
      "Live di pempekceklis.biz.id dan masih dipakai kedainya, dengan menu, banner promo, ulasan, dan area pengiriman yang semuanya tersimpan di Postgres dan bisa diubah dari admin panel.",
      "Pemiliknya bisa mengubah harga, mengganti banner, atau memperbarui nomor WhatsApp tanpa perubahan kode dan tanpa deploy ulang.",
      "Pesanan membuka WhatsApp dengan produknya sudah tertulis di dalam pesan, jadi tidak ada form order atau cart yang perlu dirawat.",
    ],
    lessonsLearned: [
      "Row-Level Security layak dibayar dengan waktu setup, karena aturan aksesnya tinggal di sebelah datanya, bukan ditulis ulang di setiap query.",
      "Kliennya tidak menginginkan fitur, dia ingin berhenti menjawab DM yang sama terus-menerus. Membaca permintaannya seperti itu mengubah apa yang akhirnya saya bangun.",
      "Monorepo memudahkan berbagi tipe antara situs publik dan admin panel, tapi itu lebih banyak tooling daripada yang sebenarnya dibutuhkan proyek berisi dua aplikasi.",
    ],
    futureImprovements: [],
  },

  synclancer: {
    title: "SyncLancer",
    category: "SaaS multi-tenant",
    role: "Developer tunggal, produk pribadi",
    timeline: "Jun 2026 - sekarang",
    description:
      "Aplikasi manajemen proyek multi-tenant untuk freelancer: lead, klien, proposal, proyek, tugas, invoice, dan pencatatan waktu di satu tempat, lengkap dengan portal yang bisa diakses klien.",
    outcome:
      "Satu workspace untuk freelancer: lead, proposal, proyek, invoice, dan portal untuk kliennya.",
    highlights: [
      "Data tiap workspace terisolasi lewat satu lapisan query bersama",
      "Invoice berulang dibuat otomatis lewat cron job",
      "Invoice dan proposal PDF dirender di browser",
    ],
    overview:
      "SyncLancer adalah produk saya sendiri, bukan pekerjaan klien. Saya membangunnya untuk tahu apa sebenarnya yang terlibat dalam multi-tenancy. Setiap freelancer mendapat workspace terisolasi yang mencakup pipeline lead, klien, proposal, proyek, milestone, tugas, invoice, pencatatan waktu, dan berkas. Klien mendapat login terpisah dengan cakupan terbatas, tempat mereka bisa melihat milestone sendiri, mengunduh berkas, dan melihat invoice.",
    problem:
      "Freelancer biasanya menjalankan usahanya tersebar di CRM, aplikasi chat, drive berkas, tool invoice, dan spreadsheet. Tidak ada yang saling terhubung, jadi satu klien yang sama tercatat lima kali. Saya ingin tahu apakah satu skema bisa menampung seluruh alur kerjanya tanpa jadi tidak terpakai.",
    goal:
      "Membangun satu workspace yang mencakup usaha freelancer dari hulu ke hilir, sekaligus memakainya sebagai cara belajar isolasi tenant, akses berbasis role, dan optimistic UI secara nyata, bukan cuma teori.",
    solution:
      "Aplikasi Next.js multi-tenant dengan batas workspace di setiap query. Pipeline lead drag-and-drop mengubah lead menjadi klien, proyek dipecah jadi milestone dan tugas, catatan waktu direkap per proyek, dan invoice dirender ke PDF di browser. Klien melihat versi tersaring dari data yang sama lewat role portal terpisah.",
    architecture:
      "Next.js App Router dengan React di frontend. Postgres di Supabase diakses lewat Prisma, dengan foreign key workspace di setiap tabel yang bercakupan tenant. Auth.js menangani autentikasi dan membedakan sesi pemilik dari sesi portal klien. TanStack Query mengelola server state dan optimistic update, @dnd-kit menjalankan board pipeline, @react-pdf/renderer membuat invoice di sisi client, Resend mengirim email transaksional, dan berkas disimpan di Supabase Storage.",
    challenges: [
      "Isolasi tenant hanya sekuat query terlemahnya. Menegakkannya satu per satu di setiap panggilan itu rapuh, jadi pencakupannya saya pindahkan ke satu lapisan query bersama yang menolak menyusun query tanpa workspace id.",
      "Optimistic update di board Kanban butuh rollback yang tetap benar ketika reorder gagal di tengah drag. Versi naifnya meninggalkan kartu di kolom yang salah setelah error.",
      "Portal klien memakai tabel yang sama dengan tampilan pemilik, jadi setiap field harus diklasifikasikan boleh dilihat klien atau tidak. Klasifikasi itulah pekerjaan sebenarnya, bukan UI-nya.",
    ],
    results: [
      "Live di synclancer.web.id dengan pipeline lead, proyek, milestone, tugas, invoicing, dan pencatatan waktu yang berjalan dari hulu ke hilir. Masih terus saya tambah.",
      "Portal klien sudah punya role bercakupan dan alur undangan, jadi klien hanya pernah memuat baris dari workspace-nya sendiri.",
      "Invoice dibuat sebagai PDF di browser, sehingga server sama sekali tidak ikut merender dokumen.",
    ],
    lessonsLearned: [
      "Multi-tenancy itu persoalan akses data, bukan fitur. Menentukan di mana batasnya ditegakkan adalah keseluruhan desainnya.",
      "Optimistic update TanStack Query sangat bagus sampai titik di mana Anda harus membatalkan kegagalan. Jalur rollback-nya layak diperhatikan sebesar jalur suksesnya.",
      "Cakupan proyek ini saya buat jauh terlalu lebar untuk dikerjakan sendiri. Versi yang lebih sempit, dirilis lebih cepat, akan mengajarkan hal yang sama lebih awal.",
    ],
    futureImprovements: [
      "Mencoba menaruhnya di depan freelancer sungguhan. Sekarang penggunanya cuma saya, jadi belum ada bagian alur kerjanya yang benar-benar diuji ke kenyataan.",
      "Menambahkan penerimaan pembayaran supaya invoice bisa diselesaikan langsung di aplikasinya.",
      "Menulis tes integrasi di sekitar batas tenant, yang saat ini masih diperiksa manual.",
    ],
  },

  mother: {
    title: "Mother",
    category: "Produktivitas & Fokus",
    role: "Developer tunggal, proyek pribadi",
    timeline: "Agu 2026 - sekarang",
    description:
      "Planner Android offline yang saya pakai sendiri: kebiasaan, sesi fokus, tugas dengan tenggat, dan pengingat, tanpa akun dan tanpa server.",
    outcome:
      "Pelacak kebiasaan, timer fokus, dan tugas bertenggat dalam satu aplikasi Android, dirilis sebagai APK yang bisa dipasang dari GitHub.",
    highlights: [
      "Timer fokus jalan sebagai Foreground Service, bisa dikontrol dari notifikasi",
      "Warna tugas berubah otomatis makin dekat tenggatnya",
      "Versi baru dirilis lewat GitHub Releases dengan updater di dalam aplikasi",
    ],
    overview:
      "Mother adalah planner yang saya bangun untuk diri sendiri pada Agustus 2026, supaya hari saya tidak lagi terpecah di pelacak kebiasaan, timer Pomodoro, dan aplikasi to-do yang terpisah. Semuanya berjalan offline di atas Room: kebiasaan dengan pengingat, sesi belajar dengan timer fokus, tugas dengan tenggat wajib, kalender, pencarian, backup, dan widget layar utama. Tampilannya memakai sistem desain neobrutalism yang saya bangun di Compose, dengan tema terang dan gelap terpisah. Versinya sudah lewat 3.6, dan versi baru dirilis sebagai APK lewat GitHub Releases yang dicek sendiri oleh aplikasinya.",
    problem:
      "Rutinitas belajar saya tersebar di tiga aplikasi yang tidak saling tahu, jadi sesi fokus tidak pernah terhitung sebagai kebiasaan dan tenggat tugas tidak pernah muncul di samping jadwal hari itu. Android juga ketat soal pekerjaan di latar belakang, jadi timer atau alarm yang tidak dirancang untuk itu akan berhenti begitu layar mati.",
    goal:
      "Satu aplikasi offline tempat sesi belajar, kebiasaan, dan tenggat tugas menjadi bagian dari data yang sama, dan timer atau pengingat tetap jalan saat HP terkunci.",
    solution:
      "Aplikasi Kotlin native dengan Jetpack Compose dan Room dalam struktur MVVM. Timer fokus berjalan sebagai Foreground Service dengan chronometer live dan tombol kontrol di notifikasinya. Streak di dashboard menghitung hari beruntun yang punya sesi belajar. Kartu tugas berganti warna sesuai dekatnya tenggat, dan pengingat bisa dipasang per kebiasaan, tugas, dan jadwal.",
    architecture:
      "MVVM dengan StateFlow di antara layar Compose dan Room. Pengingat dan lampiran disimpan di tabel terpisah per pemilik (tugas, jadwal, kebiasaan), bukan satu tabel bersama, dengan migrasi bernomor versi setiap skemanya berubah. Kotlin Coroutines dan Flow mengalirkan data ke UI, Foreground Service menjalankan timer, dan pengingat lewat broadcast receiver serta activity alarm layar penuh.",
    challenges: [
      "Alarm kebiasaan tidak muncul di atas layar kunci di HP saya sendiri. Penyebabnya bukan kode alarmnya: sejak Android 14, izin USE_FULL_SCREEN_INTENT tidak lagi diberikan otomatis, dan di HP saya izin itu ditolak. Solusinya dialog yang mengecek izin itu setiap aplikasi dibuka kembali dan langsung membuka halaman pengaturan yang tepat.",
      "Supaya timer tetap benar setelah aplikasi ditutup atau HP dikunci, timernya harus dikeluarkan sepenuhnya dari UI dan dipindah ke Foreground Service yang dibaca oleh notifikasi maupun aplikasinya.",
      "Pengingat, backup, dan undo saling memengaruhi lebih dari kelihatannya: memulihkan backup harus menjadwalkan ulang semua pengingat, dan membatalkan hapus tugas juga harus mengembalikan pengingatnya.",
    ],
    results: [
      "Versi 3.6.4 dirilis sebagai APK yang bisa dipasang lewat GitHub Releases, lengkap dengan updater di dalam aplikasi.",
      "Timer fokus dengan kontrol di layar kunci, streak yang dihitung dari hari belajar, dan tugas yang diwarnai sesuai tenggat.",
      "Kalender, pencarian, pengingat, backup dan restore, serta widget layar utama, semuanya tanpa koneksi internet.",
    ],
    lessonsLearned: [
      "Alarm dan pekerjaan latar belakang bergantung pada izin dan aturan baterai di HP yang sebenarnya, jadi harus diuji di sana, bukan cuma dibaca di kode.",
      "Tabel pengingat terpisah per pemilik berarti kode lebih banyak di awal, ditukar dengan foreign key yang nyata dan query yang lebih sederhana.",
    ],
    futureImprovements: [
      "Menguji perbaikan pengingat dan alarm terbaru di lebih banyak HP selain milik saya.",
    ],
  },

  "hitung-uang": {
    title: "HitungUang",
    category: "Android offline-first",
    role: "Developer tunggal, proyek pribadi",
    timeline: "Jun 2026 - sekarang",
    description:
      "Pencatat pengeluaran Android offline-first yang menyimpan semuanya di perangkat: tanpa akun, tanpa server, tanpa sinkronisasi. Pemindaian struk dan grafiknya berjalan lokal.",
    outcome:
      "Pencatat pengeluaran tanpa akun dan tanpa server. Semua data tetap di HP penggunanya.",
    highlights: [
      "Scan struk pakai OCR yang jalan di perangkat",
      "Pencarian transaksi instan dengan Room FTS4",
      "Backup ZIP yang dipegang pengguna sendiri",
    ],
    overview:
      "Aplikasi keuangan pribadi Android native tanpa backend sama sekali. Transaksi tinggal di Room di dalam perangkat, aplikasinya terkunci di balik PIN atau biometrik, struk dipindai dengan OCR on-device, grafik pengeluaran digambar dengan Compose Canvas, dan backup diekspor ke berkas ZIP yang dipegang penggunanya. Belum dipublikasikan ke Play Store, tapi kodenya ada di GitHub dan masih terus saya kembangkan.",
    problem:
      "Sebagian besar aplikasi pencatat pengeluaran meminta Anda membuat akun dan mengunggah riwayat pengeluaran ke server orang lain, lalu tetap butuh koneksi hanya untuk dibuka. Saya ingin tahu apakah versi yang tetap berguna bisa ada tanpa server sama sekali, dan apa harga yang harus dibayar sebagai gantinya.",
    goal:
      "Membangun aplikasi keuangan yang tetap jalan meski mode pesawat menyala terus, menyimpan setiap catatan di perangkat, dan tetap membuat pencatatan transaksi cukup cepat sampai saya sendiri mau terus memakainya.",
    solution:
      "Aplikasi Compose native di atas Room, dengan seluruh fiturnya dibangun mengelilingi penyimpanan lokal. ML Kit membaca teks struk di perangkat dan mengisi awal transaksi yang dikonfirmasi atau dikoreksi pengguna sebelum disimpan. Grafik digambar langsung dengan Canvas alih-alih menarik library chart. WorkManager menangani pemeliharaan di latar belakang, dan backup serta restore lewat arsip ZIP supaya data tetap milik penggunanya.",
    architecture:
      "Clean Architecture feature-first dengan lapisan domain di antara UI Compose dan Room. Dagger Hilt untuk dependency injection, Room dengan KSP untuk basis data lokal, DataStore untuk preferensi, WorkManager untuk pekerjaan terjadwal, ML Kit untuk pengenalan teks di perangkat, dan AndroidX Biometric untuk kunci aplikasinya.",
    challenges: [
      "Keluaran OCR itu teks tak berstruktur, bukan field. Memetakan struk ke nominal dan nama merchant butuh heuristik, jadi aplikasi selalu menampilkan hasil bacanya untuk dikoreksi pengguna alih-alih langsung mempercayainya.",
      "Grafik Canvas custom menghindari satu dependency, tapi hit-testing, label, dan aksesibilitasnya jadi tanggungan sendiri. Library akan jadi pilihan yang benar begitu grafiknya perlu melakukan lebih dari yang sekarang.",
      "Tanpa server, satu migrasi basis data yang salah berarti data hilang permanen. Tes migrasi jauh lebih berarti di sini dibanding di proyek lain yang pernah saya kerjakan.",
    ],
    results: [
      "Berfungsi penuh tanpa perlu izin jaringan: Room untuk penyimpanan, kunci PIN dan biometrik, dan tidak ada akun yang harus dibuat.",
      "Pemindaian struk on-device lewat ML Kit, dengan hasil bacanya selalu ditampilkan untuk dikonfirmasi sebelum disimpan.",
      "Backup dan restore sebagai arsip ZIP yang dipegang pengguna, dengan migrasi skema yang tertutup tes sehingga proses impor tidak bisa membuang catatan tanpa diketahui.",
    ],
    lessonsLearned: [
      "Indeks FTS4 milik Room membuat pencarian lokal cukup cepat sampai saya berhenti memikirkannya, dan itu justru intinya.",
      "Compose Canvas benar-benar nyaman untuk grafik sederhana, dan jelas jadi alat yang salah begitu interaksinya mulai rumit.",
      "Offline-first memindahkan risikonya dari jaringan ke migrasi Anda. Pertukaran itu layak diambil, tapi harganya memang harus dibayar dengan tes.",
    ],
    futureImprovements: [
      "Impor dan ekspor CSV, supaya catatan bisa dipindahkan masuk dan keluar tanpa lewat backup ZIP.",
      "Transaksi berulang dan anggaran per kategori.",
      "Merilis build yang sudah ditandatangani supaya bisa dipasang tanpa perlu clone repo-nya.",
    ],
  },
};
