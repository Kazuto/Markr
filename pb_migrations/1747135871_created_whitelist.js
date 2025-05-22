migrate(
  (db) => {
    const collection = new Collection({
      id: "89xl9wa735w8slp",
      created: "2025-05-13 11:22:29.868Z",
      updated: "2025-05-13 11:24:02.116Z",
      name: "whitelist",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "rirmzjiv",
          name: "email",
          type: "email",
          required: true,
          presentable: false,
          unique: false,
          options: {
            exceptDomains: [],
            onlyDomains: [],
          },
        },
        {
          system: false,
          id: "mno4wiwp",
          name: "is_active",
          type: "bool",
          required: false,
          presentable: false,
          unique: false,
          options: {},
        },
        {
          system: false,
          id: "jzlzyd86",
          name: "user",
          type: "relation",
          required: false,
          presentable: false,
          unique: true,
          options: {
            collectionId: "_pb_users_auth_",
            cascadeDelete: false,
            minSelect: null,
            maxSelect: 1,
            displayFields: null,
          },
        },
      ],
      indexes: ["CREATE UNIQUE INDEX `idx_vmEronb` ON `whitelist` (`email`)"],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    collection.listRule = '@request.auth.id != ""';
    collection.viewRule = '@request.auth.id != ""';
    collection.createRule = "@request.auth.is_admin = true";
    collection.updateRule = "@request.auth.is_admin = true";
    collection.deleteRule = "@request.auth.is_admin = true";

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("89xl9wa735w8slp");

    return dao.deleteCollection(collection);
  },
);
