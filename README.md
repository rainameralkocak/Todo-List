To-Do List Projesi

    Bu proje, Express.js ve EJS kullanarak oluşturulmuş basit bir to-do list uygulamasıdır. Kullanıcılar görev ekleyebilir, silebilir ve güncelleyebilir. Görevler db.json dosyasında saklanarak, sistem yeniden başlatıldığında kaybolmamaları sağlanır.

Özellikler

   - Görev ekleme

   - Görevleri listeleme

   - Görevleri düzenleme

   - Görevleri silme

   - JSON dosyasında veri saklama

Gereksinimler

   - Node.js (v14+ önerilir)

   - npm (Node.js ile birlikte gelir)

Kurulum

    Projeyi klonlayın:

       - git clone https://github.com/kullaniciadi/todo-list.git
       - cd todo-list

    Gerekli bağımlılıkları yükleyin:

       - npm install

    Sunucuyu başlatın:

       - node server.js

    Tarayıcıda açın:

       - http://localhost:3000

Kullanım

    Görev Ekleme

       - Ana sayfadaki formu doldurup "Ekle" butonuna basarak yeni bir görev ekleyebilirsiniz.

    Görev Güncelleme

       - Listedeki "Düzenle" butonuna tıklayarak bir görevi güncelleyebilirsiniz.

    Görev Silme

       - "Sil" butonuna tıklayarak bir görevi silebilirsiniz.

Proje Yapısı

    .
    ├── node-modules         # Proje bağımlılıkları
    ├── public/              # Statik dosyalar (CSS, JS)
    │    ├── css  
    │       ├── style.css     
    │    ├── js   
    │       ├── script.js    
    ├── views/               # EJS şablonları
    │   ├── index.ejs        # Ana sayfa
    │   ├── edit.ejs         # Düzenleme sayfası
    ├── db.json              # Görevlerin saklandığı JSON dosyası
    ├── package-lock.json    # Bağımlılıkların kesin sürümlerini saklar  
    ├── package.json         # Proje bağımlılıkları
    ├── README.md            # Proje açıklaması
    └── server.js            # Express.js ile oluşturulmuş ana sunucu dosyası

Geliştirme

    Sunucuyu geliştirme modunda çalıştırmak için:

       - npm install -g nodemon
       - nodemon server.js



