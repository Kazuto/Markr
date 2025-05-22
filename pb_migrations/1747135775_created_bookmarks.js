migrate(
  (db) => {
    const collection = new Collection({
      id: "0ookmiks4zw3zqa",
      created: "2025-05-13 11:17:57.965Z",
      updated: "2025-05-13 11:24:02.116Z",
      name: "bookmarks",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "kewclfby",
          name: "name",
          type: "text",
          required: true,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          system: false,
          id: "gcrts73o",
          name: "url",
          type: "url",
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
          id: "yt3eeigu",
          name: "order",
          type: "number",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            noDecimal: true,
          },
        },
        {
          system: false,
          id: "xr0zszsz",
          name: "icon",
          type: "text",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          system: false,
          id: "kiqcq0gg",
          name: "categories",
          type: "relation",
          required: true,
          presentable: false,
          unique: false,
          options: {
            collectionId: "5chb6xqkeq9891y",
            cascadeDelete: true,
            minSelect: null,
            maxSelect: null,
            displayFields: null,
          },
        },
      ],
      indexes: [],
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
    const collection = dao.findCollectionByNameOrId("0ookmiks4zw3zqa");

    return dao.deleteCollection(collection);
  },
);
