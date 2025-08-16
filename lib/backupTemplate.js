// тут нужно описание файла

export const setupTemplate = {
    owner: "",         // Адрес владельца подписки
    name: "",          // Имя подписки
    network: "",       // Название сети (например, "polkadot")
    controller: {
      address: "",     // Адрес контроллера
      private: ""      // Приватный ключ контроллера (в виде строки), Нужен для сервера дома HA
    },
    datalog: {
      interval: ""     // Интервал сообщений
    },
    ipfs: {
      url: "",         // URL IPFS-шлюза
      port: ""         // Порт IPFS-шлюза
    },
    pinata: {
      public: "",      // Публичный ключ Pinata
      private: ""      // Приватный ключ Pinata
    },
    users: [           // Массив пользователей – каждый объект содержит address и label
      {
        address: "",
        label: ""
      }
    ]
  };
  